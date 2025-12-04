// Script to seed the database with sample certifications (uses data copied from src/data/certifications.ts)
const mongoose = require('mongoose');
// prefer .env.local when present (common for Next.js local envs) and fallback to .env
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env.local or .env — create a .env.local file with MONGODB_URI="mongodb+srv://<user>:<pass>@cluster-yourcluster.mongodb.net/<db>?retryWrites=true&w=majority"');
  process.exit(1);
}

// Certification Schema (kept minimal and similar to the models/certifications.ts schema)
const certificationSchema = new mongoose.Schema(
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
  { timestamps: true }
);

// Indexes for faster queries
certificationSchema.index({ issuer: 1 });
certificationSchema.index({ createdAt: -1 });

const Certification = mongoose.models.Certification || mongoose.model('Certification', certificationSchema);

const sampleCertifications = [
  {
    title: "Spring Boot 3 Essential Training",
    issuer: "LinkedIn",
    issueDate: "2025-06-03",
    credentialId: " e3cc99d9e26e58a721c3745b2c8237422104efd89a8b1001e8a8bbf3a2e4da89",
    credentialUrl: "https://www.linkedin.com/learning/certificates/e3cc99d9e26e58a721c3745b2c8237422104efd89a8b1001e8a8bbf3a2e4da89?trk=share_certificate",
    description: "Essential training in Spring Boot 3, covering core concepts and practical application.",
    image: "/images/certifications/spring-boot.png",
    skills: ["Spring Boot", "Java", "Backend Development"],
  },
  {
    title: "AI/ML Enginner - Stage 1",
    issuer: "SLIIT",
    issueDate: "2025-10-06",
    credentialId: "wxqfruy6fj",
    credentialUrl: "https://code.sliit.org/certificates/wxqfruy6fj",
    description: "Stage 1 certification for AI/ML engineering, foundational concepts and skills.",
    image: "/images/certifications/aiml-stage1.png",
    skills: ["AI", "Machine Learning", "Engineering", "AI Algorithms"],
  },
  {
    title: "React: Using TypeScript",
    issuer: "LinkedIn",
    issueDate: "2024-09-14",
    credentialId: "42f047de28e17d36f68396dab7f78cdde42560241763d9c4dd42b5631e2d19f3",
    credentialUrl: "https://www.linkedin.com/learning/certificates/42f047de28e17d36f68396dab7f78cdde42560241763d9c4dd42b5631e2d19f3?trk=share_certificate",
    description: "Certification for using TypeScript with React, focusing on type safety and best practices.",
    image: "/images/certifications/react-typescript.png",
    skills: ["React", "TypeScript", "Frontend Development"],
  },
  {
    title: "LinkedIn Certified Learning C++",
    issuer: "LinkedIn",
    issueDate: "2024-11-04",
    credentialId: "0250af71d5cc3e425d00bb30ebdbde324893e174e97ef8286153a804d9e307a3",
    credentialUrl: "https://www.linkedin.com/learning/certificates/0250af71d5cc3e425d00bb30ebdbde324893e174e97ef8286153a804d9e307a3?trk=share_certificate",
    description: "Certified learning in C++ programming through LinkedIn Learning.",
    image: "/images/certifications/linkedin-cpp.png",
    skills: ["C++", "Data Structures", "Software Development", "Algorithms"],
  },
  {
    title: "Learning Next.js",
    issuer: "LinkedIn",
    issueDate: "2024-09-28",
    credentialId: "21774ac732e3f5114b1deaab249d7109e91114bbe776ea49ddd9615bd95f79cc",
    credentialUrl: "https://www.linkedin.com/learning/certificates/21774ac732e3f5114b1deaab249d7109e91114bbe776ea49ddd9615bd95f79cc?trk=share_certificate",
    description: "Course completed by Dasun Sri Nethmal. Top skills covered: Web Development, Front-End Development, Next.js.",
    image: "/images/certifications/learning-nextjs.png",
    skills: ["Web Development", "Front-End Development", "Next.js"],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing certifications
    await Certification.deleteMany({});
    console.log('Cleared existing certifications');

    // Insert sample certifications
    const inserted = await Certification.insertMany(sampleCertifications);
    console.log(`Inserted ${inserted.length} certifications`);

    inserted.forEach((c) => console.log(`- ${c.title} (ID: ${c._id})`));

    process.exit(0);
  } catch (error) {
    console.error('\nError seeding certifications:', error);
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

// Export sampleCertifications so other scripts (for validation, tests) can `require` this file
module.exports = { sampleCertifications };