import mongoose from 'mongoose';
import crypto from 'crypto';
import { ProjectModel, SkillModel, ExperienceModel, CertificationModel, AdminModel } from './models.js';
import { STATIC_PROJECTS, STATIC_SKILLS, STATIC_EXPERIENCES, STATIC_CERTIFICATIONS } from './data/staticData.js';

// Generate secure SHA-256 password hash
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    await seedDatabase();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    // Seed Admin if not exists
    const adminCount = await AdminModel.countDocuments();
    if (adminCount === 0) {
      const defaultPasswordHash = hashPassword('mithun');
      await AdminModel.create({
        name: 'Mithun',
        email: 'mithun@gmail.com',
        passwordHash: defaultPasswordHash
      });
      console.log('🌱 Seeded default admin user');
    }

    // Seed Projects if empty
    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      await ProjectModel.insertMany(STATIC_PROJECTS.map(p => ({ ...p, _id: undefined, id: undefined })));
      console.log('🌱 Seeded static projects');
    }

    // Seed Skills if empty
    const skillCount = await SkillModel.countDocuments();
    if (skillCount === 0) {
      await SkillModel.insertMany(STATIC_SKILLS.map(s => ({ ...s, _id: undefined, id: undefined })));
      console.log('🌱 Seeded static skills');
    }

    // Seed Experiences if empty
    const expCount = await ExperienceModel.countDocuments();
    if (expCount === 0) {
      await ExperienceModel.insertMany(STATIC_EXPERIENCES.map(e => ({ ...e, _id: undefined, id: undefined })));
      console.log('🌱 Seeded static experiences');
    }

    // Seed Certifications if empty
    const certCount = await CertificationModel.countDocuments();
    if (certCount === 0) {
      await CertificationModel.insertMany(STATIC_CERTIFICATIONS.map(c => ({ ...c, _id: undefined, id: undefined })));
      console.log('🌱 Seeded static certifications');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}
