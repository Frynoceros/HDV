import { useRef, useEffect } from 'react';

export function useTouch() {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e, elementRef) => {
    if (!elementRef.current) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    scrollLeft.current = elementRef.current.scrollLeft;
    isDragging.current = false;
  };

  const handleTouchMove = (e, elementRef) => {
    if (!elementRef.current) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchStartX.current - touchX;
    const deltaY = touchStartY.current - touchY;
    
    // Only handle horizontal scrolling if horizontal movement is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isDragging.current = true;
      e.preventDefault(); // Prevent vertical scrolling
      elementRef.current.scrollLeft = scrollLeft.current + deltaX;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging: isDragging.current
  };
}

export function useLongPress(callback, delay = 500) {
  const timeoutRef = useRef(null);
  const isPressed = useRef(false);

  const start = (e) => {
    isPressed.current = true;
    timeoutRef.current = setTimeout(() => {
      if (isPressed.current) {
        callback(e);
      }
    }, delay);
  };

  const clear = () => {
    isPressed.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchMove: clear,
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear
  };
}