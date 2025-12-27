import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { useHeroContext } from "../../contexts/HeroContext";

const MAROON = "#722f37"; 

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  // Track which info section is hovered to animate the "sidebar stick"
  const [activeInfoSection, setActiveInfoSection] = useState(null); 
  
  const location = useLocation();
  const { currentImageIndex } = useHeroContext();
  
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (open) return; 

      const currentScrollY = window.scrollY;
      
      if (isHomePage) {
        setVisible(true);
        return;
      }
      
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHomePage, open]);

  return (
    <>
      {/* --- Main Navbar --- */}
      <motion.div 
        className="fixed top-0 left-0 w-full z-50 bg-transparent"
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center px-4 sm:px-6 md:px-8 lg:px-12 pl-3 md:pl-8 h-16 sm:h-17 md:h-18">
          <div className="flex items-center w-1/3 group">
            <Link to="/" className="flex items-baseline gap-1 sm:gap-2 md:gap-2.5 no-underline">
              <span
                className="font-baskerville text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal tracking-[0.10em] sm:tracking-[0.12em] transition-all duration-300 group-hover:tracking-[0.16em] group-hover:text-white"
                style={{ fontVariant: 'small-caps' }}
              >
                Tauris
              </span>
              <span className="text-white/30 text-base xs:text-lg sm:text-xl font-light">|</span>
              <span
                className="font-libre-franklin text-white/80 text-xs xs:text-sm sm:text-base md:text-lg font-extralight tracking-[0.18em] sm:tracking-[0.25em] uppercase transition-all duration-300 group-hover:text-white group-hover:tracking-[0.3em]"
              >
                Media
              </span>
            </Link>
          </div>

          <div className="flex justify-center w-1/3 pl-5">
            <img
              src="/bullmascot.png"
              alt="logo"
              className="h-12 sm:h-13 md:h-14 w-auto object-contain opacity-80"
            />
          </div>

          <div className="text-white/70 flex justify-end w-1/3">
            <Menu
              className="h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 cursor-pointer hover:text-white hover:scale-105 transition-all duration-300"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </motion.div>

      {/* --- Overlay (Portal) --- */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="overlay"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{
                y: "-100%",
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="fixed inset-0 w-full h-screen z-[999] flex flex-col sm:flex-row bg-[#fffbf7] overflow-hidden"
            >
              
              {/* --- TOP LEFT: Subtle Pulse Sticks (Reverted) --- */}
              <div className="absolute top-8 left-8 sm:left-12 flex items-end gap-1 h-8 z-20">
                 {[1, 2, 3].map((i) => (
                    <motion.div 
                        key={i}
                        className="w-[2px] bg-[#722f37]"
                        animate={{ height: ["20%", "100%", "20%"] }}
                        transition={{ 
                            duration: 1.5, 
                            ease: "easeInOut", 
                            repeat: Infinity, 
                            delay: i * 0.2 
                        }}
                    />
                 ))}
                 <span className="ml-2 font-manrope text-xs text-[#722f37] tracking-widest opacity-80 pt-1">MENU</span>
              </div>

              {/* --- BACKGROUND ELEMENTS --- */}
              <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-[0.03]">
                 <span className="font-baskerville text-[30vw] text-[#722f37] leading-none select-none">
                    TAURIS
                 </span>
              </div>

              {/* Structural Lines */}
              <motion.div 
                className="hidden sm:block absolute left-1/2 top-0 w-[1px] bg-[#722f37] opacity-20 z-0"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
              />
              <motion.div 
                className="sm:hidden absolute bottom-32 left-6 right-6 h-[1px] bg-[#722f37] opacity-20 z-0"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
              />

              {/* X button */}
              <button className="text-black absolute right-4 sm:right-6 md:right-8 lg:right-12 top-6 z-[1000]">
                <X
                  className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer hover:scale-110 transition-transform hover:text-[#722f37]"
                  onClick={() => setOpen(false)}
                />
              </button>

              {/* Content Container */}
              <div className="flex flex-col sm:flex-row w-full h-full relative z-10">
                
                {/* Links Section */}
                <div className="flex flex-col w-full h-full justify-center items-center text-center sm:justify-start sm:items-start sm:text-left sm:w-1/2 sm:pt-20 sm:pl-20">
                  <div className="flex flex-col gap-4 sm:gap-8 md:gap-10 font-questrial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold w-full">
                    <MenuItem name="Home" path="/home" setOpen={setOpen} />
                    <MenuItem name="About" path="/about" setOpen={setOpen} />
                    <MenuItem name="Projects" path="/projects" setOpen={setOpen} />
                  </div>

                  <motion.div
                    className="w-full flex justify-center sm:justify-start mt-8 sm:mt-16 md:mt-20"
                    whileHover="hover"
                    initial="initial"
                    animate="initial"
                  >
                    <Link
                      to="/contact"
                      className="group relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-questrial flex items-center gap-4"
                      onClick={() => setOpen(false)}
                    >
                      <motion.div 
                        className="h-[2px] bg-[#722f37] hidden sm:block"
                        variants={{
                            initial: { width: 0, opacity: 0 },
                            hover: { width: 40, opacity: 1 }
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="group-hover:text-[#722f37] transition-colors duration-300">Contact</span>
                    </Link>
                  </motion.div>
                </div>

                {/* --- ENHANCED DESKTOP INFO SECTION --- */}
                <div className="hidden sm:flex flex-col sm:w-1/2 justify-start pl-12 md:pl-20 lg:pl-28 xl:pl-48 pt-12 md:pt-30 lg:pt-54 relative">
                  
                  {/* The Vertical "Data Line" */}
                  <div className="absolute left-0 md:left-12 lg:left-20 top-[15%] h-[60%] w-[1px] bg-[#722f37] opacity-20 hidden md:block"></div>
                  
                  {/* The Animated "Active Indicator" Bar (Moves based on activeInfoSection state) */}
                  <motion.div 
                    className="absolute left-0 md:left-12 lg:left-20 w-[3px] bg-[#722f37] hidden md:block"
                    initial={{ height: 0, top: "15%" }}
                    animate={{ 
                        height: activeInfoSection ? 50 : 0,
                        top: activeInfoSection === 'social' ? '25%' 
                           : activeInfoSection === 'contact' ? '45%' 
                           : activeInfoSection === 'location' ? '65%' : '15%',
                        opacity: activeInfoSection ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  />

                  <div className="flex flex-col gap-10">
                      {/* Social Block */}
                      <div 
                        onMouseEnter={() => setActiveInfoSection('social')}
                        onMouseLeave={() => setActiveInfoSection(null)}
                        className="group"
                      >
                        <h3 className="font-medium text-lg text-[#722f37]/60 group-hover:text-[#722f37] transition-colors duration-300 flex items-center gap-2">
                            Social
                            <span className="w-1 h-1 bg-[#722f37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </h3>
                        <div className="flex gap-4 mt-2 text-xl sm:text-2xl px-2">
                          <FaLinkedin className="hover:scale-120 hover:text-[#722f37] transform transition-all cursor-pointer opacity-80 hover:opacity-100" />
                          <FaInstagram className="hover:scale-120 hover:text-[#722f37] transform transition-all cursor-pointer opacity-80 hover:opacity-100" />
                        </div>
                      </div>

                      {/* Contact Block */}
                      <div 
                        onMouseEnter={() => setActiveInfoSection('contact')}
                        onMouseLeave={() => setActiveInfoSection(null)}
                        className="group"
                      >
                        <h3 className="font-medium text-lg text-[#722f37]/60 group-hover:text-[#722f37] transition-colors duration-300 flex items-center gap-2">
                            Contact
                            <span className="w-1 h-1 bg-[#722f37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </h3>
                        <div className="flex flex-col gap-2 mt-2">
                          <h6 className="inline-block px-2 py-1 hover:text-[#722f37] cursor-pointer transition-all duration-300 sm:w-64 w-auto opacity-80 hover:opacity-100">
                            xyz@gmail.com
                          </h6>
                          <h6 className="inline-block px-2 py-1 hover:text-[#722f37] cursor-pointer transition-all duration-300 sm:w-64 w-auto opacity-80 hover:opacity-100">
                            +91 9999999999
                          </h6>
                        </div>
                      </div>

                      {/* Location Block */}
                      <div 
                        onMouseEnter={() => setActiveInfoSection('location')}
                        onMouseLeave={() => setActiveInfoSection(null)}
                        className="group"
                      >
                        <h3 className="font-medium text-lg text-[#722f37]/60 group-hover:text-[#722f37] transition-colors duration-300 flex items-center gap-2">
                            Location
                            <span className="w-1 h-1 bg-[#722f37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </h3>
                        <div className="flex flex-col gap-2 mt-2">
                          <h6 className="inline-block px-2 py-1 hover:text-[#722f37] cursor-pointer transition-all duration-300 sm:w-64 w-auto opacity-80 hover:opacity-100">
                            Kolkata, West Bengal
                          </h6>
                          <h6 className="inline-block px-2 py-1 hover:text-[#722f37] cursor-pointer transition-all duration-300 sm:w-64 w-auto opacity-80 hover:opacity-100">
                            India
                          </h6>
                        </div>
                      </div>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="absolute bottom-8 w-full px-6 flex flex-row justify-between items-end sm:hidden text-xs z-10">
                  <div className="flex flex-col gap-2">
                     <div>
                       <h3 className="font-bold mb-1 text-[#722f37]">Social</h3>
                       <div className="flex gap-3 text-lg">
                         <FaLinkedin className="hover:text-[#722f37]" />
                         <FaInstagram className="hover:text-[#722f37]" />
                       </div>
                     </div>
                     <div>
                       <h3 className="font-bold mb-1 mt-2 text-[#722f37]">Location</h3>
                       <p>Kolkata, India</p>
                     </div>
                  </div>

                  <div className="flex flex-col gap-1 text-right">
                    <h3 className="font-bold mb-1 text-[#722f37]">Contact</h3>
                    <p className="cursor-pointer">xyz@gmail.com</p>
                    <p className="cursor-pointer">+91 9999999999</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

const MenuItem = ({ name, path, setOpen }) => {
    return (
        <motion.div
            className="w-full flex justify-center sm:justify-start items-center gap-4"
            initial="initial"
            whileHover="hover"
            animate="initial"
        >
            <motion.div 
                className="h-[2px] bg-[#722f37] hidden sm:block"
                variants={{
                    initial: { width: 0, opacity: 0 },
                    hover: { width: 40, opacity: 1 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
            
            <Link 
                to={path} 
                onClick={() => setOpen(false)}
                className="relative block transition-all duration-300 hover:text-[#722f37] hover:tracking-widest"
            >
                {name}
            </Link>
        </motion.div>
    );
};

export default Navbar;