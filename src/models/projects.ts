import mongoose, { Document, Schema } from 'mongoose';

// Project interface
export interface IProject extends Document {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  role?: string;
  year?: string;
  status?: string;
  category?: string;
  links: {
    live?: string | null;
    case: string;
    repo?: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    role: { type: String, trim: true },
    year: { type: String, trim: true },
    status: { type: String, trim: true },
    category: { type: String, trim: true, index: true },
    links: {
      live: { type: String, trim: true },
      case: { type: String, required: true, trim: true },
      repo: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for faster queries
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

// Ensure JSON output includes a string `id` derived from `_id` and remove internal props
projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret: any) {
    if (ret._id) {
      // Map `_id` -> `id` for client-friendly responses
      ret.id = String(ret._id);
      delete ret._id; // prefer clients use `id` rather than `_id`
    }
  },
});

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;
