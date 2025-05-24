import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DifficultyButton from '../components/Controls/DifficultyButton';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  const startGame = () => {
    if (selectedDifficulty) {
      navigate(`/game?difficulty=${selectedDifficulty}`);
    }
  };

  return (
    <div className={styles.homePage}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.title}
      >
        Добро пожаловать в Змейку!
      </motion.h1>

      <div className={styles.difficultySelector}>
        <h3>Выберите уровень сложности:</h3>
        <div className={styles.buttons}>
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <DifficultyButton
              key={level}
              level={level}
              selected={selectedDifficulty === level}
              onClick={() => setSelectedDifficulty(level)}
            />
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        disabled={!selectedDifficulty}
        className={styles.startButton}
      >
        Начать игру
      </motion.button>

      <div className={styles.gameDescription}>
        <h3>Описание уровней:</h3>
        <ul>
          <li><strong>Легко:</strong> Классическая змейка</li>
          <li><strong>Средне:</strong> Добавлены кубики</li>
          <li><strong>Сложно:</strong> Кубики и ядовитые яблоки, скорость увеличивается</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;