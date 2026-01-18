// lib/data.js

export const mockProfileData = {
  score: 67,
  sections: {
    headline: { score: 45, weight: 20 },
    about: { score: 72, weight: 15 },
    experience: { score: 68, weight: 25 },
    projects: { score: 55, weight: 20 },
    consistency: { score: 80, weight: 20 },
  },
  strengths: [
    "Clear job progression showing career growth",
    "Consistent presence with regular activity",
    "Professional tone maintained throughout",
  ],
  weaknesses: [
    "Headline lacks specific value proposition",
    "Missing quantified achievements in experience",
    "Projects section underdeveloped",
    "About section doesn't showcase unique expertise",
  ],
};

export const mockSuggestions = [
  {
    category: "Headline",
    current: "Software Engineer | Tech Enthusiast",
    suggested:
      "Senior Software Engineer | Built 3 SaaS products serving 50K+ users | React, Node.js, AWS",
    impact: "High",
    reason:
      "Your headline is the first thing recruiters see. Add specific value and social proof.",
  },
  {
    category: "Experience",
    current: "Worked on frontend development and improved user experience",
    suggested:
      "Led frontend architecture redesign, reducing page load time by 40% and increasing user engagement by 25% (measured via analytics)",
    impact: "High",
    reason:
      "Quantified achievements are 3x more memorable and credible to recruiters.",
  },
  {
    category: "About",
    current: "Passionate developer interested in building great products",
    suggested:
      "I specialize in building scalable web applications that solve real business problems. In the past 3 years, I've shipped products used by 100K+ users and mentored 5 junior developers.",
    impact: "Medium",
    reason:
      "Replace generic statements with specific evidence of your expertise and impact.",
  },
  {
    category: "Projects",
    current: "Built a todo app using React",
    suggested:
      "Built TaskFlow (React, Firebase, Stripe) – a team productivity tool with 2K+ active users and $5K MRR. Implemented real-time collaboration and payment integration.",
    impact: "High",
    reason:
      "Projects with metrics and business impact demonstrate real-world capability.",
  },
];
