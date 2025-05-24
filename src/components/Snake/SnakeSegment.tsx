import React from 'react';

interface SnakeSegmentProps {
  position: { x: number, y: number };
  isHead: boolean;
}

const SnakeSegment: React.FC<SnakeSegmentProps> = ({ position, isHead }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x * 20}px`,
        top: `${position.y * 20}px`,
        width: '18px',
        height: '18px',
        backgroundColor: isHead ? '#4CAF50' : '#8BC34A',
        borderRadius: isHead ? '5px' : '3px',
        zIndex: 5,
        border: isHead ? '2px solid #2E7D32' : '1px solid #689F38',
        transition: 'all 0.2s ease'
      }}
    />
  );
};

export default SnakeSegment;