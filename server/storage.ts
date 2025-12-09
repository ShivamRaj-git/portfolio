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
    title: "DAWAI NOW – Medicine Distribution Management System",
    description: "A system to manage medicine stock, distributors, retailers and sales/returns. Designed ER diagrams, DFDs, database schema and implemented core CRUD operations for managing records.",
    longDescription: "A comprehensive medicine distribution management system built as a DBMS project. Structured data flow using DFDs and ERD. Implemented modules for purchase, sales, and returns. Focused on data consistency and simple UI for operators. This project helped me understand real-world problem solving, database design and UI/UX principles.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop",
    technologies: ["C", "Java", "SQL", "DBMS"],
    liveUrl: "",
    githubUrl: "",
    category: "Database",
  },
  {
    id: "2",
    title: "To-Do List Application",
    description: "A simple productivity app to add, update, and delete daily tasks. Built as a mini project to practice Python logic and user interaction.",
    longDescription: "A clean and simple interface for daily tasks. Learned file handling and basic persistence. Improved understanding of Python functions and modules. Built during my internship at CodeSoft to practice writing clean, modular Python code.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    technologies: ["Python"],
    liveUrl: "",
    githubUrl: "",
    category: "Productivity",
  },
  {
    id: "3",
    title: "EMI Calculator",
    description: "Desktop tool to calculate monthly EMIs, total payable amount, and total interest based on principal, rate and tenure.",
    longDescription: "Implemented EMI formula and validation. Helped understand financial calculations and UI events. A desktop application built with VB 6.0 to practice logic development and user interface design.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    technologies: ["VB 6.0"],
    liveUrl: "",
    githubUrl: "",
    category: "Finance",
  },
  {
    id: "4",
    title: "Personal Portfolio – Gen-Z Rave Theme",
    description: "An animated, dark rave themed portfolio to showcase my skills, projects and experience with smooth transitions and 3D visuals.",
    longDescription: "Custom hero section with 3D sphere and particle background. Command-palette (Cmd + K) for quick navigation. Responsive layout for mobile and desktop. Built with Next.js, TypeScript, and three.js to create immersive experiences on the web.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["Next.js", "TypeScript", "three.js"],
    liveUrl: "",
    githubUrl: "",
    category: "Creative",
  },
];

const defaultSkills: Skill[] = [
  // Languages
  { name: "C", icon: "code", category: "frontend", level: 75 },
  { name: "C++", icon: "code", category: "frontend", level: 75 },
  { name: "Java", icon: "code", category: "frontend", level: 70 },
  { name: "Python", icon: "code", category: "backend", level: 80 },
  { name: "JavaScript", icon: "code", category: "frontend", level: 85 },
  { name: "TypeScript", icon: "code", category: "frontend", level: 75 },
  // Web Technologies
  { name: "HTML5", icon: "globe", category: "frontend", level: 90 },
  { name: "CSS3", icon: "palette", category: "frontend", level: 85 },
  { name: "Bootstrap", icon: "palette", category: "frontend", level: 80 },
  { name: "Tailwind", icon: "palette", category: "frontend", level: 85 },
  { name: "React", icon: "braces", category: "frontend", level: 70 },
  { name: "Next.js", icon: "globe", category: "frontend", level: 65 },
  // Backend
  { name: "Node.js", icon: "server", category: "backend", level: 75 },
  { name: "Express", icon: "terminal", category: "backend", level: 75 },
  { name: "REST APIs", icon: "cloud", category: "backend", level: 75 },
  // Database
  { name: "MySQL", icon: "database", category: "backend", level: 75 },
  { name: "Oracle", icon: "database", category: "backend", level: 70 },
  // Tools & Platforms
  { name: "Git", icon: "git", category: "tools", level: 85 },
  { name: "GitHub", icon: "git", category: "tools", level: 85 },
  { name: "VS Code", icon: "code", category: "tools", level: 90 },
  { name: "Replit", icon: "code", category: "tools", level: 80 },
  { name: "Cursor", icon: "code", category: "tools", level: 85 },
  // Core CS / Others
  { name: "DSA", icon: "cpu", category: "tools", level: 70 },
  { name: "OOP", icon: "code", category: "frontend", level: 80 },
  { name: "DBMS", icon: "database", category: "backend", level: 75 },
  { name: "Problem Solving", icon: "cpu", category: "tools", level: 75 },
  { name: "Three.js", icon: "box", category: "frontend", level: 65 },
];

const defaultTimeline: TimelineItem[] = [
  {
    id: "1",
    year: "2025",
    title: "Graduation",
    subtitle: "Arcade Business College",
    description: "Pursuing graduation from Arcade Business College, building a strong foundation in business and technology.",
    type: "education",
  },
  {
    id: "2",
    year: "2024",
    title: "Virtual Intern – Data Science & Web Scraping",
    subtitle: "Cognifyz Technologies",
    description: "Completed level-based tasks including web scraping and data handling in Python. Automated data collection from websites and cleaned the data for analysis. Strengthened skills in Python, requests, BeautifulSoup, and data processing.",
    type: "experience",
  },
  {
    id: "3",
    year: "2024",
    title: "Virtual Intern – Python Developer",
    subtitle: "CodeSoft",
    description: "Built mini-projects like a To-Do List application and calculator tools. Practiced writing clean, modular Python code. Gained experience working with tasks and deadlines in a remote setup.",
    type: "experience",
  },
  {
    id: "4",
    year: "Ongoing",
    title: "B.Tech Student – College Projects",
    subtitle: "Computer Science / IT",
    description: "DBMS project: Medicine Distribution Management System (DAWAI NOW). Multiple programs in C, Java and Python focusing on DSA and problem solving.",
    type: "experience",
  },
  {
    id: "5",
    year: "2021",
    title: "12th Pass",
    subtitle: "Korari Jodhan Bigha",
    description: "Completed 12th standard from Korari Jodhan Bigha, focusing on academic excellence and personal growth.",
    type: "education",
  },
  {
    id: "6",
    year: "2019",
    title: "10th Pass",
    subtitle: "Serons Public Schools",
    description: "Completed 10th standard from Serons Public Schools, establishing the foundation for future academic pursuits.",
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
