import { Client, type IMessage, type StompSubscription } from '@stomp/stompjs';

export interface OrderSocketHandlers {
  onMessage: (message: IMessage) => void;
  onError?: (error: unknown) => void;
}

export const subscribeToOrder = (
  orderId: string,
  handlers: OrderSocketHandlers,
): (() => void) => {
  const url = import.meta.env.VITE_WS_URL;
  if (!url || import.meta.env.VITE_USE_MOCK_API !== 'false') {
    return () => undefined;
  }

  const client = new Client({ brokerURL: url, reconnectDelay: 5000 });
  let subscription: StompSubscription | undefined;

  client.onConnect = () => {
    subscription = client.subscribe(`/topic/orders/${orderId}`, handlers.onMessage);
  };

  client.onStompError = (frame) => {
    handlers.onError?.(frame);
  };

  client.activate();

  return () => {
    subscription?.unsubscribe();
    void client.deactivate();
  };
};
