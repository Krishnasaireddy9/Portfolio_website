import { PersonalInfo, SkillGroup, Experience, Project, DetourSlide } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Alla Krishna Sai Reddy",
  roleTitle: "AI/ML Engineer | Generative AI | Full Stack Developer",
  location: "Vijayawada, Andhra Pradesh 521212",
  phone: "+91 9542221188",
  email: "krishnasai2004reddy@gmail.com",
  summary:
    "AI/ML and full-stack engineer who ships LLM applications end to end — LangGraph multi-agent workflows, Retrieval-Augmented Generation, OCR-based document extraction, and the REST APIs, in Python and Node.js/TypeScript, that put them in front of users. Deployed on Vercel, Render, and Hugging Face Spaces. Published research on deep learning for medical image classification.",
  logline:
    "I don't just train models — I ship the products they live in.",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/krishnasai2004",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/krishnasai2004",
  huggingfaceUrl: process.env.NEXT_PUBLIC_HUGGINGFACE_URL || "https://huggingface.co/krishnasai2004",
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf",
};

export const educationLine = "B.Tech CSE (AI & ML), Lovely Professional University, Jalandhar, 2021–2025.";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    code: "SYS-01",
    category: "Languages",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "HTML",
      "CSS",
      "Data Structures & Algorithms",
    ],
  },
  {
    id: "ml",
    code: "SYS-02",
    category: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "NumPy",
      "Deep Learning",
      "CNNs",
      "Transfer Learning",
      "Computer Vision",
    ],
  },
  {
    id: "genai",
    code: "SYS-03",
    category: "Generative AI & LLMs",
    items: [
      "Retrieval-Augmented Generation (RAG)",
      "LangGraph",
      "LLM APIs",
      "Mistral OCR",
    ],
  },
  {
    id: "fullstack",
    code: "SYS-04",
    category: "Full-Stack & APIs",
    items: [
      "React 18",
      "Next.js 14",
      "Tailwind CSS",
      "FastAPI",
      "Flask",
      "Node.js",
      "Express.js",
      "RESTful APIs",
    ],
  },
  {
    id: "databases",
    code: "SYS-05",
    category: "Databases & Vector Search",
    items: [
      "PostgreSQL",
      "Supabase",
      "pgvector",
      "FAISS",
      "Vector Embeddings",
      "MySQL",
      "MongoDB",
      "SQLite",
    ],
  },
  {
    id: "cloud",
    code: "SYS-06",
    category: "Cloud & Tools",
    items: [
      "Docker",
      "GCP",
      "Hugging Face Spaces",
      "Cloudflare Workers",
      "Git",
      "GitHub",
      "Postman",
      "Manual Software Testing",
    ],
  },
];

export const experience: Experience = {
  role: "Freelance Full Stack Developer",
  company: "Self-Employed",
  location: "Vijayawada, India",
  period: "Aug 2025–Present",
  clientProject: {
    name: "Manohar Organic Spices",
    url: "https://manoharorganicspices.com",
    stack: ["Astro", "JavaScript", "Tailwind CSS", "Cloudflare Workers"],
  },
  highlights: [
    "Built and deployed a responsive multi-page static site with reusable components, shared layouts, and a centralized data layer for product management.",
    "Implemented technical SEO (JSON-LD, XML sitemap, meta tags), validated with Google Rich Results Test.",
    "Deployed on Cloudflare Workers with a custom domain, environment variables, and image optimization.",
  ],
  clientProjects: [
    {
      name: "Manohar Organic Spices",
      url: "https://manoharorganicspices.com",
      stack: ["Astro", "JavaScript", "Tailwind CSS", "Cloudflare Workers"],
      highlights: [
        "Built and deployed a responsive multi-page static site with reusable components, shared layouts, and a centralized data layer for product management.",
        "Implemented technical SEO (JSON-LD, XML sitemap, meta tags), validated with Google Rich Results Test.",
        "Deployed on Cloudflare Workers with a custom domain, environment variables, and image optimization.",
      ],
    },
    {
      name: "Sai Manikanta Tours & Travels",
      url: "https://sai-manikanta-tours.pages.dev/en",
      stack: ["React", "TypeScript", "Supabase", "Cloudflare Pages"],
      highlights: [
        "Built and launched a trilingual (English, Telugu, Hindi) website with tour package listings, fleet pages, and a WhatsApp deep-link inquiry flow to capture leads.",
        "Developed the React and TypeScript frontend and an admin CMS portal on Supabase (PostgreSQL, Auth, Storage, Edge Functions) so the owner updates content without code changes.",
        "Implemented SEO infrastructure (sitemap.xml, robots.txt, hreflang, JSON-LD) and a rule-based travel assistant widget; deployed on Cloudflare Pages.",
      ],
    },
  ],
};

