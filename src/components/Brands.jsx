import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Brands = ({brand}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      className='relative group h-full w-full'
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className='flex items-center justify-center w-full h-full min-h-[80px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm'>
        {brand.logo && !imgError ? (
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className='max-w-[60%] max-h-[50%] object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 filter'
            onError={() => setImgError(true)}
          />
        ) : (
          <h3 className='font-questrial text-white/60 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center px-2 group-hover:text-white transition-colors duration-300 tracking-wider'>
            {brand?.name}
          </h3>
        )}
        
        {/* Subtle glow effect on hover */}
        <div className='absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
      </div>
    </motion.div>
  )
}

export default Brands