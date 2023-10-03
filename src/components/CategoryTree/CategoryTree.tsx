import React, { useState } from 'react';
import './categoryTree.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import CategoryList from '../Category';

interface Category {
  id: string;
  name: string;
  subcategories: Category[];
  isEditing: boolean;
}

const CategoryTree: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleCreateCategory = (parentId: string | null) => {
    setCategories(prevCategories => {
      const newCategory: Category = {
        id: new Date().toString(),
        name: '',
        subcategories: [],
        isEditing: true,
      };

      if (parentId === null) {
        return [...prevCategories, newCategory];
      }

      const updateCategory = (categories: Category[]): Category[] => {
        return categories.map(category => {
          if (category.id === parentId) {
            return {
              ...category,
              subcategories: [...category.subcategories, newCategory],
            };
          } else if (category.subcategories.length > 0) {
            return {
              ...category,
              subcategories: updateCategory(category.subcategories),
            };
          }
          return category;
        });
      };

      return updateCategory(prevCategories);
    });
  };

  const handleRenameCategory = (categoryId: string) => {
    setCategories(prevCategories => {
      const updateCategory = (categories: Category[]): Category[] => {
        return categories.map(category => {
          if (category.id === categoryId) {
            return { ...category, isEditing: true };
          } else if (category.subcategories.length > 0) {
            return {
              ...category,
              subcategories: updateCategory(category.subcategories),
            };
          }
          return category;
        });
      };

      return updateCategory(prevCategories);
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    const { value } = event.target;

    const updateCategory = (category: Category): Category => {
      if (category.id === categoryId) {
        return { ...category, name: value };
      } else if (category.subcategories.length > 0) {
        return {
          ...category,
          subcategories: category.subcategories.map(subCategory =>
            updateCategory(subCategory)
          ),
        };
      }
      return category;
    };

    setCategories(prevCategories => {
      return prevCategories.map(category => updateCategory(category));
    });
  };

  const handleSaveCategory = (categoryId: string) => {
    setCategories(prevCategories => {
      const updateCategory = (categories: Category[]): Category[] => {
        return categories.map(category => {
          if (category.id === categoryId) {
            return { ...category, isEditing: false };
          } else if (category.subcategories.length > 0) {
            return {
              ...category,
              subcategories: updateCategory(category.subcategories),
            };
          }
          return category;
        });
      };

      return updateCategory(prevCategories);
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prevCategories => {
      const removeCategory = (categories: Category[]): Category[] => {
        return categories.filter(category => {
          if (category.id === categoryId) {
            return false;
          } else if (category.subcategories.length > 0) {
            category.subcategories = removeCategory(category.subcategories);
          }
          return true;
        });
      };

      return removeCategory(prevCategories);
    });
  };

  return (
    <div className="root-category">
      <div className="root-category-container">
        <h2 className="root-category-title">Categories</h2>
        <button
          type="button"
          className="action-button"
          onClick={() => handleCreateCategory(null)}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>
      {categories.length > 0 && (
        <CategoryList
          data={categories}
          createCategory={handleCreateCategory}
          deleteCategory={handleDeleteCategory}
          saveCategory={handleSaveCategory}
          changeInput={handleInputChange}
          renameCategory={handleRenameCategory}
        />
      )}
    </div>
  );
};

export default CategoryTree;
