import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>Главная</Link>
      <Link to="/game" className={styles.navLink}>Играть</Link>
      <Link to="/history" className={styles.navLink}>История</Link>
    </nav>
  );
};

export default Navbar;