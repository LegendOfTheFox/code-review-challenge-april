import React, { useState, useEffect } from 'react';

export const ThumbnailSidebar = ({ pages }: any) => {
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [viewTime, setViewTime] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);

  const config = { interval: 1000, logEnabled: true };

  useEffect(() => {
    const timer = setInterval(() => {
      setViewTime((t) => t + 1);
    }, config.interval);
    return () => clearInterval(timer);
  }, [config]); 

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') console.log("User navigating...");
    });
  }, []); 

  useEffect(() => {
    const count = pages.filter((p: any) => p.isProcessed).length;
    setProcessedCount(count);
  }, [pages]);

  const handlePageSelect = (id: string) => {
    setActivePageId(id);
  };

  const checkStatus = (id: string) => {
    return pages.find((p: any) => p.id === id)?.isProcessed;
  };

  return (
    <div className="sidebar">
      <input onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
      <div>Time: {viewTime}s | Processed: {processedCount}</div>
      
      {pages.map((page: any) => (
        <Thumbnail 
          key={page.id}
          page={page}
          isSelected={activePageId === page.id}
          onSelect={handlePageSelect}
          isDone={checkStatus(page.id)} 
        />
      ))}
    </div>
  );
};

const Thumbnail = React.memo(({ page, isSelected, onSelect, isDone }: any) => {
  return (
    <div onClick={() => onSelect(page.id)} className={isSelected ? 'active' : ''}>
      <img src={page.thumbnailUrl} />
      {isDone && <span>✓</span>}
    </div>
  );
});
