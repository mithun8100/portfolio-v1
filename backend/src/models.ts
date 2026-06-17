import mongoose, { Schema, Document } from 'mongoose';
import { Project, Skill, Experience, Certification, ContactInquiry, AdminUser } from './types.js';

const schemaOptions = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
};

// Project Schema
const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String],
  category: { type: String, required: true },
  imageUrl: String,
  githubUrl: String,
  liveUrl: String,
  featured: { type: Boolean, default: false }
}, { ...schemaOptions, timestamps: true });

// Skill Schema
const SkillSchema = new Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Frontend', 'Backend', 'Cloud & Network', 'Tools & DevOps', 'GenAI'],
    required: true 
  },
  level: { type: Number, required: true, min: 0, max: 100 },
  icon: String
}, schemaOptions);

// Experience Schema
const ExperienceSchema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: [String],
  current: { type: Boolean, default: false }
}, schemaOptions);

// Certification Schema
const CertificationSchema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  credentialUrl: String
}, schemaOptions);

// Contact Inquiry Schema
const ContactInquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { ...schemaOptions, timestamps: true });

// Admin User Schema
const AdminUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
}, schemaOptions);

export const ProjectModel = mongoose.model<Project & Document>('Project', ProjectSchema);
export const SkillModel = mongoose.model<Skill & Document>('Skill', SkillSchema);
export const ExperienceModel = mongoose.model<Experience & Document>('Experience', ExperienceSchema);
export const CertificationModel = mongoose.model<Certification & Document>('Certification', CertificationSchema);
export const ContactModel = mongoose.model<ContactInquiry & Document>('Contact', ContactInquirySchema);
export const AdminModel = mongoose.model<AdminUser & Document>('Admin', AdminUserSchema);
