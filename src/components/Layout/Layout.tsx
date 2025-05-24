import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.main}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;