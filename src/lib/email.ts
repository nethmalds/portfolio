import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Email configuration interface
interface EmailConfig {
	host: string;
	port: number;
	secure?: boolean;
	auth: {
		user: string;
		pass: string;
	};
}

// Contact form email data interface
interface ContactEmailData {
	name: string;
	email: string;
	company?: string;
	subject?: string;
	message: string;
	budget?: string;
	timeline?: string;
}

// Create transporter
const createTransporter = () => {
	const config: EmailConfig = {
		host: process.env.EMAIL_HOST || "smtp.gmail.com",
		port: parseInt(process.env.EMAIL_PORT || "465"),
		secure: true, // Use TLS
		auth: {
			user: process.env.EMAIL_USER || "",
			pass: process.env.EMAIL_PASS || "",
		},
	};

	return nodemailer.createTransport(config);
};

// Utility to load and render HTML template with data
const renderTemplate = (
	templatePath: string,
	data: Record<string, any>,
): string => {
	let html = fs.readFileSync(templatePath, "utf8");
	// Simple variable replacement: {{var}}
	html = html.replace(/{{(\w+)}}/g, (_, key) => {
		if (key === "submissionTime") {
			return new Date().toLocaleString();
		}
		return data[key] ?? "";
	});
	// Remove unused conditional blocks (Handlebars style)
	html = html.replace(/{{#if (\w+)}}([\s\S]*?){{\/if}}/g, (_, key, content) => {
		return data[key] ? content : "";
	});
	return html;
};

// Always resolve from project root to avoid build output path issues
const EMAILS_DIR = path.join(process.cwd(), "src", "lib", "emails");

const getContactFormHtml = (data: ContactEmailData): string => {
	const templatePath = path.join(EMAILS_DIR, "contact-form.html");
	return renderTemplate(templatePath, {
		...data,
		submissionTime: new Date().toLocaleString(),
	});
};

const getAutoReplyHtml = (data: ContactEmailData): string => {
	const templatePath = path.join(EMAILS_DIR, "auto-reply.html");
	return renderTemplate(templatePath, data);
};

// Generate plain text email
const generateEmailText = (data: ContactEmailData): string => {
	let text = `New Contact Form Submission\n\n`;
	text += `Name: ${data.name}\n`;
	text += `Email: ${data.email}\n`;

	if (data.company) text += `Company: ${data.company}\n`;
	if (data.subject) text += `Subject: ${data.subject}\n`;
	if (data.budget) text += `Budget: ${data.budget}\n`;
	if (data.timeline) text += `Timeline: ${data.timeline}\n`;

	text += `\nMessage:\n${data.message}\n\n`;
	text += `Submission time: ${new Date().toLocaleString()}`;

	return text;
};

// Send contact form email
export const sendContactEmail = async (
	data: ContactEmailData,
): Promise<boolean> => {
	try {
		const transporter = createTransporter();
		const mailOptions = {
			from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
			to: process.env.EMAIL_TO,
			subject: `New Contact: ${data.subject || "Portfolio Inquiry"} - ${data.name}`,
			text: generateEmailText(data),
			html: getContactFormHtml(data),
			replyTo: data.email,
		};
		const result = await transporter.sendMail(mailOptions);
		console.log("Email sent successfully:", result.messageId);
		return true;
	} catch (error) {
		console.error("Email sending failed:", error);
		return false;
	}
};

// Send auto-reply to the contact form submitter
export const sendAutoReply = async (
	data: ContactEmailData,
): Promise<boolean> => {
	try {
		const transporter = createTransporter();
		const autoReplyText = `Hi ${data.name},\n\nThank you for your interest in working together! I've received your message and will get back to you within 24 hours.\n\nIn the meantime, feel free to check out my latest work on my portfolio or connect with me on social media.\n\nBest regards,\nYour Name`;
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to: data.email,
			subject: "Thank you for your message!",
			text: autoReplyText,
			html: getAutoReplyHtml(data),
		};
		const result = await transporter.sendMail(mailOptions);
		console.log("Auto-reply sent successfully:", result.messageId);
		return true;
	} catch (error) {
		console.error("Auto-reply failed:", error);
		return false;
	}
};

// Verify email configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
	try {
		const transporter = createTransporter();
		await transporter.verify();
		return true;
	} catch (error) {
		console.error("Email configuration verification failed:", error);
		return false;
	}
};
