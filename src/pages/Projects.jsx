import React from 'react'
import ProjectScreen from '../components/ProjectScreen';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Services from '../components/Services';

const Projects = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    window.history.scrollRestoration = 'manual';
  }, []);


  
  const sectionRef = React.useRef(null);

  const {scrollYProgress} = useScroll({
    target:sectionRef,
    offset:["start 80%", "end 20%"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["300%", "-140%"]);

  return (
    <div className='relative min-h-[200vh] w-full bg-black'>

      {/* Background Video - Fixed and behind everything */}
      <div className='fixed top-0 left-0 w-full h-screen z-0'>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className='w-full h-full object-cover'
          style={{ playbackRate: 0.5 }}
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.5;
            }
          }}
          src="/videos/project-bg.mp4"
        />
        {/* Dark overlay to ensure text readability */}
        <div className='absolute top-0 left-0 w-full h-full bg-black/30' />
      </div>

      <div className='fixed top-0 left-0 w-full h-screen'>
        <div className='relative z-20'>
          <div className='flex items-center justify-center w-full h-screen p-20'>
            <motion.h1 
              className='text-white/90 font-questrial text-7xl'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>Making Brands Unskippable</motion.h1>
          </div>
        </div>
      </div>

      <div className='fixed top-0 left-0 w-full h-screen z-30 flex items-center justify-center overflow-hidden pointer-events-none'>
        <motion.div
        ref={sectionRef} 
        className='flex gap-16 px-10 py-5 w-fit pointer-events-none'
        style={{x}}>
        {[
          {id: 1, title: "Food1"},
          {id: 7, title: "Snitch"},
          {id: 2, title: "Food2"},
          {id: 6, title: "Snitch"},
          {id: 3, title: "Food3"},
          {id: 4, title: "ViGe"},
          {id: 5, title: "Food4"},
          {id:8, title:"Bonjour Men's Socks"}
        ].map((item, idx) => {
          const cardRef = React.useRef(null);
          const isInView = useInView(cardRef, { 
            threshold: 0.3,
            margin: "-100px 0px"
          });
          
          return (
            <motion.div
              key={idx}
              ref={cardRef}
              initial={{ opacity: 0.6, scale: 0.95, filter: "blur(1px)" }}
              animate={{ 
                opacity: isInView ? 1 : 0.6,
                scale: isInView ? 1 : 0.95,
                filter: isInView ? "blur(0px)" : "blur(1px)"
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}>
              <ProjectScreen 
                videoSrc={`/videos/b-${item.id}.mp4`} 
                title={item.title}
                isInView={isInView}
              />
            </motion.div>
          )
        })}
        </motion.div>
      </div>

      <div className='w-full h-screen flex'>
        {[1,2,3].map((id)=>{
          return (
           <Services /> 
          )
        })}
      </div>
    </div>
  )
}

export default Projects