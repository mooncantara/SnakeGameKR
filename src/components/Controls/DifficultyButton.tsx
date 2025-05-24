import { motion } from 'framer-motion';
import styles from './Controls.module.css';

interface DifficultyButtonProps {
  level: 'easy' | 'medium' | 'hard';
  selected: boolean;
  onClick: () => void;
}

const DifficultyButton: React.FC<DifficultyButtonProps> = ({ 
  level, 
  selected, 
  onClick 
}) => {
  const text = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${styles.difficultyButton} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {text[level]}
    </motion.button>
  );
};

export default DifficultyButton;