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
    className='shrink-0 w-[254px] h-[450px] rounded-2xl overflow-hidden relative pointer-events-auto'>
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
        className='absolute inset-0 flex flex-col justify-between p-2 pb-4 text-white'>
            
            {/* Top section - Reels indicator */}
            <div className='flex justify-center'>
                <span className='text-white font-medium text-md'>Reels</span>
            </div>

            {/* Bottom section */}
            <div className='flex justify-between items-end'>
                {/* Left side - Content info */}
                <div className='flex flex-col space-y-2 flex-1 pr-4'>
                    {/* Profile section */}
                    <div className='flex items-center space-x-2'>
                        <div className='relative'>
                            <div className='w-10 h-10 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5'>
                                <div className='w-full h-full bg-black rounded-full p-[0.5px]'>
                                    <div className='w-full h-full rounded-full overflow-hidden bg-brand-primary p-1.5'>
                                        <img src="/bullmascot.png" alt="logo" className='w-full h-full object-cover rounded-full' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className='font-medium text-sm'>tauris.media</span>
                        <motion.button 
                            className='text-xs border border-white px-1.5 py-0.5 rounded font-medium'
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>Follow</motion.button>
                    </div>

                    {/* Description */}
                    <div className='text-xs'>
                        #{title} Colab ...... 
                    </div>
                </div>

                {/* Right side - Action buttons */}
                <div className='flex flex-col items-center space-y-4'>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <CiHeart className='w-5 h-5' />
                        <span className='text-xs mt-1'>42.1K</span>
                    </motion.button>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <FiMessageCircle className='w-5 h-5' />
                        <span className='text-xs mt-1'>891</span>
                    </motion.button>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <AiOutlineRetweet className='w-5 h-5' />
                        <span className='text-xs mt-1'>2.3K</span>
                    </motion.button>
                    <motion.button 
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <FiSend className='w-5 h-5' />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                        <HiDotsVertical className='w-4 h-4' />
                    </motion.button>
                    <motion.div 
                        className='w-7 h-7  rounded-lg overflow-hidden border border-white bg-brand-primary flex items-center justify-center p-1'
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