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
  Twitter,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
export const getStats = ({
  totalSubjects,
  totalQuestions,
  completedQuestions,
  avgProgressPercentage,
}) => [
  {
    title: 'Total Subjects',
    value: totalSubjects,
    icon: BookOpen,
    description: 'Available learning paths',
    gradient: 'from-primary to-primary/80',
    bgColor: 'bg-card',
    borderColor: 'border-border',
  },
  {
    title: 'Total Questions',
    value: totalQuestions.toLocaleString(),
    icon: HelpCircle,
    description: 'Practice questions available',
    gradient: 'from-primary to-primary/80',
    bgColor: 'bg-card',
    borderColor: 'border-border',
  },
  {
    title: 'Questions Completed',
    value: completedQuestions.toLocaleString(),
    icon: Target,
    description: 'Successfully answered',
    gradient: 'from-primary to-primary/80',
    bgColor: 'bg-card',
    borderColor: 'border-border',
  },
  {
    title: 'Average Progress',
    value: `${avgProgressPercentage}%`,
    icon: TrendingUp,
    description: 'Overall completion rate',
    gradient: 'from-primary to-primary/80',
    bgColor: 'bg-card',
    borderColor: 'border-border',
    isProgress: true,
  },
];

export const faqs = [
  {
    question: 'What is PrepMate for?',
    answer: 'PrepMate helps you prepare for technical interviews by organizing computer science questions and explanations by subject and subtopic.',
  },
  {
    question: 'Do I need an account?',
    answer: 'You can browse the available subjects on the dashboard. Create an account to open question practice, track your progress, and access interview accounts.',
  },
  {
    question: 'What does progress tracking measure?',
    answer: 'When you mark a question as read, PrepMate updates your completed question count and progress for that subject. It records what you have covered, not a score of your mastery.',
  },
  {
    question: 'What are interview accounts?',
    answer: 'They are candidate-submitted notes about an interview, including company and role details, offer path, and the written account. New submissions are reviewed before they appear in the public collection.',
  },
  {
    question: 'Can I share an account anonymously?',
    answer: 'Yes. When submitting an account, you can choose to hide your PrepMate profile name. Avoid including identifying details in the written account if you want to remain anonymous.',
  },
  {
    question: 'Does PrepMate create a schedule or mock interview?',
    answer: 'Not currently. PrepMate provides subject-based questions, explanations, progress tracking, and shared interview accounts.',
  },
];
export const features = [
  {
    icon: BookOpen,
    title: 'Subject-based practice',
    desc: 'Work through computer science questions grouped by subject and subtopic.',
  },
  {
    icon: LayoutDashboard,
    title: 'Progress you can see',
    desc: 'See how many questions you have marked as read in each subject.',
  },
  {
    icon: ShieldCheck,
    title: 'Questions with explanations',
    desc: 'Open a question to read its explanation, then mark it read when you have covered it.',
  },
  {
    icon: BarChart3,
    title: 'Candidate interview accounts',
    desc: 'Read shared interview notes with company, role, and offer context.',
  },
];

export const coreValues = [
  {
    icon: CheckCircle2,
    title: 'Quality First',
    description:
      'Every question and resource is carefully curated and verified by industry professionals',
  },
  {
    icon: Users2,
    title: 'Community Driven',
    description:
      "Real experiences from real people who've successfully navigated their interview journey",
  },
  {
    icon: Target,
    title: 'Results Focused',
    description:
      'Practical preparation tools designed to help you succeed in interviews and exams',
  },
];

export const socialLinks = [
  {
    href: 'https://x.com/Arunava17818355',
    icon: Twitter,
    label: 'Twitter',
  },
  {
    href: 'https://github.com/arunava2018',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/arunava-banerjee1/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
];

