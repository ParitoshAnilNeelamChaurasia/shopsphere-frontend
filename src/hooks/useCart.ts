import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';

export const useCart = () => {
  const items = useAppSelector((state) => state.cart.items);

  return useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= 4999 ? 0 : 99;
    const discount = subtotal >= 25000 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal + shipping - discount;

    return { items, itemCount, subtotal, shipping, discount, total };
  }, [items]);
};
