import { useState, useEffect, useCallback } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';
import PoisonFood from '../Food/PoisonFood';
import ScoreCounter from '../UI/ScoreCounter';
import GameControls from '../Controls/GameControls';
import GameOverModal from '../UI/GameOverModal';
import styles from './Game.module.css';

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
const WALL_COUNT = 5;
const POISON_FOOD_DURATION = 6000;

interface Position {
  x: number;
  y: number;
}

const Game = ({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [poisonFood, setPoisonFood] = useState<Position | null>(null);
  const [walls, setWalls] = useState<Position[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'UP'|'DOWN'|'LEFT'|'RIGHT'>('RIGHT');
  const [speed] = useState(difficulty === 'easy' ? 200 : difficulty === 'medium' ? 150 : 100);

  // --------------------- Колбэки выше useEffect'ов! ---------------------

  const generateFood = useCallback(() => {
    const occupiedPositions = [...snake, ...walls];
    if (poisonFood) occupiedPositions.push(poisonFood);

    let newFood: Position;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      attempts++;
    } while (
      occupiedPositions.some(pos => pos.x === newFood.x && pos.y === newFood.y) &&
      attempts < maxAttempts
    );

    if (attempts < maxAttempts) {
      setFood(newFood);
    }
  }, [snake, walls, poisonFood]);

  const generatePoisonFood = useCallback(() => {
    if (difficulty !== 'hard' || poisonFood) return;

    const occupiedPositions = [...snake, ...walls, food];
    let newPoison: Position;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      newPoison = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      attempts++;
    } while (
      occupiedPositions.some(pos => pos.x === newPoison.x && pos.y === newPoison.y) &&
      attempts < maxAttempts
    );

    if (attempts < maxAttempts) {
      setPoisonFood(newPoison);
      const timer = setTimeout(() => setPoisonFood(null), POISON_FOOD_DURATION);
      return () => clearTimeout(timer);
    }
  }, [difficulty, poisonFood, snake, walls, food]);

  // --------------------- Эффекты ---------------------

  // Генерация стен (только один раз при монтировании)
  useEffect(() => {
    if (difficulty === 'easy') return;

    const generateWalls = () => {
      const newWalls: Position[] = [];
      const occupiedPositions = [...snake, food];

      while (newWalls.length < WALL_COUNT) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        const newWall = { x, y };

        if (!occupiedPositions.some(pos => pos.x === x && pos.y === y) &&
            !newWalls.some(wall => wall.x === x && wall.y === y)) {
          newWalls.push(newWall);
        }
      }

      setWalls(newWalls);
    };

    generateWalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // Генерация обычной еды — только один раз при старте
  useEffect(() => {
    generateFood();
    // eslint-disable-next-line
  }, []);

  // Генерация ядовитой еды — только если hard
  useEffect(() => {
    if (difficulty === 'hard') {
      const interval = setInterval(generatePoisonFood, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [difficulty, generatePoisonFood]);

  // --------------------- Движение змеи ---------------------

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      // Движение с телепортацией через границы
      switch (direction) {
        case 'UP': head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE; break;
        case 'DOWN': head.y = (head.y + 1) % GRID_SIZE; break;
        case 'LEFT': head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE; break;
        case 'RIGHT': head.x = (head.x + 1) % GRID_SIZE; break;
      }

      // Проверка столкновений
      const collision = 
        prevSnake.some((segment, index) => 
          index > 0 && segment.x === head.x && segment.y === head.y) ||
        walls.some(wall => wall.x === head.x && wall.y === head.y);

      if (collision) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Проверка съедения еды
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 1);
        generateFood();
        return newSnake;
      }

      // Проверка ядовитой еды
      if (poisonFood && head.x === poisonFood.x && head.y === poisonFood.y) {
        setIsGameOver(true);
        return prevSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, poisonFood, walls, isPaused, isGameOver, generateFood]);

  // Клавиши управления
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Игровой цикл
  useEffect(() => {
    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, speed]);

  // Функции для управления игрой
  const handlePause = () => setIsPaused(p => !p);
  const handleRestart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setPoisonFood(null);
    setWalls([]);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setDirection('RIGHT');
    // Сгенерировать стены заново, если не easy
    if (difficulty !== 'easy') {
      const newWalls: Position[] = [];
      const occupiedPositions = [{ x: 10, y: 10 }, { x: 5, y: 5 }];
      while (newWalls.length < WALL_COUNT) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        const newWall = { x, y };
        if (!occupiedPositions.some(pos => pos.x === x && pos.y === y) &&
            !newWalls.some(wall => wall.x === x && wall.y === y)) {
          newWalls.push(newWall);
        }
      }
      setWalls(newWalls);
    }
  };
  const handleExit = () => window.location.href = '/';

  // --------------------- Рендер ---------------------

  return (
    <div className={styles.gameContainer}>
      <ScoreCounter score={score} level={difficulty} />
      <GameBoard size={GRID_SIZE * CELL_SIZE} walls={walls} difficulty={difficulty}>
        <Snake segments={snake} />
        <Food position={food} />
        {poisonFood && <PoisonFood position={poisonFood} />}
      </GameBoard>
      <GameControls
        onPause={handlePause}
        onRestart={handleRestart}
        onExit={handleExit}
        isPaused={isPaused}
      />
      {isGameOver && (
        <GameOverModal 
          score={score}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Game;