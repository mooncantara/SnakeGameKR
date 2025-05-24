import styles from './Snake.module.css';
import { CELL_SIZE } from '../Game/Game';

interface Position {
  x: number;
  y: number;
}

interface SnakeProps {
  segments: Position[];
}

export default function Snake({ segments }: SnakeProps) {
  return (
    <>
      {segments.map((segment: Position, idx: number) => (
        <div
          key={idx}
          className={idx === 0 ? styles.snakeHead : styles.segment}
          style={{
            left: `${segment.x * CELL_SIZE}px`,
            top: `${segment.y * CELL_SIZE}px`,
          }}
        >
          {idx === 0 && (
            <div className={styles.eyes}>
              <div className={styles.pupil}></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}