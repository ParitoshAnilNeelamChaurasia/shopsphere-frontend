export default function RatingStars({ rating }: { rating: number }) {
  return <span className="stars" aria-label={`${rating} out of 5 stars`}>{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span>;
}
