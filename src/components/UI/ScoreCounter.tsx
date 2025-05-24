import styles from './UI.module.css';

interface ScoreCounterProps {
  score: number;
  level: 'easy' | 'medium' | 'hard';
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score, level }) => {
  const levelNames = {
    easy: 'Лёгкий',
    medium: 'Средний',
    hard: 'Сложный'
  };

  return (
    <div className={styles.scoreContainer}>
      <div>Счёт: <span>{score}</span></div>
      <div>Уровень: <span>{levelNames[level]}</span></div>
    </div>
  );
};

export default ScoreCounter;