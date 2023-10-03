import React, { useEffect, useState } from 'react';
import './category.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleXmark,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../Input';

interface CategoryInt {
  id: string;
  name: string;
  subcategories: CategoryInt[];
  isEditing: boolean;
}

interface CategoryProps {
  data: CategoryInt[];
  createCategory: (parentId: string | null) => void;
  renameCategory: (categoryId: string) => void;
  changeInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => void;
  saveCategory: (categoryId: string) => void;
  deleteCategory: (categoryId: string) => void;
  bgColor?: string | undefined;
}

const Category: React.FC<CategoryProps> = ({
  data,
  createCategory,
  renameCategory,
  changeInput,
  saveCategory,
  deleteCategory,
  bgColor,
}) => {
  const [childrenColor, setChildrenColor] = useState<string>();

  const getRandomBgColor = (): string => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  };

  useEffect(() => {
    setChildrenColor(() => getRandomBgColor());
  }, []);

  return (
    <ul className="categories">
      {data.map(category => (
        <li key={category.id} className="category">
          {category.isEditing ? (
            <Input
              title={category.name}
              categoryId={category.id}
              changeInput={changeInput}
              saveCategory={saveCategory}
              deleteCategory={deleteCategory}
            />
          ) : (
            <div className="category-container">
              <h3
                className="category-title"
                style={{ backgroundColor: bgColor }}
              >
                {category.name}
              </h3>
              <ul className="action-bar action-bar-invisible">
                <li>
                  <button
                    type="button"
                    className="action-button"
                    onClick={() => createCategory(category.id)}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="action-button"
                    onClick={() => renameCategory(category.id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="action-button action-button--red"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                </li>
              </ul>
            </div>
          )}
          {category.subcategories.length > 0 && (
            <Category
              data={category.subcategories}
              createCategory={createCategory}
              deleteCategory={deleteCategory}
              saveCategory={saveCategory}
              changeInput={changeInput}
              renameCategory={renameCategory}
              bgColor={childrenColor}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Category;
