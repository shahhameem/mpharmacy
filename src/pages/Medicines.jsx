import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // <--- 1. Import this
import { medicinesData } from '../data/medicinesData';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Medicines = () => {
  const dispatch = useDispatch();
  
  // 2. Setup Search Params
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 3. Set initial category from URL or default to "All"
  const initialCategory = searchParams.get('category') || "All";

  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize state with the value from URL
  const [category, setCategory] = useState(initialCategory);

  // --- EFFECT 1: Load Data ---
  useEffect(() => {
    setTimeout(() => {
      setMedicines(medicinesData);
      setIsLoading(false);
      // We don't setFilteredMedicines here anymore, the next Effect handles it
    }, 100);
  }, []);

  // --- EFFECT 2: Handle Filtering (Runs when data loads OR category changes) ---
  useEffect(() => {
    if (category === "All") {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter(med => med.category === category);
      setFilteredMedicines(filtered);
    }
  }, [medicines, category]); // Dependencies: runs if medicines load or user changes category

  // Handle Dropdown Change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    
    // Optional: Update the URL without reloading page, so the link is shareable
    setSearchParams({ category: selectedCategory });
  };

  const handleAddToCart = (medicine) => {
    dispatch(addToCart(medicine));
    alert(`${medicine.name} added to cart!`);
  };

  return (
    <main className="container my-5">
      <h1 className="mb-4">Medicines Available</h1>
      <p className="lead">Browse our selection of medicines.</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="category-filter" className="form-label">Filter by Category:</label>
          <select 
            id="category-filter" 
            className="form-select" 
            value={category} 
            onChange={handleCategoryChange}
          >
            {/* These values match the 'link' params in Categories.jsx */}
            <option value="All">All Categories</option>
            <option value="Prescription">Prescription Drugs</option>
            <option value="OTC & Wellness">OTC & Wellness</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Sports Nutrition">Sports Nutrition</option>
            <option value="Surgical">Surgical Supplies</option>
          </select>
        </div>
      </div>

      <div id="medicines-list" className="row g-4">
        {isLoading ? (
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading Medicines...</p>
          </div>
        ) : (
          <>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((med) => (
                <div className="col-md-6 col-lg-3" key={med.id}>
                  <div className="card h-100 shadow-sm">
                    <img 
                      src={med.image} 
                      className="card-img-top p-3" 
                      alt={med.name} 
                      style={{height: '200px', objectFit: 'contain'}} 
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{med.name}</h5>
                      <span className="badge bg-secondary mb-2 w-auto align-self-start">{med.category}</span>
                      <p className="card-text fw-bold text-primary">₹{med.price}</p>
                      <button 
                        className="btn btn-outline-primary mt-auto"
                        onClick={() => handleAddToCart(med)}
                      >
                        <i className="fa-solid fa-cart-plus me-2"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className="col-12 text-center py-5">
                 <i className="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
                 <p className="fs-5">No medicines found in the category: <strong>{category}</strong></p>
                 <button className="btn btn-sm btn-outline-secondary" onClick={() => {setCategory("All"); setSearchParams({category: "All"})}}>Show All</button>
               </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Medicines;