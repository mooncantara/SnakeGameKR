import styles from './Controls.module.css';

interface GameControlsProps {
  onPause: () => void;
  onRestart: () => void;
  onExit: () => void;
  isPaused: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onPause, 
  onRestart, 
  onExit, 
  isPaused 
}) => {
  return (
    <div className={styles.controls}>
      <button onClick={onPause} className={styles.controlButton}>
        {isPaused ? 'Продолжить' : 'Пауза'}
      </button>
      <button onClick={onRestart} className={styles.controlButton}>
        Заново
      </button>
      <button onClick={onExit} className={styles.controlButton}>
        Выход
      </button>
    </div>
  );
};

export default GameControls;