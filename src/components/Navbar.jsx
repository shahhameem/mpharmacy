import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // <--- Redux Hook
import { selectCartItems } from '../redux/cartSlice';

const Navbar = () => {
  const cartItems = useSelector(selectCartItems); // <--- Read data
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/images/logo.png" width="75px" alt="Madina Logo" /> Madina Chemists
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medicines">Medicines</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">Order Now</Link>
            </li>
            <li className="nav-item">
              {/* This triggers the Cart Modal */}
              <button 
                id="cart-button" 
                className="btn btn-outline-light" 
                type="button" 
                data-bs-toggle="modal" 
                data-bs-target="#cartModal"
              >
                Cart <sup> {cartItems.length ? cartItems.length : ""} </sup>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;