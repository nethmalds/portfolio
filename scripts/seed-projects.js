// Script to seed the database with sample projects (uses data copied from src/data/projects.ts)
const mongoose = require('mongoose');
// prefer .env.local when present (common for Next.js local envs) and fallback to .env
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env.local or .env — create a .env.local file with MONGODB_URI="mongodb+srv://<user>:<pass>@cluster-yourcluster.mongodb.net/<db>?retryWrites=true&w=majority"');
  process.exit(1);
}

// Project Schema (kept minimal and similar to the models/projects.ts schema)
const projectSchema = new mongoose.Schema(
  {
    id: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    role: { type: String, trim: true },
    year: { type: String, trim: true },
    status: { type: String, trim: true },
    category: { type: String, trim: true },
    links: {
      live: { type: String, trim: true },
      case: { type: String, required: true, trim: true },
      repo: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

const sampleProjects = [
  {
    title: "LexLine Jewelry eCommerce",
    description:
      "A modern, responsive full-stack storefront template for selling jewelry online, providing a polished catalog, variant management, secure cart and checkout, and streamlined basic order administration. It emphasizes accessibility, crisp visuals, minimal friction, and robust performance on mobile and desktop. Developers receive TypeScript-first architecture, componentized UI, sample seed data, and integration-ready patterns for payments and shipping. The starter includes responsive product pages, search and filtering, inventory-aware variants, lightweight account flows, and straightforward deployment instructions for cloud environments. Designed to accelerate building production storefronts while remaining flexible for customization and scaling across projects, optimized for rapid iteration and reliable developer experience outcomes.",
    image: "/images/projects/lexline.png",
    technologies: ["TypeScript", "Next.js", "Nodemailer", "Serverless","MongoDB", "Stripe","Vercel"],
    role: "Full‑stack Developer",
    year: "2025",
    status: "Active",
    category: "Web App",
    links: {
      live: "https://jewelry-ecommerce-beta.vercel.app/",
      case: "/projects/jewelry-ecommerce",
      repo: "https://github.com/nethmalds/jewelry-ecommerce",
    },
  },
  {
    title: "Ticket Booking Web App",
    description:
      "End-to-end TypeScript ticket booking system built for events and venues that supports interactive seat selection, reservation holds, and a secure checkout flow alongside real-world booking constraints to minimize double-booking. The design models timed holds with automatic release, concurrency-aware reservation locking, and inventory tracking for promotions and complex pricing tiers. Frontend uses TypeScript with accessible seat maps and responsive UX; backend services provide payments, notifications, analytics, and reporting. Developers get seeded fixtures, robust tests, clear APIs, and deployment scripts. The codebase is intended to be production-ready, extensible, well-documented, and straightforward to integrate into existing event platforms with support for high throughput.",
    image: "/images/projects/ticketbooking.png",
    technologies: ["TypeScript", "Next.js", "Serverless", "MongoDB", "Redis", "NextAuth.js", "Prisma", "Vercel" ],
    role: "System Architect",
    year: "2025",
    status: "Ongoing",
    category: "Web App",
    links: {
      live: "https://archtickets.vercel.app/",
      case: "/projects/ticket-booking",
      repo: "https://github.com/codearch-25/ticket-booking",
    },
  },
  {
    title: "FindWork Web App",
    description:
      "TypeScript-first job discovery web application focused on efficient search, filters, structured matching, and seamless application workflows serving both candidates and employers. It emphasizes strong typing across the stack, predictable APIs, and resilient client behavior for advanced querying and pagination. Candidate features include refined resumes, saved searches, alerts, and application tracking; employer features include posting workflows, candidate pipelines, and analytics dashboards for insights. The codebase demonstrates robust validation, secure authentication, performance-conscious rendering, and clear separation between UI and data layers. Designed as a practical foundation for real-world hiring platforms, it supports incremental improvements and integration with external HR systems and extensibility.",
    image: "/images/projects/findwork.png",
    technologies: ["TypeScript", "OAuth", "Next.js", "Serverless", "MongoDB", "Vercel", "Docker"],
    role: "Full-Stack Developer",
    year: "2024",
    status: "Active",
    category: "Web App",
    links: {
      live: "https://findwork-webapp.vercel.app/",
      case: "/projects/findwork-webapp",
      repo: "https://github.com/plymouth-projects/findwork-webapp",
    },
  },
  {
    title: "Findwork Mobile App",
    description:
      "A mobile application development project built with Flutter and native modules to showcase cross-platform user interfaces, platform-specific integrations, and maintainable architecture. It explores best practices for building performant UIs, bridging to platform APIs using C++ or Swift, and organizing code to maximize reuse while respecting native idioms. Example features include sensor access, offline data syncing, media handling, and adaptive layouts tailored per platform. The project includes automated tests, CI pipelines for builds, and sample documentation for extensibility. It serves both as an instructional reference for teams learning mobile-native interop and as a practical starter for production-quality cross-platform applications and patterns.",
    image: "/images/projects/findworkmobile.png",
    technologies: ["Dart", "Flutter", "C++", "FireStore","FireAuth", "Gradle", "Android", "OAuth", "Serverless"],
    role: "Mobile Application Developer",
    year: "2024",
    status: "Prototype",
    category: "Mobile App",
    links: {
      live: null,
      case: "/projects/mad-project",
      repo: "https://github.com/plymouth-projects/mad-project",
    },
  },
  {
    title: "Sensor Configuration Platform",
    description:
      "Sensor Configuration Platform is a web application that combines a TypeScript single-page frontend with a PHP backend to provide device parameter editing, validation workflows, batch configuration tools, and structured quality assurance reporting. The interface allows engineers to load device profiles, apply changes safely, preview generated configurations, and run synthetic validations before deployment. Backend APIs perform rule-based checks, consistency validation, and generate audit-friendly reports. The project demonstrates integration with SQL databases, containerized development with Docker, and continuous integration for regression detection. It is designed for maintainability, operational visibility, and safe large-scale device configuration management in production environments and operator-friendly rollback procedures included.",
    image: "/images/projects/sensor.png",
    technologies: ["TypeScript", "React", "Laravel", "MySQL", "PHP", "Google APIs", "MVC Architecture"],
    role: "Full‑stack Developer",
    year: "2024",
    status: "Prototype",
    category: "Web Platform",
    links: {
      live: null,
      case: "/projects/sensorconfig-sqa",
      repo: "https://github.com/plymouth-projects/sensorconfig-sqa",
    },
  },
  {
    title: "Piyawara Web Site",
    description:
      "Feature-rich TypeScript web application scaffold for content and service platforms, offering componentized UI, dynamic pages, and admin content editing patterns that scale with project needs. It includes typed data models, reusable components, responsive layouts, and routing patterns suitable for content-heavy sites and interactive tools. The scaffold supports role-based access, content previews, media management, and extensible plugin points for custom integrations. Developers benefit from strong typing, clear architecture, and production-oriented tooling that streamlines deployment and monitoring. This template accelerates building reliable web platforms while staying flexible enough for customization, localization, and iterative product development with robust documentation, testing examples, and support.",
    image: "/images/projects/piyawara.png",
    technologies: ["TypeScript", "React", "Next.js", "Nodemailer", "Tailwind CSS", "Vercel","Shadcn UI"],
    role: "Frontend Developer",
    year: "2025",
    status: "Active",
    category: "Web App",
    links: {
      live: "https://piyawara.vercel.app/",
      case: "/projects/piyawara-web",
      repo: "https://github.com/codearch-25/piyawara-web",
    },
  },
  {
    title: "User-Authentication Model Chain",
    description:
      "A modular machine-learning authentication solution focused on preprocessing pipelines, model training, evaluation workflows, and a lightweight inference API suitable for biometric or behavioral verification research. The repository provides reproducible data handling, checkpointing strategies, and evaluation metrics with sample notebooks to reproduce experiments. It includes procedures for hyperparameter tuning, model explainability, and baseline comparisons to accelerate iteration. The inference service is minimal and designed for integration into larger systems with secure endpoints and efficient batching. This project is ideal for prototyping verification systems, exploring privacy-preserving techniques, and building production-ready model deployment patterns in a controlled research setting and collaboration tooling included.",
    image: null,
    technologies: ["MATLAB", "Pattern Recognition", "Pre-Processing", "Parallel Processing", "Binary Classification", "Feature Extraction"],
    role: "ML Engineer",
    year: "2024",
    status: "Completed",
    category: "Machine Learning",
    links: {
      live: null,
      case: "/projects/authentication-model",
      repo: "https://github.com/nethmalds/authentication-model",
    },
  },
 {
    title: "Deep Learning Practised Projects",
    description:
      "A curated collection of deep-learning experiments, visualization notebooks, and training scripts focused on reproducibility and practical benchmarks for research and demo purposes. The repository documents model architectures, training pipelines, dataset handling, and reproducible evaluation metrics with clear instructions to reproduce checkpoints. Example experiments include classification, segmentation, and generative models, accompanied by sample datasets and baseline performance figures. It emphasizes reproducible environments, containerized training, and tooling for monitoring experiments and logging metrics. Designed as a learning-focused toolkit, the project supports rapid iteration, model comparison, and sharing of findings to accelerate research workflows and engineering collaboration with reproducible configs and example notebooks.",
    image: null,
    technologies: ["Python", "NLP", "TensorFlow", "Jupyter", "Image Processing", "Matplotlib", "CNN"],
    role: "AI/ ML Engineer",
    year: "2022-2024",
    status: "Prototype",
    category: "Machine Learning / Research",
    links: {
      live: null,
      case: "/projects/deep-learning",
      repo: "https://github.com/nethmalds/deep-learning",
    },
  },
  {
    title: "Plant E-commerce Mobile Application",
    description:
      "Plant E-commerce is a cloud-native Flutter mobile app built with Dart, using provider-based services for backend functionality and Supabase for authentication, data storage, and real-time syncing. It supports JWT and biometric authentication, role-based access control, offline-first caching with local persistence, push notifications, and CDN-optimized images. A provider-driven service layer abstracts all RESTful and real-time Supabase interactions, enabling transactional ordering, inventory updates via realtime channels, and server-driven UI updates. The codebase emphasizes strong typing, modular architecture, automated testing, and CI/CD pipelines designed for scalable deployment, with production-grade monitoring, structured logging, and built-in observability features.",
    image: "/images/projects/plant.png",
    technologies: ["Flutter", "Dart", "Supabase", "Android", "JWT", "Stripe", "Gradle", "iOS", "Serverless"],
    role: "Mobile Application Developer",
    year: "2025",
    status: "Completed",
    category: "Mobile App",
    links: {
      live: null,
      case: "/projects/plant-ecommerce",
      repo: "https://github.com/codearch-25/plant-ecommerce",
    },
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert sample projects
    const inserted = await Project.insertMany(sampleProjects);
    console.log(`Inserted ${inserted.length} projects`);

    inserted.forEach((p) => console.log(`- ${p.title} (ID: ${p._id})`));

    process.exit(0);
  } catch (error) {
    console.error('\nError seeding projects:', error);
    console.error('\nTroubleshooting tips:');
    console.error('- If you use MongoDB Atlas, make sure your IP is allowed in Network Access (or add 0.0.0.0/0 for testing).');
    console.error('- Verify the connection string (username, password, database name) and that the user has correct roles.');
    console.error('- Try connecting with MongoDB Compass or the `mongo` shell to confirm network access.');
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

// Export sampleProjects so other scripts (for validation, tests) can `require` this file
module.exports = { sampleProjects };
