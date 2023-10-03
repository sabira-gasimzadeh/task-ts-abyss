import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faArrowsToCircle,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import './controls.scss';

interface ControlsProps {
  scale: number;
  onScaleChange: (scale: number) => void;
  onCenterBoard: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  scale,
  onScaleChange,
  onCenterBoard,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNumberClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (value: number) => {
    onScaleChange(value);
    setIsDropdownOpen(false);
  };

  const handleDecrementClick = () => {
    const newScale = scale - 10;
    if (newScale >= 0) {
      onScaleChange(newScale);
    }
  };

  const handleIncreaseClick = () => {
    const newScale = scale + 10;
    if (newScale <= 150) {
      onScaleChange(newScale);
    }
  };

  const renderDropdownOptions = () => {
    const options = [];
    for (let i = 10; i <= 150; i += 10) {
      options.push(
        <li key={i} style={{ listStyle: 'none', width: '100%' }}>
          <button
            type="button"
            className="control-element scale-value"
            onClick={() => handleOptionClick(i)}
          >
            {i}%{scale === i && <FontAwesomeIcon icon={faCheck} />}
          </button>
        </li>
      );
    }
    return options;
  };

  return (
    <div className="controls-bar">
      <button
        type="button"
        className="control-element button"
        onClick={onCenterBoard}
      >
        <FontAwesomeIcon icon={faArrowsToCircle} />
      </button>

      <button
        type="button"
        className="control-element button"
        onClick={handleDecrementClick}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>

      <button
        type="button"
        className="control-element current-scale"
        onClick={handleNumberClick}
      >
        {scale}%
      </button>

      {isDropdownOpen && (
        <div className="dropdown">{renderDropdownOptions()}</div>
      )}

      <button
        type="button"
        className="control-element button"
        onClick={handleIncreaseClick}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default Controls;
