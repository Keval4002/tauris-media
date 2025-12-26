import React from 'react'
import { motion } from 'framer-motion'
import { CiHeart } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

const ProjectScreen = ({videoSrc, title, isInView}) => {
  const videoRef = React.useRef(null);

  // Handle video playback based on view state
  React.useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div 
    whileHover={{scale: isInView ? 1.18 : 1.05}}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    style={{ transformOrigin: 'center' }}
    className='shrink-0 h-[50vh] md:h-[58vh] lg:h-[65vh] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden relative pointer-events-auto hover:cursor-pointer'>
        <video 
        ref={videoRef}
        src={videoSrc}
        className='w-full h-full object-cover'
        autoPlay muted loop playsInline
        />
        {/* Dark overlay that appears only on hover */}
        <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.35 }}   /* adjustable darkness */
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />

        <motion.div 
        className='absolute inset-0 flex flex-col justify-between p-2 md:p-1.5 lg:p-2 pb-2.5 md:pb-3 lg:pb-4 text-white'>
            
            {/* Top section - Reels indicator */}
            <div className='flex justify-center pt-0.5 md:pt-0'>
                <span className='text-white font-medium text-[10px] md:text-xs lg:text-sm'>Reels</span>
            </div>

            {/* Bottom section */}
            <div className='flex justify-between items-end'>
                {/* Left side - Content info */}
                <div className='flex flex-col space-y-1.5 md:space-y-1.5 lg:space-y-2 flex-1 pr-1.5 md:pr-2 lg:pr-4'>
                    {/* Profile section */}
                    <div className='flex items-center space-x-1.5 md:space-x-1.5 lg:space-x-2'>
                        <div className='relative'>
                            <div className='w-6 h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-orange-400 p-[1px] md:p-0.5'>
                                <div className='w-full h-full bg-black rounded-full p-[0.5px]'>
                                    <div className='w-full h-full rounded-full overflow-hidden bg-brand-primary p-0.5 md:p-1 lg:p-1.5'>
                                        <img src="/bullmascot.png" alt="logo" className='w-full h-full object-cover rounded-full' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className='font-medium text-[8px] md:text-[9px] lg:text-sm'>tauris.media</span>
                        <motion.button 
                            className='text-[6px] md:text-[8px] lg:text-xs border border-white px-1 md:px-1 lg:px-1.5 py-[2px] md:py-0.5 rounded font-medium'
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>Follow</motion.button>
                    </div>

                    {/* Description */}
                    <div className='text-[7px] md:text-[8px] lg:text-xs'>
                        #{title} Colab ...... 
                    </div>
                </div>

                {/* Right side - Action buttons */}
                <div className='flex flex-col items-center space-y-1.5 md:space-y-2 lg:space-y-4'>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <CiHeart className='w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5' />
                        <span className='text-[6px] md:text-[7px] lg:text-xs mt-0.5'>42.1K</span>
                    </motion.button>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <FiMessageCircle className='w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5' />
                        <span className='text-[6px] md:text-[7px] lg:text-xs mt-0.5'>891</span>
                    </motion.button>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <AiOutlineRetweet className='w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5' />
                        <span className='text-[6px] md:text-[7px] lg:text-xs mt-0.5'>2.3K</span>
                    </motion.button>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <FiSend className='w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5' />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <HiDotsVertical className='w-3 h-3 md:w-3 md:h-3 lg:w-4 lg:h-4' />
                    </motion.button>
                    <motion.div 
                        className='w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 rounded md:rounded-lg overflow-hidden border border-white bg-brand-primary flex items-center justify-center p-[2px] md:p-0.5 lg:p-1'
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <img src="/bullmascot.png" alt="logo" className='w-full h-full object-contain' />
                    </motion.div>
                </div>
            </div>
        </motion.div>


    </motion.div>

  )
}

export default ProjectScreen