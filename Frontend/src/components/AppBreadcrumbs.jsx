import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function AppBreadcrumbs({ items = [], className = '' }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className={`mb-5 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#776f65] dark:text-[#8a847a]">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return <li key={`${item.label}-${index}`} className="inline-flex min-w-0 items-center gap-2">
            {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {current ? <span aria-current="page" className="truncate font-medium text-[#1f1b16] dark:text-[#efe9de]">{item.label}</span> : <Link to={item.to} className="truncate rounded-sm hover:text-[#1f1b16] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:hover:text-[#efe9de]">{item.label}</Link>}
          </li>;
        })}
      </ol>
    </nav>
  );
}
