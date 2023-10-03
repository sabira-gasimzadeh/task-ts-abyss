import React, { useState } from 'react';
import Controls from './components/Controls';
import Board from './components/Board';
import Positioners from './components/Positioners'

interface Position {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    x: window.innerWidth / 2,
    y: 100,
  });

  const [scale, setScale] = useState<number>(100);

  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const [isDragebled, setIsDragebled] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragebled(true);
    e.dataTransfer.effectAllowed = 'move';

    const initialMousePos = { x: e.clientX, y: e.clientY };
    const initialElementPos = { x: position.x, y: position.y };

    setOffset({
      x: initialMousePos.x - initialElementPos.x,
      y: initialMousePos.y - initialElementPos.y,
    });
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragebled(false);
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCentredBoard = () => {
    const boardElement = document.getElementById('board');
    if (!boardElement) {
      return;
    }
    const boardWidth = (boardElement.offsetWidth / 100) * scale;
    const boardHeight = (boardElement.offsetHeight / 100) * scale;
    const centerX = (window.innerWidth - boardWidth) / 2;
    const centerY = (window.innerHeight - boardHeight) / 2;

    setPosition({
      x: centerX,
      y: centerY,
    });
  };

  return (
    <div style={{ position: 'relative'}}>
      <Controls
        scale={scale}
        onScaleChange={(value: number) => setScale(value)}
        onCenterBoard={handleCentredBoard}
      />
      <Positioners onChange={setPosition} />
      <Board
        position={position}
        offset={offset}
        scale={scale}
        isDragebled={isDragebled}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      />
    </div>
  );
};

export default App;
