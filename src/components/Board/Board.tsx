import React from 'react';
import CategoryTree from '../CategoryTree';

interface Position {
  x: number;
  y: number;
}

interface BoardProps {
  position: Position;
  offset: Position;
  scale: number;
  isDragebled: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Board: React.FC<BoardProps> = ({
  position,
  scale,
  isDragebled,
  onDragStart,
  onDrag,
  onDragEnd,
  onDragOver,
}) => {
  return (
    <div
      id="board"
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `scale(${scale / 100})`,
        transformOrigin: 'top left',
        cursor: 'move',
        whiteSpace: 'nowrap',
        transition: !isDragebled ? 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)': '' ,
      }}
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <CategoryTree />
    </div>
  );
};

export default Board;
