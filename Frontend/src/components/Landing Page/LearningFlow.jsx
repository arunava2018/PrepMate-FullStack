import { BookOpen, Layers3, CheckCircle2 } from 'lucide-react';

const steps = [
  { number: '01', Icon: Layers3, title: 'Choose a subject', description: 'Start with a computer science subject, then open a subtopic to focus your session.' },
  { number: '02', Icon: BookOpen, title: 'Work through questions', description: 'Open each question to read its explanation. Move at your own pace and revisit the ones you need.' },
  { number: '03', Icon: CheckCircle2, title: 'Mark what you’ve covered', description: 'Mark questions as read and see your completed count and progress by subject on your dashboard.' },
];

export default function LearningFlow() {
  return <section id="how-it-works" className="landing-section landing-flow">
    <div className="landing-section-inner">
      <header className="landing-section-heading">
        <p className="landing-eyebrow">A simple study loop</p>
        <h2>Know what to study and what you’ve finished</h2>
        <p>PrepMate turns a broad set of CS interview topics into a practice flow you can pick up again.</p>
      </header>
      <ol className="landing-steps">
        {steps.map(({ number, Icon, title, description }) => <li className="landing-step" key={number}>
          <span className="landing-step-number">{number}</span>
          <Icon className="landing-step-icon" size={20} strokeWidth={1.6} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}
