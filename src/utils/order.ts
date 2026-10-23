import type { CartItem, Order } from '../types/models';

export const calculateOrderTotal = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 4999 ? 0 : 99;
  const discount = subtotal >= 25000 ? Math.round(subtotal * 0.05) : 0;
  return { subtotal, shipping, discount, total: subtotal + shipping - discount };
};

export const getStatusLabel = (status: Order['status']) => status.replaceAll('_', ' ').toLowerCase().replace(/(^| )\w/g, (match) => match.toUpperCase());
