import type { OrderStatus } from '../../types/models';

const statuses: { value: OrderStatus; label: string; icon: string }[] = [
  { value: 'CONFIRMED', label: 'Confirmed', icon: '✓' },
  { value: 'PROCESSING', label: 'Processing', icon: '◌' },
  { value: 'SHIPPED', label: 'Shipped', icon: '▣' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for delivery', icon: '➜' },
  { value: 'DELIVERED', label: 'Delivered', icon: '★' },
];

interface OrderTimelineProps {
  status: OrderStatus;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = statuses.findIndex((entry) => entry.value === status);

  return (
    <div className="order-timeline">
      {statuses.map((entry, index) => {
        const active = status === entry.value;
        const complete = currentIndex >= index;
        return (
          <div className={`timeline-step ${complete ? 'complete' : ''} ${active ? 'current' : ''}`} key={entry.value}>
            <div className="timeline-dot">{complete ? entry.icon : ''}</div>
            <div className="timeline-label"><strong>{entry.label}</strong>{active && <span>Current status</span>}</div>
            {index < statuses.length - 1 && <div className="timeline-line" />}
          </div>
        );
      })}
    </div>
  );
}
