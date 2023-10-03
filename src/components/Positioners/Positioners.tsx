import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './positioners.scss';

interface Position {
  x: number;
  y: number;
}

interface newPos {
  [key: string]: { x: number } | { y: number };
}

interface PositionersProps {
  onChange: React.Dispatch<React.SetStateAction<Position>>;
}

const Positioners: React.FC<PositionersProps> = ({ onChange }) => {
  const handlePositionChanging = (value: string) => {
    const step = 50;

    onChange((prev: Position) => {
      const newPosition: newPos = {
        left: { x: prev.x - step },
        right: { x: prev.x + step },
        up: { y: prev.y - step },
        down: { y: prev.y + step },
      };

      return { ...prev, ...newPosition[value] };
    });
  };

  return (
    <>
      <button
        type="button"
        className="positioner positioner--up"
        onClick={() => handlePositionChanging('up')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        type="button"
        className="positioner positioner--left"
        onClick={() => handlePositionChanging('left')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        type="button"
        className="positioner positioner--right"
        onClick={() => handlePositionChanging('right')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        type="button"
        className="positioner positioner--down"
        onClick={() => handlePositionChanging('down')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </>
  );
};

export default Positioners;
