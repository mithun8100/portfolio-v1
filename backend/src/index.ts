import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { connectDB, hashPassword } from './db.js';
import { 
  ProjectModel, 
  SkillModel, 
  ExperienceModel, 
  CertificationModel, 
  ContactModel, 
  AdminModel 
} from './models.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON parsing and CORS
app.use(express.json());
app.use(cors());

// Simplistic Session Vault (Note: In production with multiple instances, use Redis or JWT)
const activeSessions = new Map<string, { email: string; name: string }>();

// Simple request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Auth check middleware
type AuthenticatedRequest = Request & {
  user?: {
    email: string;
    name: string;
  };
};

function checkAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  //const authHeader = req.headers.authorization;
  //const authHeader = req.header('Authorization');
  const authHeader = (req as any).headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization required' });
    return;
  }
  
  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);
  
  if (!session) {
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }
  
  req.user = session;
  next();
}

// -------------------------------------------------------------
// Database Connection
// -------------------------------------------------------------
await connectDB();

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// login endpoint
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }
  
  const inputHash = hashPassword(password);
  const admin = await AdminModel.findOne({ email: email.trim().toLowerCase(), passwordHash: inputHash });
  
  if (admin) {
    const token = crypto.randomBytes(32).toString('hex');
    activeSessions.set(token, { email: admin.email, name: admin.name });
    
    res.json({ token, name: admin.name, email: admin.email });
  } else {
    res.status(401).json({ error: 'Incorrect email or password' });
  }
});

// get profile endpoint
app.get('/api/auth/profile', checkAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({ authenticated: true, user: req.user });
});

// -------------------------------------------------------------
// Projects API
// -------------------------------------------------------------
app.get('/api/projects', async (req, res) => {
  const projects = await ProjectModel.find().sort({ featured: -1, createdAt: -1 });
  res.json(projects);
});

app.post('/api/projects', checkAuth, async (req, res) => {
  const { title, description, techStack, category, imageUrl, githubUrl, liveUrl, featured } = req.body;
  if (!title || !description || !category) {
    res.status(400).json({ error: 'Title, description, and category are required' });
    return;
  }
  
  const newProject = await ProjectModel.create({
    title,
    description,
    techStack: Array.isArray(techStack) ? techStack : [],
    category,
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    githubUrl,
    liveUrl,
    featured: !!featured
  });
  
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', checkAuth, async (req, res) => {
  const { title, description, techStack, category, imageUrl, githubUrl, liveUrl, featured } = req.body;
  
  const updated = await ProjectModel.findByIdAndUpdate(req.params.id, {
    $set: {
      title,
      description,
      techStack,
      category,
      imageUrl,
      githubUrl,
      liveUrl,
      featured
    }
  }, { new: true });
  
  if (!updated) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  
  res.json(updated);
});

app.delete('/api/projects/:id', checkAuth, async (req, res) => {
  const deleted = await ProjectModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json({ success: true, message: 'Project removed' });
});

// -------------------------------------------------------------
// Skills API
// -------------------------------------------------------------
app.get('/api/skills', async (req, res) => {
  const skills = await SkillModel.find();
  res.json(skills);
});

app.post('/api/skills', checkAuth, async (req, res) => {
  const { name, category, level } = req.body;
  if (!name || !category || level === undefined) {
    res.status(400).json({ error: 'Name, category, and level are required' });
    return;
  }
  
  const newSkill = await SkillModel.create({
    name,
    category,
    level: Number(level)
  });
  
  res.status(201).json(newSkill);
});

