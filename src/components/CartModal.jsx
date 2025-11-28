import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, removeFromCart, clearCart } from '../redux/cartSlice';

const CartModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems); // Get Items
  const totalAmount = useSelector(selectCartTotal); // Get Total

  const handleProceedToOrder = () => {
    const modalElement = document.getElementById('cartModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
    navigate('/order');
  };

  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Shopping Cart</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={item.image} alt={item.name} style={{width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px'}} />
                      <div>
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">₹{item.price} x {item.quantity}</small>
                      </div>
                    </div>
                    <div>
                        <span className="fw-bold me-3">₹{item.price * item.quantity}</span>
                        {/* Dispatch remove action */}
                        <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                            <img src="/images/delete.png" width="15px" alt="map-icon" />
                        </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="modal-footer">
            {cartItems.length > 0 && (
                // Dispatch clear action
                <button className="btn btn-outline-danger me-auto" onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>
            )}
            <span className="fs-5 me-3">Total: <strong className="text-primary">₹{totalAmount}</strong></span>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button onClick={handleProceedToOrder} className="btn btn-primary" disabled={cartItems.length === 0}>
                Proceed to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;