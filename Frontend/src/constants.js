import {
  BookOpen,
  HelpCircle,
  TrendingUp,
  Target,
  LayoutDashboard,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  Users2,
  Twitter, Github, Linkedin, Mail
} from "lucide-react";
export const getStats = ({
  totalSubjects,
  totalQuestions,
  completedQuestions,
  avgProgressPercentage,
}) => [
  {
    title: "Total Subjects",
    value: totalSubjects,
    icon: BookOpen,
    description: "Available learning paths",
    gradient: "from-blue-400 to-blue-500",
    bgColor: "bg-blue-100/70 dark:bg-blue-900/30",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
  },
  {
    title: "Total Questions",
    value: totalQuestions.toLocaleString(),
    icon: HelpCircle,
    description: "Practice questions available",
    gradient: "from-purple-400 to-purple-500",
    bgColor: "bg-purple-100/70 dark:bg-purple-900/30",
    borderColor: "border-purple-200/50 dark:border-purple-800/30",
  },
  {
    title: "Questions Completed",
    value: completedQuestions.toLocaleString(),
    icon: Target,
    description: "Successfully answered",
    gradient: "from-green-400 to-green-500",
    bgColor: "bg-green-100/70 dark:bg-green-900/30",
    borderColor: "border-green-200/50 dark:border-green-800/30",
  },
  {
    title: "Average Progress",
    value: `${avgProgressPercentage}%`,
    icon: TrendingUp,
    description: "Overall completion rate",
    gradient: "from-yellow-400 to-yellow-500",
    bgColor: "bg-yellow-100/70 dark:bg-yellow-900/30",
    borderColor: "border-yellow-200/50 dark:border-yellow-800/30",
    isProgress: true,
  },
];

export const testimonials = [
  {
    name: "Ankit Sharma",
    role: "Software Engineer @ Google",
    feedback:
      "PrepMate’s curated question bank saved me hours of prep. The structured layout made revising effortless!",
  },
  {
    name: "Riya Sen",
    role: "CS Student",
    feedback:
      "I love the subject-wise progress tracking. It really helped me focus on weak areas before my interviews.",
  },
  {
    name: "Vikram Das",
    role: "Developer @ Microsoft",
    feedback:
      "The questions are clear, concise, and relevant. PrepMate is a must-have for anyone preparing for CS interviews.",
  },
  {
    name: "Priya Mehta",
    role: "Software Developer @ Amazon",
    feedback:
      "The interface is clean and distraction-free. I can revise quickly without getting lost in unnecessary details.",
  },
  {
    name: "Siddharth Roy",
    role: "CS Student",
    feedback:
      "PrepMate’s subject and subtopic mapping made my preparation so much more organized and efficient.",
  },
  {
    name: "Ananya Gupta",
    role: "Backend Engineer @ Infosys",
    feedback:
      "The curated question bank is excellent. It helped me cover topics I often overlook while preparing.",
  },
  {
    name: "Rohan Verma",
    role: "Software Engineer @ Adobe",
    feedback:
      "I especially love the progress tracking feature. It keeps me motivated to complete all sections on time.",
  },
];

export const faqs = [
  {
    question: "What is PrepMate?",
    answer:
      "PrepMate is your personal Computer Science Q&A bank, curated by experts, to help you revise and prepare efficiently for interviews and exams.",
  },
  {
    question: "Do I need to pay to use PrepMate?",
    answer:
      "No, the core features are free. In the future, premium features like cloud backup and advanced analytics may be introduced.",
  },
  {
    question: "Is my progress tracked?",
    answer:
      "Yes! PrepMate tracks your progress subject-wise, showing question counts and performance stats to help you focus on weaker areas.",
  },
  {
    question: "Is the content reliable?",
    answer:
      "Absolutely. Every question is carefully curated and verified by our admins to ensure accuracy and clarity.",
  },
  {
    question: "Can I access PrepMate on mobile?",
    answer:
      "Yes, the web app is fully responsive and works smoothly on mobile, tablet, and desktop.",
  },
  {
    question: "Are there preloaded questions?",
    answer:
      "Yes, PrepMate comes with a set of common interview questions for each CS subject, ready for practice and revision.",
  },
];

export const features = [
  {
    icon: BookOpen,
    title: "Organized Learning",
    desc: "Subjects and subtopics mapped for a smooth, structured progression.",
  },
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    desc: "Track your progress with subject-wise insights and real-time stats.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Content",
    desc: "Every question is admin-curated and verified for accuracy and clarity.",
  },
  {
    icon: BarChart3,
    title: "Elegant UI",
    desc: "Minimal, distraction-free design with responsive light/dark themes.",
  },
];

export const coreValues = [
  {
    icon: CheckCircle2,
    title: "Quality First",
    description:
      "Every question and resource is carefully curated and verified by industry professionals",
  },
  {
    icon: Users2,
    title: "Community Driven",
    description:
      "Real experiences from real people who've successfully navigated their interview journey",
  },
  {
    icon: Target,
    title: "Results Focused",
    description:
      "Practical preparation tools designed to help you succeed in interviews and exams",
  },
];

export const socialLinks = [
  {
    href: "https://x.com/Arunava17818355",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "https://github.com/arunava2018",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/arunava-banerjee1/",
    icon: Linkedin,
    label: "LinkedIn",
  },
];
