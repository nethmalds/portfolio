export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	technologies: string[];
	role: string;
	year: string;
	status: string;
	links: {
		live?: string;
		case: string;
		repo?: string;
	};
}

export const projects: Project[] = [
	{
		id: "user-authentication-system",
		title: "User Authentication Model – MLP-Based Biometric System",
		description:
			"Developed a biometric authentication system using accelerometer and gyroscope data. Built MLP-based user-specific models with feature extraction and threshold-based verification.",
		image: "/images/projects/auth-system.jpg",
		technologies: [
			"MATLAB",
			" Pattern Recognition",
			"Deep Learning",
			"MLP",
			"Biometrics",
		],
		role: "ML Engineer",
		year: "2024",
		status: "Featured",
		links: {
			repo: "https://github.com/nethmalds/authentication-model",
			case: "/work/user-authentication-system",
		},
	},
	{
		id: "ticket-booking-system",
		title: "Ticket Booking System – Serverless Full-Stack Application",
		description:
			"Built a full-stack serverless ticket booking web app using Next.js serverless architecture. Implemented event listings, seat selection, secure authentication, payments, and booking confirmation.",
		image: "/images/projects/ticket-booking.jpg",
		technologies: ["Next.js", "Redis", "MongoDB", "Prisma", "Serverless"],
		role: "Full Stack Developer",
		year: "2024",
		status: "Live",
		links: {
			repo: "https://github.com/nethmalds/ticket-booking",
			case: "/work/ticket-booking-system",
		},
	},
	{
		id: "deep-learning-repository",
		title: "Deep Learning Models",
		description:
			"Developed CNN and MLP models for image classification and NLP tasks. Implemented preprocessing, training pipelines, model evaluation, and visualization with performance comparison.",
		image: "/images/projects/deep-learning.jpg",
		technologies: [
			"Python",
			"CNN",
			"MLP",
			"Image Classification",
			"NLP",
			"TensorFlow",
		],
		role: "AI/ML Engineer",
		year: "2024",
		status: "Featured",
		links: {
			repo: "https://github.com/nethmalds/deep-learning",
			case: "/work/deep-learning-repository",
		},
	},
	{
		id: "ieee-studpro-portal",
		title: "IEEE Sri Lanka StudPro Portal – Next.js + TypeScript",
		description:
			"Built a student project platform with TypeScript, App Router, and modular components. Developed pages for project submissions, viewing, and content management with optimized UI and routing.",
		image: "/images/projects/studpro-portal.jpg",
		technologies: [
			"Next.js",
			"TypeScript",
			"App Router",
			"UI/UX",
			"Performance Optimization",
		],
		role: "Frontend Developer",
		year: "2024",
		status: "Live",
		links: {
			live: "https://studpro.ieeeyp.lk",
			repo: "https://github.com/IEEESriLanka/studpro.ieeeyp.lk",
			case: "/work/ieee-studpro-portal",
		},
	},
	{
		id: "pos-system",
		title: "POS System – C# with .NET Framework",
		description:
			"Created a Windows Forms POS system with billing, inventory, and reporting modules. Integrated SQL Server for data management and transaction handling with receipt generation and customer management.",
		image: "/images/projects/pos-system.jpg",
		technologies: [
			"C#",
			".NET Framework",
			"Windows Forms",
			"SQL Server",
			"Desktop App",
		],
		role: "Desktop Application Developer",
		year: "2023",
		status: "Completed",
		links: {
			case: "/work/pos-system",
		},
	},
];

// Featured projects for homepage - selecting top 3 projects
export const featuredProjects = projects.slice(0, 3);
