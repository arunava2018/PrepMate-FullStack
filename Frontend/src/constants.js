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

export const testimonials = [
  {
    name: 'Ankit Sharma',
    role: 'Software Engineer @ Google',
    feedback:
      'PrepMate’s curated question bank saved me hours of prep. The structured layout made revising effortless!',
  },
  {
    name: 'Riya Sen',
    role: 'CS Student',
    feedback:
      'I love the subject-wise progress tracking. It really helped me focus on weak areas before my interviews.',
  },
  {
    name: 'Vikram Das',
    role: 'Developer @ Microsoft',
    feedback:
      'The questions are clear, concise, and relevant. PrepMate is a must-have for anyone preparing for CS interviews.',
  },
  {
    name: 'Priya Mehta',
    role: 'Software Developer @ Amazon',
    feedback:
      'The interface is clean and distraction-free. I can revise quickly without getting lost in unnecessary details.',
  },
  {
    name: 'Siddharth Roy',
    role: 'CS Student',
    feedback:
      'PrepMate’s subject and subtopic mapping made my preparation so much more organized and efficient.',
  },
  {
    name: 'Ananya Gupta',
    role: 'Backend Engineer @ Infosys',
    feedback:
      'The curated question bank is excellent. It helped me cover topics I often overlook while preparing.',
  },
  {
    name: 'Rohan Verma',
    role: 'Software Engineer @ Adobe',
    feedback:
      'I especially love the progress tracking feature. It keeps me motivated to complete all sections on time.',
  },
];

export const faqs = [
  {
    question: 'What is PrepMate?',
    answer:
      'PrepMate is a computer science question bank for reviewing core topics and preparing for technical interviews.',
  },
  {
    question: 'Do I need to pay to use PrepMate?',
    answer:
      'No, the core features are free. In the future, premium features like cloud backup and advanced analytics may be introduced.',
  },
  {
    question: 'Is my progress tracked?',
    answer:
      'Yes. PrepMate tracks completed questions by subject so you can see what you have covered.',
  },
  {
    question: 'Is the content reliable?',
    answer:
      'Questions are reviewed by the PrepMate team. As with any study resource, check details against your course materials and references.',
  },
  {
    question: 'Can I access PrepMate on mobile?',
    answer:
      'Yes, the web app is fully responsive and works smoothly on mobile, tablet, and desktop.',
  },
  {
    question: 'Are there preloaded questions?',
    answer:
      'Yes, PrepMate comes with a set of common interview questions for each CS subject, ready for practice and revision.',
  },
];

export const features = [
  {
    icon: BookOpen,
    title: 'Organized Learning',
    desc: 'Browse computer science questions grouped by subject and subtopic.',
  },
  {
    icon: LayoutDashboard,
    title: 'Study dashboard',
    desc: 'See completed questions by subject and return to topics you want to review.',
  },
  {
    icon: ShieldCheck,
    title: 'Question review',
    desc: 'Review questions and explanations as you work through each topic.',
  },
  {
    icon: BarChart3,
    title: 'Interview accounts',
    desc: 'Read preparation notes and interview experiences shared by developers.',
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
