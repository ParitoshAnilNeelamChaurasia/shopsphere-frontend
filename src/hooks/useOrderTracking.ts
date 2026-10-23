import { useEffect, useState } from 'react';
import { subscribeToOrder } from '../services/websocket';
import type { OrderStatus } from '../types/models';

const sequence: OrderStatus[] = [
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

export function useOrderTracking(orderId: string, initialStatus: OrderStatus) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const cleanup = subscribeToOrder(orderId, {
      onMessage: (message) => {
        try {
          const payload = JSON.parse(message.body) as { status?: OrderStatus };
          if (payload.status) setStatus(payload.status);
        } catch {
          // Ignore malformed real-time messages.
        }
      },
    });

    if (import.meta.env.VITE_USE_MOCK_API !== 'false') {
      let timer: number | undefined;
      const currentIndex = sequence.indexOf(initialStatus);
      if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
        timer = window.setInterval(() => {
          setStatus((current) => {
            const index = sequence.indexOf(current);
            if (index === -1 || index === sequence.length - 1) {
              if (timer) window.clearInterval(timer);
              return current;
            }
            const next = sequence[index + 1];
            if (next === 'DELIVERED' && timer) window.clearInterval(timer);
            return next;
          });
        }, 4000);
      }

      return () => {
        if (timer) window.clearInterval(timer);
        cleanup();
      };
    }

    return cleanup;
  }, [orderId, initialStatus]);

  return status;
}
