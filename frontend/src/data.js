export const profile = {
  name: "Mahender Yadav",
  role: "Full Stack Developer",
  tagline: "I build production MERN systems that hold up under real traffic.",
  email: "mahenderyadav1708@gmail.com",
  phone: "+91-6367912284",
  github: "https://github.com/mahender-ydv",
  linkedin: "https://www.linkedin.com/in/mahender-ydv/",
  location: "Jaipur, Rajasthan, India",
  // Replace with your real Google Drive share link (set to "Anyone with the link can view").
  resumeUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
  summary:
    "Full Stack Developer with hands-on production experience building scalable web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js), Next.js, and TypeScript. Delivered measurable performance gains, including a 2x reduction in API response time via Redis caching and a Google PageSpeed score improvement from 55 to 90, alongside REST API design, admin dashboards, and JWT-based authentication. Strong foundation in Data Structures & Algorithms (500+ problems solved) and full-stack project delivery from database design through frontend UI.",
};

export const metrics = [
  { label: "PageSpeed Score", from: 55, to: 90, suffix: "", note: "Performance, Lighthouse" },
  { label: "Accessibility Score", from: 60, to: 90, suffix: "", note: "Lighthouse audit" },
  { label: "API Response Time", from: 800, to: 150, suffix: "ms", invert: true, note: "Redis caching layer" },
  { label: "Bundle Size", from: 100, to: 65, suffix: "%", invert: true, note: "35% reduction" },
  { label: "First Contentful Paint", from: 38, to: 16, suffix: "s", decimal: true, invert: true, note: "3.8s \u2192 1.6s" },
  { label: "DSA Problems Solved", from: 0, to: 500, suffix: "+", note: "LeetCode & platforms" },
];

export const experience = [
  {
    company: "Kuchoriya TechSoft Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "May 2025 \u2014 Present",
    stack: ["Next.js", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB", "Redis"],
    points: [
      "Optimized the company website via lazy loading, code splitting, and image optimization \u2014 raising Lighthouse performance from 55 to 90 and accessibility from 60 to 90.",
      "Reduced bundle size by 35% and image payload by 60%, cutting First Contentful Paint from 3.8s to 1.6s and Largest Contentful Paint from 5.2s to 2.1s.",
      "Implemented Redis caching for frequently accessed API responses \u2014 cutting average response time from 800ms to 150ms, reducing MongoDB query load by 70%, and doubling requests handled per second.",
      "Built and enhanced the admin panel in React.js, shipping new features for internal stakeholders.",
      "Designed and integrated backend REST APIs with Node.js and Express.js connecting frontend and database layers.",
    ],
  },
];

export const projects = [
  {
    id: "eduhome",
    name: "EduHome",
    tagline: "Multi-tenant online schooling & course marketplace",
    period: "2025",
    accent: "violet",
    liveUrl: "https://eduhome.example.com",
    githubUrl: "https://github.com/your-username/eduhome-marketplace-mern",
    description:
      "A production-grade MERN course marketplace where schools and coaching institutes independently register, sell courses, and operate in full data isolation \u2014 while students browse and enroll across every organization from one platform.",
    highlights: [
      "3-tier RBAC across student, admin, and super_admin roles with server-side enforced per-organization data isolation",
      "Razorpay payment integration with HMAC-SHA256 verified webhooks for secure enrollment",
      "Live doubt-solving chat via Socket.IO with JWT-authenticated, per-chapter chat rooms",
      "Cloudinary-powered video & PDF delivery, migrated to direct streaming uploads after a security audit flagged a CVSS 8.6 vulnerability",
      "QR-verifiable PDF certificates, TOTP-based 2FA, and token-versioned \u201clog out all devices\u201d",
      "Super-admin approval & suspension workflow governing every institute on the platform",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Razorpay", "Cloudinary", "JWT", "TOTP"],
  },
  {
    id: "testpro",
    name: "TestPro",
    tagline: "Online test management system",
    period: "Feb 2025 \u2014 Apr 2025",
    accent: "signal",
    liveUrl: "https://testpro.example.com",
    githubUrl: "https://github.com/your-username/testpro",
    description:
      "A full-stack online test management platform supporting subject-based test papers, multi-section assessments, and detailed performance analytics.",
    highlights: [
      "Admin dashboard for managing users, subjects, test papers, and question banks with full CRUD and RBAC",
      "Instant, automated test evaluation and scoring analytics",
      "Secure JWT-based authentication across the platform",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
  },
  {
    id: "chatty",
    name: "Chatty",
    tagline: "Real-time chat application with AI auto-replies",
    period: "Jan 2025 \u2014 Feb 2025",
    accent: "amber",
    liveUrl: "https://chatty.example.com",
    githubUrl: "https://github.com/your-username/chatty",
    description:
      "A real-time messaging application built on the MERN stack and Socket.IO, with instant delivery, typing indicators, and live presence tracking.",
    highlights: [
      "Instant message delivery, typing indicators, and live online/offline presence via Socket.IO",
      "Gemini API integration powering AI-generated smart auto-replies inside the chat interface",
      "Secure JWT-based authentication with role-based authorization",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Gemini API", "JWT"],
  },
];

export const skills = {
  Languages: ["C", "C++", "JavaScript", "TypeScript", "Java", "SQL"],
  Frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Responsive Design"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  "Databases & Tools": ["MongoDB", "Redis", "MySQL", "Git", "GitHub", "Postman"],
};

export const education = [
  {
    degree: "Master of Computer Applications",
    school: "JECRC University, Jaipur",
    period: "2024 \u2014 2026",
  },
  {
    degree: "Bachelor of Computer Applications",
    school: "University Maharaja College, Jaipur",
    period: "2021 \u2014 2024",
  },
];

export const extras = [
  {
    title: "500+ DSA Problems Solved",
    detail: "Solved across LeetCode and other competitive programming platforms.",
  },
  {
    title: "Published Researcher",
    detail:
      "\u201cHow Google Search Affects Human Intelligence\u201d \u2014 published in IJNRD (International Journal of Novel Research and Development), examining the cognitive impact of search-engine use.",
  },
];
