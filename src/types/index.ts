import type { StaticImageData } from "next/image";

export interface SkillGroup {
  id: string;
  category: string;
  code: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface ClientProject {
  name: string;
  url: string;
  stack?: string[];
  highlights: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  clientProject?: {
    name: string;
    url: string;
    stack: string[];
  };
  highlights?: string[];
  clientProjects: ClientProject[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  chassisCode: string; // Engineering / automotive designation code e.g. "REV-01"
  stack: string[];
  description: string;
  metric?: {
    value: number;
    suffix: string;
    label: string;
  };
  publication?: string;
  publicationUrl?: string;
  deploymentNotice?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface PersonalInfo {
  name: string;
  roleTitle: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  logline?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  huggingfaceUrl?: string;
  resumeUrl?: string;
}

export interface SocialLink {
  name: string;
  label: string;
  url: string;
  isPlaceholder?: boolean;
}

export interface DetourSlide {
  id: string;
  slotNumber: string;
  aspectRatio: string;
  title: string;
  caption: string;
  tag: string;
  image?: StaticImageData | string;
}
