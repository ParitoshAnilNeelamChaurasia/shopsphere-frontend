import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="page-shell container centered-page"><div className="empty-state"><div className="not-found-number">404</div><h1>That page went somewhere else.</h1><p>Let's get you back to the ShopSphere storefront.</p><Link className="button button-dark" to="/">Back home</Link></div></div>;
}
