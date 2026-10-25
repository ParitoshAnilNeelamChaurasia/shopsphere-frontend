export const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
