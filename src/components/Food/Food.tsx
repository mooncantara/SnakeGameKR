import styles from './Food.module.css';
import { CELL_SIZE } from '../Game/Game';

interface Position {
  x: number;
  y: number;
}

interface FoodProps {
  position: Position;
}

export default function Food({ position }: FoodProps) {
  return (
    <div
      className={styles.food}
      style={{
        left: `${position.x * CELL_SIZE}px`,
        top: `${position.y * CELL_SIZE}px`,
      }}
    />
  );
}