import React from 'react';
import styles from './GameBoard.module.css';

interface GameBoardProps {
  size: number;
  walls: {x: number, y: number}[];
  difficulty: 'easy' | 'medium' | 'hard';
  children: React.ReactNode;
}

export const CELL_SIZE = 20;

const GameBoard: React.FC<GameBoardProps> = ({ size, walls, difficulty, children }) => {
  return (
    <div 
      className={styles.gameBoard}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      {difficulty !== 'easy' && walls.map((wall, i) => (
        <div 
          key={`wall-${wall.x}-${wall.y}`}
          style={{
            position: 'absolute',
            left: `${wall.x * CELL_SIZE}px`,
            top: `${wall.y * CELL_SIZE}px`,
            width: `${CELL_SIZE}px`,
            height: `${CELL_SIZE}px`,
            backgroundColor: '#555',
            borderRadius: '3px',
            zIndex: 3
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default GameBoard;