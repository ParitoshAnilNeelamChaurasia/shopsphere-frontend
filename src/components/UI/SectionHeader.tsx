import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export default function SectionHeader({ eyebrow, title, action }: SectionHeaderProps) {
  return (
    <div className="section-heading-row">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}
