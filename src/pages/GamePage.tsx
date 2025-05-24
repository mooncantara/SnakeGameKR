import { useSearchParams } from 'react-router-dom';
import Game from '../components/Game/Game';
import styles from './GamePage.module.css';

const GamePage = () => {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard';

  if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
    return (
      <div className={styles.error}>
        Пожалуйста, выберите уровень сложности на <a href="/my-app/public">главной странице</a>
      </div>
    );
  }

  return (
    <div className={styles.gamePage}>
      <Game difficulty={difficulty} />
    </div>
  );
};

export default GamePage;