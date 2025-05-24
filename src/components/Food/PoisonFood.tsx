import { motion } from 'framer-motion';
import styles from './Food.module.css';

interface PoisonFoodProps {
  position: { x: number; y: number };
}

const PoisonFood = ({ position }: PoisonFoodProps) => {
  return (
    <motion.div
      className={styles.poisonFood}
      initial={{ scale: 0 }}
      animate={{ 
        scale: [1, 0.8, 1] // Убрано дублирование scale
      }}
      transition={{ 
        scale: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut"
        }
      }}
      style={{
        position: 'absolute',
        left: `${position.x * 20}px`,
        top: `${position.y * 20}px`,
        width: '20px',
        height: '20px'
      }}
    />
  );
};

export default PoisonFood;