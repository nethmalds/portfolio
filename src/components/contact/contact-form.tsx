"use client";

import { useState } from "react";
import { toast } from "sonner";
import {/* motion */} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiPaperAirplane, HiExclamation } from "react-icons/hi";
import {
	contactFormSchema,
	ContactFormSchema,
} from "@/validation/contact-form";

type FormData = ContactFormSchema;
type FormErrors = Partial<Record<keyof FormData, string>>;

const budgetOptions = [
	"< $150",
	"$150 - $500",
	"$500 - $1500",
	"$1500 - $3000",
	"$3000+",
	"Let's discuss",
];

const timelineOptions = [
	"ASAP",
	"Within 1 month",
	"2-3 months",
	"3-6 months",
	"6-12 months",
	"1 year+",
	"Just exploring",
];

const subjectOptions = [
	"Web Development Project",
	"Mobile App Development",
	"Customized Software Solution",
	"UI/UX Design",
	"Video Editing & Animation",
	"System Architecture Design",
	"Technical Mentoring",
	"Speaking Opportunity",
	"Collaboration",
	"Other",
];

export function ContactForm() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		company: "",
		subject: "",
		message: "",
		budget: "",
		timeline: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [touched, setTouched] = useState<
		Partial<Record<keyof FormData, boolean>>
	>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	// submit status was unused; keeping a placeholder in case it's needed in future
	// const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	// Validate a single field
	const validateField = (name: keyof FormData, value: unknown) => {
		// Use safeParse + flatten to reliably get the field error messages from Zod
		const res = contactFormSchema
			.pick({ [name]: true })
			.safeParse({ [name]: value } as Record<string, unknown>);
		if (res.success) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
			return;
		}

		// Flatten gives { formErrors, fieldErrors }
		const { fieldErrors } = res.error.flatten();
		// fieldErrors[name] is an array of messages
		// cast to indexable record to avoid excess type strictness
		const msgs = (fieldErrors as Record<string, string[] | undefined>)[
			name as string
		];
		const message =
			Array.isArray(msgs) && msgs.length > 0 ? msgs[0] : undefined;
		setErrors((prev) => ({
			...prev,
			[name]: message || "This field is required",
		}));
	};

	// Validate all fields
	const validateForm = (): boolean => {
		// mark all fields as touched so validation messages appear after submit
		setTouched((prev) => {
			const allKeys = Object.keys(formData) as (keyof FormData)[];
			const next = { ...prev } as Partial<Record<keyof FormData, boolean>>;
			for (const k of allKeys) next[k] = true;
			return next;
		});
		const res = contactFormSchema.safeParse(formData);
		if (res.success) {
			setErrors({});
			return true;
		}

		// Flatten the error object to map field -> [messages]
		const { fieldErrors } = res.error.flatten();
		const mapped: FormErrors = {};
		for (const key of Object.keys(fieldErrors)) {
			const msgs = (fieldErrors as Record<string, string[] | undefined>)[
				key as string
			];
			if (Array.isArray(msgs) && msgs.length > 0) {
				mapped[key as keyof FormData] = msgs[0];
			}
		}

		setErrors(mapped);
		return false;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);
		// setSubmitStatus("idle");

		try {
			// Send all form data to email API
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					company: formData.company,
					subject: formData.subject,
					message: formData.message,
					budget: formData.budget,
					timeline: formData.timeline,
				}),
			});

			const responseData = await response.json();

			if (!response.ok) {
				throw new Error(responseData.error || "Failed to send message");
			}

			// setSubmitStatus("success");
			setFormData({
				name: "",
				email: "",
				company: "",
				subject: "",
				message: "",
				budget: "",
				timeline: "",
			});
			toast.success("Email sent successfully!", {
				description:
					"Thank you for reaching out! I will get back to you within 24 hours.",
			});
		} catch (error) {
			console.error("Contact form submission error:", error);
			// setSubmitStatus("error");
			toast.error("Failed to send message", {
				description: "Please try again or email me directly.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (touched[name as keyof FormData]) {
			validateField(name as keyof FormData, value);
		}
	};

	const handleBlur = (
		e: React.FocusEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
		validateField(name as keyof FormData, value);
	};

	return (
		<Card className="glass border-primary/20">
			<CardHeader>
				<CardTitle className="text-2xl gradient-text">
					Start a Conversation
				</CardTitle>
				<p className="text-muted-foreground">
					Fill out the form below and I will get back to you within 24 hours.
				</p>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Name & Email Row */}
					<div className="grid sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="text-sm font-medium text-foreground"
							>
								Name *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								onBlur={handleBlur}
								className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
									errors.name ? "border-destructive" : "border-border"
								}`}
								placeholder="Your full name"
							/>
							{touched.name && errors.name && (
								<p className="text-sm text-destructive flex items-center">
									<HiExclamation className="h-4 w-4 mr-1" />
									{errors.name}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium text-foreground"
							>
								Email *
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
									errors.email ? "border-destructive" : "border-border"
								}`}
								placeholder="your@email.com"
							/>
							{touched.email && errors.email && (
								<p className="text-sm text-destructive flex items-center">
									<HiExclamation className="h-4 w-4 mr-1" />
									{errors.email}
								</p>
							)}
						</div>
					</div>

					{/* Company & Subject Row */}
					<div className="grid sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label
								htmlFor="company"
								className="text-sm font-medium text-foreground"
							>
								Company/Organization
							</label>
							<input
								type="text"
								id="company"
								name="company"
								value={formData.company}
								onChange={handleChange}
								onBlur={handleBlur}
								className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
								placeholder="Your company (optional)"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="subject"
								className="text-sm font-medium text-foreground"
							>
								Subject
							</label>
							<select
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								onBlur={handleBlur}
								className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
							>
								<option value="">Select a topic</option>
								{subjectOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Budget & Timeline Row */}
					<div className="grid sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label
								htmlFor="budget"
								className="text-sm font-medium text-foreground"
							>
								Project Budget
							</label>
							<select
								id="budget"
								name="budget"
								value={formData.budget}
								onChange={handleChange}
								onBlur={handleBlur}
								className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
							>
								<option value="">Select budget range</option>
								{budgetOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="timeline"
								className="text-sm font-medium text-foreground"
							>
								Timeline
							</label>
							<select
								id="timeline"
								name="timeline"
								value={formData.timeline}
								onChange={handleChange}
								onBlur={handleBlur}
								className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
							>
								<option value="">Select timeline</option>
								{timelineOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Message */}
					<div className="space-y-2">
						<label
							htmlFor="message"
							className="text-sm font-medium text-foreground"
						>
							Message *
						</label>
						<textarea
							id="message"
							name="message"
							rows={6}
							value={formData.message}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-y ${
								errors.message ? "border-destructive" : "border-border"
							}`}
							placeholder="Tell me about your project, goals, and how I can help..."
						/>
						{touched.message && errors.message && (
							<p className="text-sm text-destructive flex items-center">
								<HiExclamation className="h-4 w-4 mr-1" />
								{errors.message}
							</p>
						)}
						<p className="text-xs text-muted-foreground">
							{formData.message.length}/500 characters
						</p>
					</div>

					{/* Submit Button */}
					<div className="pt-4">
						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full btn-neon glow-cyan font-semibold relative"
						>
							{isSubmitting ? (
								<div className="flex items-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
									Sending...
								</div>
							) : (
								<div className="flex items-center justify-center">
									<HiPaperAirplane className="h-4 w-4 mr-2" />
									Send Message
								</div>
							)}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
