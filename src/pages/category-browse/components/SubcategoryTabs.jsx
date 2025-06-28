import React from 'react';
import Button from '../../../components/ui/Button';

const SubcategoryTabs = ({ category, activeSubcategory, onSubcategoryChange }) => {
  const getSubcategories = (categoryName) => {
    const subcategories = {
      politics: ['All', 'Elections', 'Policy', 'International', 'Local'],
      technology: ['All', 'AI & ML', 'Startups', 'Gadgets', 'Software', 'Cybersecurity'],
      business: ['All', 'Markets', 'Economy', 'Startups', 'Corporate', 'Finance'],
      sports: ['All', 'Football', 'Basketball', 'Baseball', 'Soccer', 'Olympics'],
      health: ['All', 'Medicine', 'Wellness', 'Mental Health', 'Nutrition', 'Research'],
      science: ['All', 'Research', 'Space', 'Environment', 'Physics', 'Biology'],
      entertainment: ['All', 'Movies', 'Music', 'TV Shows', 'Celebrity', 'Gaming'],
      world: ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Middle East']
    };
    return subcategories[categoryName?.toLowerCase()] || ['All'];
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