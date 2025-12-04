import mongoose, { Document, Schema } from "mongoose";

// Certification data type for API responses (without MongoDB Document)
export interface CertificationData {
	id: string;
	title: string;
	issuer: string;
	issueDate: string;
	expiryDate?: string;
	credentialId?: string;
	credentialUrl?: string;
	description?: string;
	image?: string;
	skills: string[];
	createdAt: Date;
	updatedAt: Date;
}

// Certification interface
export interface ICertification extends Document {
	title: string;
	issuer: string;
	issueDate: string;
	expiryDate?: string;
	credentialId?: string;
	credentialUrl?: string;
	description?: string;
	image?: string;
	skills: string[];
	createdAt: Date;
	updatedAt: Date;
}

const certificationSchema = new Schema<ICertification>(
	{
		title: { type: String, required: true, trim: true },
		issuer: { type: String, required: true, trim: true },
		issueDate: { type: String, required: true, trim: true },
		expiryDate: { type: String, trim: true },
		credentialId: { type: String, trim: true },
		credentialUrl: { type: String, trim: true },
		description: { type: String, trim: true },
		image: { type: String, trim: true },
		skills: [{ type: String, trim: true }],
	},
	{
		timestamps: true,
	},
);

// Indexes for faster queries
certificationSchema.index({ issuer: 1 });
certificationSchema.index({ createdAt: -1 });

// Ensure JSON output includes a string `id` derived from `_id` and remove internal props
certificationSchema.set("toJSON", {
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

export const Certification =
	mongoose.models.Certification ||
	mongoose.model<ICertification>("Certification", certificationSchema);

export default Certification;
