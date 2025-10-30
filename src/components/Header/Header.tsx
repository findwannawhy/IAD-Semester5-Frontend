// components/Header/Header.tsx
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img 
              src={logo} 
              alt="Logo" 
              className="logo-image"
            />
          </Link>
        </div>
        <div className="filler"></div>
      </div>
    </header>
  );
}