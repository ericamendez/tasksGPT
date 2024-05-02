import { useEffect, useRef } from 'react';

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Add event listener to detect clicks outside of the specified element
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useClickOutside;