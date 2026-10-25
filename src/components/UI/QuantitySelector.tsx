interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function QuantitySelector({ value, onChange, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="quantity-selector">
      <button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
      <span>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase quantity">+</button>
    </div>
  );
}
