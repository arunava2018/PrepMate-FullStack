import {
  Server,
  Database,
  Network,
  Workflow,
  Cpu,
  Code2,
  Terminal,
  Lock,
  Cloud,
  GitBranch,
  Book,
  Shapes,
} from 'lucide-react';

// Centralized icon map
export const iconMap = {
  server: Server,
  database: Database,
  network: Network,
  workflow: Workflow,
  cpu: Cpu,
  code2: Code2,
  terminal: Terminal,
  lock: Lock,
  cloud: Cloud,
  gitbranch: GitBranch,
  shapes: Shapes,
  book: Book,
};

// Helper function: pick icon or default
export function getIcon(name) {
  return iconMap[name?.toLowerCase()] || Book;
}
