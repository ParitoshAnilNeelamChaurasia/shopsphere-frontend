import type { ProductCategory } from '../types/models';

export interface Category {
  name: ProductCategory;
  subtitle: string;
  icon: string;
  image: string;
}

export const categories: Category[] = [
  {
    name: 'Electronics',
    subtitle: 'Smart tech & gadgets',
    icon: '⚡',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Fashion',
    subtitle: 'Fresh everyday looks',
    icon: '✦',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Home',
    subtitle: 'Make your space better',
    icon: '⌂',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Gaming',
    subtitle: 'Play without limits',
    icon: '◉',
    image:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Beauty',
    subtitle: 'Care & self-expression',
    icon: '♡',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Books',
    subtitle: 'Ideas for every mood',
    icon: '▤',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
  },
];
