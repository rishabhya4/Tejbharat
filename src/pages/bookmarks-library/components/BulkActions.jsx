import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedBookmarks, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDelete, 
  onBulkMarkRead, 
  onBulkMarkUnread,
  onBulkMoveToFolder,
  onBulkExport,
  totalBookmarks,
  folders
}) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');

  const selectedCount = selectedBookmarks.length;
  const isAllSelected = selectedCount === totalBookmarks && totalBookmarks > 0;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const handleBulkAction = async (action) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Delete ${selectedCount} selected bookmarks?`)) {
          await onBulkDelete(selectedBookmarks);
        }
        break;
      case 'markRead':
        await onBulkMarkRead(selectedBookmarks);
        break;
      case 'markUnread':
        await onBulkMarkUnread(selectedBookmarks);
        break;
      case 'export':
        await onBulkExport(selectedBookmarks);
        break;
      case 'moveToFolder':
        if (selectedFolder) {
          await onBulkMoveToFolder(selectedBookmarks, selectedFolder);
          setSelectedFolder('');
        }
        break;
    }
    setIsActionMenuOpen(false);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-floating bg-background border border-border rounded-lg shadow-news-lg backdrop-blur-sm">
      <div className="flex items-center space-x-4 px-4 py-3">
        {/* Selection Info */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
              />
              {selectedCount > 0 && !isAllSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-accent rounded-sm"></div>
                </div>
              )}
            </div>
            <span>
              {selectedCount} of {totalBookmarks} selected
            </span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => handleBulkAction('markRead')}
            className="text-xs px-2 py-1"
            iconName="Eye"
            iconSize={14}
          >
            Mark Read
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleBulkAction('markUnread')}
            className="text-xs px-2 py-1"
            iconName="EyeOff"
            iconSize={14}
          >
            Mark Unread
          </Button>

          <Button
            variant="ghost"
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className="text-xs px-2 py-1"
            iconName="MoreHorizontal"
            iconSize={14}
          >
            More
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleBulkAction('delete')}
            className="text-xs px-2 py-1 text-error hover:text-error hover:bg-error/10"
            iconName="Trash2"
            iconSize={14}
          >
            Delete
          </Button>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          onClick={onDeselectAll}
          className="text-xs px-2 py-1"
          iconName="X"
          iconSize={14}
        />
      </div>

      {/* Extended Actions Menu */}
      {isActionMenuOpen && (
        <div className="border-t border-border p-4 space-y-3">
          {/* Move to Folder */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="flex-1 text-sm bg-background border border-border rounded-md px-2 py-1 focus:ring-2 focus:ring-accent/20 focus:border-accent"
            >
              <option value="">Select folder...</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={() => handleBulkAction('moveToFolder')}
              disabled={!selectedFolder}
              className="text-xs px-3 py-1"
              iconName="FolderPlus"
              iconSize={14}
            >
              Move
            </Button>
          </div>

          {/* Export Options */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handleBulkAction('export')}
              className="text-xs px-3 py-1"
              iconName="Download"
              iconSize={14}
            >
              Export as JSON
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleBulkAction('export')}
              className="text-xs px-3 py-1"
              iconName="FileText"
              iconSize={14}
            >
              Export as CSV
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;