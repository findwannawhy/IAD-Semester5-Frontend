// components/Header/Header.tsx
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={ROUTES.HOME} className="logo-link">
            <img
              src={logo}
              alt="Logo"
              className="logo-image"
            />
          </Link>
        </div>

        <div className="nav-area">
          <Navbar expand="md" bg="transparent" className="justify-content-center">
            <Navbar.Toggle aria-controls="main-nav" />
            <Navbar.Collapse id="main-nav" className="justify-content-center">
              <Nav>
                <Nav.Link as={Link} to={ROUTES.HOME}>{ROUTE_LABELS.HOME}</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.SAMPLES}>{ROUTE_LABELS.SAMPLES}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </header>
  );
}