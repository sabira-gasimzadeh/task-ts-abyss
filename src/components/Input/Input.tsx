import React, { useEffect } from 'react';
import './input.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faCircleCheck,
  faRightLong,
} from '@fortawesome/free-solid-svg-icons';

interface InputProps {
  title: string;
  categoryId: string;
  changeInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => void;
  saveCategory: (categoryId: string) => void;
  deleteCategory: (categoryId: string) => void;
}

const Input: React.FC<InputProps> = ({
  title,
  categoryId,
  changeInput,
  saveCategory,
  deleteCategory,
}) => {
  useEffect(() => {
    const board = document.getElementById('board');
    const inputEl = document.getElementById('input');
    const btnEl = document.getElementById('delete')?.firstChild;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Enter') {
        saveCategory(categoryId);
      }
    };

    const handlerMouseDown = (e: MouseEvent) => {
      if (e.target === inputEl || e.target === btnEl?.firstChild) {
        return;
      }
      saveCategory(categoryId);
      return;
    };

    document.addEventListener('keydown', handleKeyDown);
    board?.addEventListener('mousedown', handlerMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      board?.removeEventListener('mousedown', handlerMouseDown);
    };
  }, [categoryId, saveCategory]);

  return (
    <div id="input-wrapper" className="category-input-wrapper">
      <input
        id="input"
        autoComplete="off"
        autoFocus
        type="text"
        value={title}
        placeholder="Category name"
        onChange={event => changeInput(event, categoryId)}
      />
      <div className="action-bar">
        <button
          id="delete"
          type="button"
          className="action-button action-button--yellow"
          onClick={() => deleteCategory(categoryId)}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <button
          type="button"
          className="action-button action-button--green"
          onClick={() => saveCategory(categoryId)}
        >
          <FontAwesomeIcon icon={faCircleCheck} />
        </button>
      </div>
      <div className="arrow">
        <FontAwesomeIcon icon={faRightLong} beatFade size="lg" />
      </div>
    </div>
  );
};

export default Input;
