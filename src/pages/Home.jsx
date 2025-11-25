import HeroCarousel from '../components/HeroCarousel';
import AppointmentSection from '../components/AppointmentSection';
import Categories from '../components/Categories';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <HeroCarousel />

      <section className="container text-center my-5">
        <h1 className="display-5">Welcome to Madina Chemists</h1>
        <p className="lead">Your trusted partner in health and wellness.</p>
        <Link to="/order" className="btn btn-primary btn-lg mt-3">Order Medicines</Link>
      </section>

      <AppointmentSection />
      <Categories />
    </main>
  );
};

export default Home;