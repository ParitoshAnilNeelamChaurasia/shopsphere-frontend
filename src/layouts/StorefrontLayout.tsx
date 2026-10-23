import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function StorefrontLayout() {
  return (
    <div className="app-frame">
      <Header />
      <main className="main-content"><Outlet /></main>
      <Footer />
    </div>
  );
}
