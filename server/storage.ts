import { 
  type User, 
  type InsertUser, 
  type ContactMessage, 
  type InsertContactMessage,
  type Project,
  type Skill,
  type TimelineItem
} from "@shared/schema";
import { randomUUID } from "crypto";

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "NEON NEXUS",
    description: "Immersive 3D web experience with real-time particle systems and interactive environments.",
    longDescription: "A groundbreaking WebGL experience that pushes the boundaries of what's possible in the browser. Features custom shaders, physics-based animations, and adaptive performance optimization. Built with performance in mind, it adapts to device capabilities to deliver smooth experiences across all platforms.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    technologies: ["Three.js", "React", "GSAP", "WebGL", "TypeScript", "Vite"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Creative",
  },
  {
    id: "2",
    title: "CYBER COMMERCE",
    description: "Next-gen e-commerce platform with AI-powered recommendations and seamless UX.",
    longDescription: "A full-stack e-commerce solution featuring real-time inventory management, AI-driven product recommendations, and a cutting-edge checkout experience. The platform handles thousands of concurrent users with optimized database queries and caching strategies.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "TailwindCSS", "Redis", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "E-commerce",
  },
  {
    id: "3",
    title: "PULSE DASHBOARD",
    description: "Real-time analytics dashboard with stunning data visualizations and live updates.",
    longDescription: "An enterprise-grade analytics platform with real-time data streaming, customizable widgets, and beautiful chart animations that make data come alive. Features WebSocket-based live updates and drag-and-drop dashboard customization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "Node.js", "WebSocket", "MongoDB", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Dashboard",
  },
  {
    id: "4",
    title: "SYNTHWAVE STUDIO",
    description: "Web-based music production tool with synthesizers and visual audio feedback.",
    longDescription: "A browser-based digital audio workstation featuring virtual synthesizers, real-time audio visualization, and collaborative music creation capabilities. Leverages the Web Audio API for low-latency sound synthesis.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
    technologies: ["Web Audio API", "React", "Canvas", "TypeScript", "MIDI.js", "Tone.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Creative",
  },
  {
    id: "5",
    title: "VOID SOCIAL",
    description: "Privacy-focused social platform with end-to-end encryption and decentralized architecture.",
    longDescription: "A next-generation social network built on privacy principles, featuring end-to-end encryption, decentralized data storage, and user-controlled algorithms. Users own their data and can export or delete it at any time.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    technologies: ["React", "GraphQL", "Node.js", "IPFS", "Web3.js", "Encryption"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Social",
  },
  {
    id: "6",
    title: "QUANTUM NOTES",
    description: "AI-enhanced note-taking app with semantic search and automatic organization.",
    longDescription: "An intelligent note-taking application that uses AI to organize, connect, and surface your notes when you need them most. Features include automatic tagging, semantic search, and knowledge graph visualization.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop",
    technologies: ["Next.js", "OpenAI", "Pinecone", "TailwindCSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Productivity",
  },
];

const defaultSkills: Skill[] = [
  { name: "React", icon: "braces", category: "frontend", level: 95 },
  { name: "TypeScript", icon: "code", category: "frontend", level: 90 },
  { name: "Three.js", icon: "box", category: "frontend", level: 85 },
  { name: "Next.js", icon: "globe", category: "frontend", level: 90 },
  { name: "Tailwind", icon: "palette", category: "frontend", level: 95 },
  { name: "Framer Motion", icon: "layers", category: "frontend", level: 88 },
  { name: "Node.js", icon: "server", category: "backend", level: 85 },
  { name: "PostgreSQL", icon: "database", category: "backend", level: 80 },
  { name: "GraphQL", icon: "cloud", category: "backend", level: 75 },
  { name: "Express", icon: "terminal", category: "backend", level: 85 },
  { name: "Git", icon: "git", category: "tools", level: 90 },
  { name: "Docker", icon: "box", category: "tools", level: 75 },
  { name: "Figma", icon: "figma", category: "design", level: 80 },
  { name: "WebGL", icon: "cpu", category: "frontend", level: 70 },
  { name: "GSAP", icon: "layers", category: "frontend", level: 85 },
  { name: "React Native", icon: "mobile", category: "frontend", level: 75 },
];

const defaultTimeline: TimelineItem[] = [
  {
    id: "1",
    year: "2024",
    title: "Senior Creative Developer",
    subtitle: "Digital Agency",
    description: "Leading the development of immersive web experiences using Three.js, WebGL, and modern frameworks.",
    type: "experience",
  },
  {
    id: "2",
    year: "2023",
    title: "Full-Stack Developer",
    subtitle: "Tech Startup",
    description: "Built scalable applications with React, Node.js, and PostgreSQL. Implemented real-time features and 3D visualizations.",
    type: "experience",
  },
  {
    id: "3",
    year: "2022",
    title: "Master of Computer Science",
    subtitle: "University of Technology",
    description: "Specialized in Computer Graphics and Interactive Media. Thesis on real-time 3D rendering optimization.",
    type: "education",
  },
  {
    id: "4",
    year: "2021",
    title: "Frontend Developer",
    subtitle: "Creative Studio",
    description: "Developed interactive websites and web applications. First exposure to Three.js and creative coding.",
    type: "experience",
  },
  {
    id: "5",
    year: "2020",
    title: "Bachelor of Computer Science",
    subtitle: "State University",
    description: "Foundation in algorithms, data structures, and software engineering principles.",
    type: "education",
  },
];

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | undefined>;
  getSkills(): Promise<Skill[]>;
  getTimeline(): Promise<TimelineItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private projects: Map<string, Project>;
  private skills: Skill[];
  private timeline: TimelineItem[];

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.projects = new Map();
    this.skills = defaultSkills;
    this.timeline = defaultTimeline;
    
    defaultProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getTimeline(): Promise<TimelineItem[]> {
    return this.timeline;
  }
}

export const storage = new MemStorage();