app.put('/api/skills/:id', checkAuth, async (req, res) => {
  const { name, category, level } = req.body;
  const updated = await SkillModel.findByIdAndUpdate(req.params.id, {
    $set: { name, category, level: level !== undefined ? Number(level) : undefined }
  }, { new: true });

  if (!updated) {
    res.status(404).json({ error: 'Skill not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/skills/:id', checkAuth, async (req, res) => {
  const deleted = await SkillModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Skill not found' });
    return;
  }
  res.json({ success: true, message: 'Skill removed' });
});

// -------------------------------------------------------------
// Experience API
// -------------------------------------------------------------
app.get('/api/experience', async (req, res) => {
  const experiences = await ExperienceModel.find().sort({ current: -1, _id: -1 });
  res.json(experiences);
});

app.post('/api/experience', checkAuth, async (req, res) => {
  const { role, company, duration, description, current } = req.body;
  if (!role || !company || !duration) {
    res.status(400).json({ error: 'Role, company, and duration are required' });
    return;
  }
  
  const newExp = await ExperienceModel.create({
    role,
    company,
    duration,
    description: Array.isArray(description) ? description : [],
    current: !!current
  });
  
  res.status(201).json(newExp);
});

app.put('/api/experience/:id', checkAuth, async (req, res) => {
  const { role, company, duration, description, current } = req.body;
  const updated = await ExperienceModel.findByIdAndUpdate(req.params.id, {
    $set: { role, company, duration, description, current }
  }, { new: true });

  if (!updated) {
    res.status(404).json({ error: 'Experience not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/experience/:id', checkAuth, async (req, res) => {
  const deleted = await ExperienceModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Experience not found' });
    return;
  }
  res.json({ success: true, message: 'Experience removed' });
});

// -------------------------------------------------------------
// Certifications API
// -------------------------------------------------------------
app.get('/api/certifications', async (req, res) => {
  const certifications = await CertificationModel.find();
  res.json(certifications);
});

app.post('/api/certifications', checkAuth, async (req, res) => {
  const { title, issuer, date, credentialUrl } = req.body;
  if (!title || !issuer || !date) {
    res.status(400).json({ error: 'Title, issuer, and date are required' });
    return;
  }
  
  const newCert = await CertificationModel.create({
    title,
    issuer,
    date,
    credentialUrl
  });
  
  res.status(201).json(newCert);
});

app.put('/api/certifications/:id', checkAuth, async (req, res) => {
  const { title, issuer, date, credentialUrl } = req.body;
  const updated = await CertificationModel.findByIdAndUpdate(req.params.id, {
    $set: { title, issuer, date, credentialUrl }
  }, { new: true });

  if (!updated) {
    res.status(404).json({ error: 'Certification not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/certifications/:id', checkAuth, async (req, res) => {
  const deleted = await CertificationModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Certification not found' });
    return;
  }
  res.json({ success: true, message: 'Certification removed' });
});

// -------------------------------------------------------------
// Contact API
// -------------------------------------------------------------
app.get('/api/contact', checkAuth, async (req, res) => {
  const contacts = await ContactModel.find().sort({ createdAt: -1 });
  res.json(contacts);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'All areas (name, email, subject, message) are required' });
    return;
  }
  
  const newInquiry = await ContactModel.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    read: false
  });
  
  res.status(201).json({ success: true, data: newInquiry });
});

app.delete('/api/contact/:id', checkAuth, async (req, res) => {
  const deleted = await ContactModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }
  res.json({ success: true, message: 'Message deleted' });
});

app.patch('/api/contact/:id/read', checkAuth, async (req, res) => {
  const updated = await ContactModel.findByIdAndUpdate(req.params.id, {
    $set: { read: true }
  }, { new: true });

  if (!updated) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }
  res.json(updated);
});

// -------------------------------------------------------------
// AI Chatbot endpoint
// -------------------------------------------------------------
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { prompt, chatHistory } = req.body;
  
  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const fallbackDetails = `
Mithun is a Software Developer with 2+ years of experience specializing in Core Java backend development, RESTful APIs, and AWS deployments.
Key Core Competencies:
- Backend: Core Java, Node.js, Struts, REST API, MySQL Query Optimization
- Frontend: React.js, HTML5, CSS3, Bootstrap 5, Ionic Angular
- Cloud & DevOps: AWS (EC2, S3, Multi-AZ VPC, ALB, RDS), Linux, Jenkins, Docker basics
- Networking: Cisco Packet Tracer, 3-Tier Campus Network Design, VLAN, Inter-VLAN Routing
- GenAI Tools: GitHub Copilot, Claude Code, utilizing AI to optimize backend code efficiency.
  `;

  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });
      
      const systemInstruction = `
You are the interactive AI avatar of Mithun. Speak concisely and clearly.
${fallbackDetails}
      `;

      const contentsParts: any[] = [];
      if (Array.isArray(chatHistory)) {
        chatHistory.slice(-6).forEach(item => {
          contentsParts.push({
            role: item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.content }]
          });
        });
      }
      contentsParts.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contentsParts,
        config: { systemInstruction }
      });

      const responseText = aiResponse.text;
      if (responseText) {
        res.json({ text: responseText.trim() });
        return;
      }
    } catch (err) {
      console.error('Gemini call failed:', err);
    }
  }

  res.json({ text: "I'm Mithun's automated AI guide! I'd love to tell you more. Ask me about Core Java, AWS, or Cisco Networking!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend live at http://localhost:${PORT}`);
});
