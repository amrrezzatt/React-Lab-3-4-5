import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">amr-ecommerce</Link>
        <Link to="/register" className="btn btn--outline me-2">Register</Link>
        <Link to="/contact" className="btn btn--outline me-2">Contact</Link>


        <div className="d-flex align-items-center">
          <select
            className="form-select form-select-sm me-3"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: '100px' }}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>

          <Link to="/cart" className="btn btn--outline position-relative">
            Cart
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
