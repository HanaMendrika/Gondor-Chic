import styles from './Navbar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/home',    label: 'Accueil'  },
  { to: '/shop',    label: 'Boutique' },
  { to: '/contact', label: 'Contact'  },
];

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => navigate('/login');

  return (
    <header className={styles["gc-navbar"]}>
      <div className={styles["gc-navbar-content"]}>

        {/* ── Logo ── */}
        <Link to="/home" className={styles["gc-logo"]} aria-label="Gondor Chic — Accueil">
          <div className={styles["gc-logo-img-wrapper"]}>
            <img
              className={styles["gc-logo-img"]}
              src="./favicon.ico"
              alt="Gondor Chic Logo"
            />
          </div>
          <div className={styles["gc-title-wrapper"]}>
            <div className={styles["gc-wordmark"]}>
              <span className={styles["gc-title-gondor"]}>Gondor</span>
              <span className={styles["gc-title-or"]}>or</span>
              <span className={styles["gc-title-chic"]}>Chic</span>
            </div>
          </div>
        </Link>

        {/* ── Navigation ── */}
        <nav aria-label="Navigation principale">
          <ul className={styles["gc-nav-links"]}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`${styles["gc-nav-link"]}${pathname === to ? ` ${styles["active"]}` : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        {/* ── Actions ── */}
        <div className={styles["gc-nav-actions"]}>
          <button
            className={styles["gc-cart-button"]}
            onClick={onCartClick}
            aria-label={`Panier — ${cartCount} article${cartCount !== 1 ? 's' : ''}`}
          >
            <span className={styles["gc-cart-icon"]} aria-hidden="true">🛒</span>
            Panier
            {cartCount > 0 && (
              <span className={styles["gc-cart-count"]} aria-hidden="true">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className={styles["gc-logout-button"]}
            onClick={handleLogout}
            aria-label="Se déconnecter"
          >
            <span className={styles["gc-logout-icon"]} aria-hidden="true">⚔️</span>
            Déconnexion
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;