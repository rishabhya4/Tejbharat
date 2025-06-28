import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookmarkFilters = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  filterBy, 
  onFilterChange,
  selectedFolder,
  onFolderChange,
  folders,
  onCreateFolder
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const sortOptions = [
    { value: 'savedDate', label: 'Date Saved', icon: 'Calendar' },
    { value: 'title', label: 'Title (A-Z)', icon: 'AlphabeticalOrder' },
    { value: 'source', label: 'Source', icon: 'Building' },
    { value: 'readStatus', label: 'Reading Status', icon: 'Eye' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Articles', icon: 'FileText' },
    { value: 'unread', label: 'Unread Only', icon: 'EyeOff' },
    { value: 'read', label: 'Read Only', icon: 'Eye' },
    { value: 'offline', label: 'Offline Available', icon: 'Download' }
  ];

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      setIsCreatingFolder(true);
      await onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Input
          type="search"
          placeholder="Search bookmarks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} className="text-text-secondary" />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={filterBy === option.value ? "primary" : "outline"}
            onClick={() => onFilterChange(option.value)}
            className="text-xs"
            iconName={option.icon}
            iconSize={14}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="text-sm"
          iconName={isFiltersExpanded ? "ChevronUp" : "ChevronDown"}
          iconSize={16}
        >
          Advanced Filters
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm bg-background border border-border rounded-md px-2 py-1 focus:ring-2 focus:ring-accent/20 focus:border-accent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded Filters */}
      {isFiltersExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-4">
          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Folder
            </label>
            <div className="flex items-center space-x-2">
              <select
                value={selectedFolder}
                onChange={(e) => onFolderChange(e.target.value)}
                className="flex-1 text-sm bg-background border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-accent/20 focus:border-accent"
              >
                <option value="">All Folders</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name} ({folder.count})
                  </option>
                ))}
              </select>
              
              <Button
                variant="outline"
                onClick={() => setIsCreatingFolder(!isCreatingFolder)}
                iconName="Plus"
                iconSize={16}
                className="flex-shrink-0"
              >
                New
              </Button>
            </div>

            {/* Create New Folder */}
            {isCreatingFolder && (
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  type="text"
                  placeholder="Folder name..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateFolder();
                    }
                    if (e.key === 'Escape') {
                      setIsCreatingFolder(false);
                      setNewFolderName('');
                    }
                  }}
                />
                <Button
                  variant="primary"
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                  className="flex-shrink-0"
                  iconName="Check"
                  iconSize={16}
                >
                  Create
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsCreatingFolder(false);
                    setNewFolderName('');
                  }}
                  className="flex-shrink-0"
                  iconName="X"
                  iconSize={16}
                />
              </div>
            )}
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Saved From
              </label>
              <Input
                type="date"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Saved To
              </label>
              <Input
                type="date"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkFilters;