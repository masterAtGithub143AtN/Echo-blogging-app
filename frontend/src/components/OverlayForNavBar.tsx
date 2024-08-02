import React, { useEffect, useRef } from 'react';

interface OverlayForNavBarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const OverlayForNavBar: React.FC<OverlayForNavBarProps> = ({ isOpen, onClose,children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed h-6 inset-0 bg-black bg-opacity-50 z-10 flex justify-end">
      <div
        ref={overlayRef}
        className="w-64  h-10 overflow-y-auto bg-white border-l rounded-l shadow-md"
      >
        {children}
      </div>
    </div>
  );
};

export default OverlayForNavBar;
