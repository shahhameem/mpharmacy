import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';

const Order = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '' // Added address for better delivery info
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 1. WhatsApp Logic ---
  const handleWhatsApp = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }

    // Generate the Item List String dynamically
    let itemDetails = "";
    cartItems.forEach(item => {
      itemDetails += `- ${item.name} (x${item.quantity}): ₹${item.price * item.quantity}\n`;
    });

    // Construct the final message
    let message = `*New Order from Website*\n\n`;
    message += `*Customer:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*Address:* ${formData.address || "Not Provided"}\n\n`;
    message += `*Order Summary:*\n${itemDetails}`;
    message += `\n*Total Amount:* ₹${totalAmount}\n\n`;
    message += `Please confirm my order.`;

    const whatsappURL = `https://wa.me/919682586995?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  // --- 2. Email Logic ---
  const handleEmail = () => {
    if (!formData.name) {
      alert("Please fill in your Name.");
      return;
    }

    let itemDetails = "";
    cartItems.forEach(item => {
      itemDetails += `- ${item.name} (x${item.quantity}): ₹${item.price * item.quantity}\n`;
    });

    const subject = `New Medicine Order from ${formData.name}`;
    let body = `Customer Name: ${formData.name}\n`;
    body += `Phone: ${formData.phone}\n`;
    body += `Address: ${formData.address}\n\n`;
    body += `Order Details:\n${itemDetails}\n`;
    body += `Total: ₹${totalAmount}`;

    window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // --- RENDER: EMPTY CART STATE ---
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="mb-4 text-muted">
          <i className="fa-solid fa-cart-shopping fa-6x"></i>
        </div>
        <h2 className="mb-3">Your Cart is Empty</h2>
        <p className="lead text-muted mb-4">Looks like you haven't added any medicines or products yet.</p>
        <Link to="/medicines" className="btn btn-primary btn-lg">
          <i className="fa-solid fa-arrow-left me-2"></i> Browse Medicines
        </Link>
      </div>
    );
  }

  // --- RENDER: FILLED CART STATE ---
  return (
    <div className="container py-5">
      <h1 className="mb-4"><i className="fa-solid fa-file-invoice me-2"></i>Checkout</h1>
      
      <div className="row g-5">
        
        {/* LEFT COLUMN: Order Review */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="mb-0 text-primary">Order Summary</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">Product</th>
                      <th scope="col" className="text-center">Qty</th>
                      <th scope="col" className="text-end pe-4">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="rounded me-3 border"
                              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                            <div>
                              <p className="mb-0 fw-bold">{item.name}</p>
                              <small className="text-muted">₹{item.price} / unit</small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-secondary rounded-pill">{item.quantity}</span>
                        </td>
                        <td className="text-end pe-4 fw-bold">
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td colSpan="2" className="text-end fw-bold fs-5 pt-3">Total Amount:</td>
                      <td className="text-end pe-4 fw-bold fs-5 text-primary pt-3">₹{totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-3 text-end">
             <Link to="/medicines" className="text-decoration-none">
                <i className="fa-solid fa-arrow-left"></i> Add more items
             </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Customer Details Form */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 bg-light">
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Delivery Details</h4>
              <form onSubmit={handleWhatsApp}>
                
                <div className="mb-3">
                    <label className="form-label fw-bold">Full Name <span className="text-danger">*</span></label>
                    <div className="input-group">
                        <span className="input-group-text bg-white"><i className="fa-solid fa-user text-muted"></i></span>
                        <input type="text" name="name" className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Phone (WhatsApp) <span className="text-danger">*</span></label>
                    <div className="input-group">
                        <span className="input-group-text bg-white"><i className="fa-brands fa-whatsapp text-success"></i></span>
                        <input type="tel" name="phone" className="form-control" placeholder="e.g. 919682586995" value={formData.phone} onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Delivery Address</label>
                    <textarea name="address" className="form-control" rows="2" placeholder="Street, Colony, Landmark..." value={formData.address} onChange={handleChange}></textarea>
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold">Email (Optional)</label>
                    <input type="email" name="email" className="form-control" placeholder="For order receipt" value={formData.email} onChange={handleChange} />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success btn-lg shadow-sm">
                        <i className="fa-brands fa-whatsapp me-2"></i> Confirm & Order
                    </button>
                    <button type="button" onClick={handleEmail} className="btn btn-outline-secondary">
                        <i className="fa-solid fa-envelope me-2"></i> Order via Email
                    </button>
                </div>
                
                <p className="text-center mt-3 text-muted small">
                    <i className="fa-solid fa-lock me-1"></i> Your details are secure. Payment is collected upon delivery.
                </p>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Order;