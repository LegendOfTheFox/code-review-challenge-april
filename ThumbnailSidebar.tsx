import React, { useState, memo, useCallback } from 'react';

interface Page {
  id: string;
  pageNumber: number;
  thumbnailUrl: string;
  isProcessed: boolean;
}

interface SidebarProps {
  pages: Page[];
}

export const ThumbnailSidebar = ({ pages }: SidebarProps) => {
  const [activePageId, setActivePageId] = useState<string | null>(null);

  const handlePageSelect = useCallback((id: string) => {
    setActivePageId(id);
  }, []);

  return (
    <div className="sidebar-container">
      <div className="list">
        {pages.map((page) => (
          <Thumbnail 
            key={page.id}
            page={page}
            isSelected={activePageId === page.id}
            onSelect={handlePageSelect}
          />
        ))}
      </div>
    </div>
  );
};

const Thumbnail = memo(({ page, isSelected, onSelect }: any) => {
  return (
    <div 
      className={`thumb ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(page.id)}
    >
      <img src={page.thumbnailUrl} alt={`Page ${page.pageNumber}`} />
    </div>
  );
});
