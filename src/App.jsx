import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import Home from './pages/Home';
import Order from './pages/Order';
import Medicines from './pages/Medicines'; // <--- IMPORT THIS

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <CartModal /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />   
        <Route path="/medicines" element={<Medicines />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;