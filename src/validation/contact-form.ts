import { z } from "zod";

export const contactFormSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.min(5, "Name must be at least 5 characters"),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	company: z.string().optional(),
	subject: z.string().optional(),
	message: z
		.string()
		.min(1, "Message is required")
		.min(10, "Message must be at least 10 characters"),
	budget: z.string().optional(),
	timeline: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