export const projects: Project[] = [
  {
    id: "klerk-ai",
    chassisCode: "01",
    title: "Klerk AI",
    subtitle: "Autonomous Administrative Automation Suite",
    stack: ["Node.js", "Express.js", "Next.js 14", "TypeScript", "PostgreSQL", "GCP"],
    description:
      "Turns a WhatsApp message into a filed invoice — no human required.",
    liveUrl: process.env.NEXT_PUBLIC_KLERK_LIVE_URL || "#",
    githubUrl: process.env.NEXT_PUBLIC_KLERK_GITHUB_URL || "#",
  },
  {
    id: "jobjutsu-ai",
    chassisCode: "02",
    title: "JobJutsu AI",
    subtitle: "AI-Powered Career Copilot",
    stack: ["Python", "LangGraph", "Streamlit", "Hugging Face Spaces", "Gemini"],
    description:
      "Reads your resume, checks it against the job, tells you what's missing.",
    liveUrl: process.env.NEXT_PUBLIC_JOBJUTSU_LIVE_URL || "#",
    githubUrl: process.env.NEXT_PUBLIC_JOBJUTSU_GITHUB_URL || "#",
  },
  {
    id: "diabetic-retinopathy",
    chassisCode: "03",
    title: "AI-Powered Detection of Diabetic Retinopathy",
    subtitle: "Deep Learning Medical Image Classifier",
    stack: ["Python", "PyTorch", "TensorFlow", "Flask", "OpenCV", "NumPy", "SQLite"],
    description:
      "Trained to read retinal scans the way a specialist would — 82% validation accuracy, published in IRJET.",
    metric: {
      value: 82,
      suffix: "%",
      label: "Validation Accuracy",
    },
    liveUrl: process.env.NEXT_PUBLIC_RETINOPATHY_LIVE_URL || "#",
    githubUrl: process.env.NEXT_PUBLIC_RETINOPATHY_GITHUB_URL || "#",
    publicationUrl: process.env.NEXT_PUBLIC_RETINOPATHY_PUBLICATION_URL || "https://www.irjet.net",
  },
];

export const detourSlots: DetourSlide[] = [
  {
    id: "slot-1",
    slotNumber: "PLATE 01",
    aspectRatio: "16:9",
    title: "Placeholder 01",
    caption: "",
    tag: "STILL",
  },
  {
    id: "slot-2",
    slotNumber: "PLATE 02",
    aspectRatio: "4:3",
    title: "Placeholder 02",
    caption: "",
    tag: "STILL",
  },
  {
    id: "slot-3",
    slotNumber: "PLATE 03",
    aspectRatio: "16:9",
    title: "Placeholder 03",
    caption: "",
    tag: "STILL",
  },
  {
    id: "slot-4",
    slotNumber: "PLATE 04",
    aspectRatio: "1:1",
    title: "Placeholder 04",
    caption: "",
    tag: "STILL",
  },
  {
    id: "slot-5",
    slotNumber: "PLATE 05",
    aspectRatio: "4:3",
    title: "Placeholder 05",
    caption: "",
    tag: "STILL",
  },
];
