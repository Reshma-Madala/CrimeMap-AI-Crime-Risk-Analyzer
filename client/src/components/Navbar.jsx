import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';
import logo from '../assets/styles/CrimeWatch-logo.png'; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => setShowMenu(false), [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home', icon: 'uil-estate' },
    { path: '/predict', label: 'Predict Crime', icon: 'uil-robot' },
    { path: '/results', label: 'Results', icon: 'uil-history' },
    { path: '/metadata', label: 'Metadata', icon: 'uil-setting' },
  ];

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={logo} alt="CrimeWatch Logo" style={{ height: '1.8rem' }} />
          <span>CrimeWatch</span>
        </Link>

        <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list grid">
            {navItems.map(({ path, label, icon }) => (
              <li className="nav__item" key={path}>
                <Link
                  to={path}
                  className={`nav__link ${location.pathname === path ? 'active-link' : ''}`}
                >
                  <i className={`uil ${icon} nav__icon`}></i> {label}
                </Link>
              </li>
            ))}
          </ul>

          <i className="uil uil-times nav__close" onClick={() => setShowMenu(false)}></i>
        </div>

        <div className="nav__btns">
          <ThemeToggle />
          <i className="uil uil-apps nav__toggle" onClick={() => setShowMenu(!showMenu)}></i>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
