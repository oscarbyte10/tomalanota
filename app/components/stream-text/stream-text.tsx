'use client';

import { useEffect, useState } from 'react';

export const StreamText = ({ text }: { text?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const TYPING_SPEED = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < Number(text?.length)) {
        setDisplayedText((prevText) => prevText + text?.[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, TYPING_SPEED);
    return () => clearInterval(interval);
  }, [currentIndex, text, TYPING_SPEED]);
  return (
    <div className="bg-background text-foreground p-4 rounded-md shadow-md max-w-md mx-auto">
      <p className="text-lg font-medium">{displayedText}</p>
    </div>
  );
};
