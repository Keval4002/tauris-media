import React from 'react';

export const ProgressIndicator = ({ stickCount, currentImageIndex, totalImages }) => {
  const counters = Array.from({ length: totalImages }, (_, i) => i);

  return (
    <div className="fixed bottom-4 left-0 w-screen z-50">
      <div className="flex items-center w-full px-4">
        <div className="flex items-center justify-evenly w-full">
          {counters.map((counterIndex) => (
            <React.Fragment key={`section-${counterIndex}`}>
              {/* Progress sticks */}
              {Array.from({ length: stickCount }).map((_, stickIndex) => (
                <div
                  key={`stick-${counterIndex}-${stickIndex}`}
                  className="h-2 w-px transition-all duration-500 ease-in-out"
                  style={{ 
                    backgroundColor: '#f1e6d2',
                    opacity: 0.6
                  }}
                />
              ))}
              
              {/* Counter */}
              <div 
                className={`text-lg sm:text-xl font-light text-center transition-colors duration-300 font-cormorant ${
                  currentImageIndex === counterIndex ? 'text-sticks' : 'text-white'
                }`}
              >
                [{String(counterIndex + 1).padStart(2, '0')}]
              </div>
            </React.Fragment>
          ))}
          
          {/* Final progress sticks */}
          {Array.from({ length: stickCount }).map((_, index) => (
            <div
              key={`final-stick-${index}`}
              className="h-2 w-px transition-all duration-500 ease-in-out"
              style={{ 
                backgroundColor: '#f1e6d2',
                opacity: 0.6
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
