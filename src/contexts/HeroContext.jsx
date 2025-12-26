import React, { createContext, useContext, useState } from 'react';

const HeroContext = createContext();

export const useHeroContext = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHeroContext must be used within a HeroProvider');
  }
  return context;
};

export const HeroProvider = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <HeroContext.Provider value={{ currentImageIndex, setCurrentImageIndex }}>
      {children}
    </HeroContext.Provider>
  );
};