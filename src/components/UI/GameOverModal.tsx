import { motion } from 'framer-motion';
import styles from './UI.module.css';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <motion.div
      className={styles.gameOverModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Игра окончена!</h2>
      <p>Ваш счет: {score}</p>
      <button 
        onClick={onRestart}
        className={styles.restartButton}
      >
        Играть снова
      </button>
    </motion.div>
  );
};

export default GameOverModal;