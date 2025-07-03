import React from 'react';
import Button from '../../../components/ui/Button';

const SubcategoryTabs = ({ category, activeSubcategory, onSubcategoryChange }) => {
  const getSubcategories = (categoryName) => {
    return [];
  };

  const subcategories = getSubcategories(category);

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide pb-2">
        {subcategories.map((subcategory) => (
          <Button
            key={subcategory}
            variant={activeSubcategory === subcategory ? "primary" : "ghost"}
            onClick={() => onSubcategoryChange(subcategory)}
            className="whitespace-nowrap flex-shrink-0 min-w-0"
          >
            {subcategory}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryTabs;
