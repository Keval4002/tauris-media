import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
      {/* Navbar */}
      <div className="flex items-center px-4 sm:px-6 md:px-8 lg:px-12 pl-8 h-24 sm:h-24 md:h-24 lg:h-24">
        {/* Left: Brand */}
        <div className="flex items-center w-1/3">
          <h1 className="text-white/80 text-lg font-libre-franklin font-extralight">
            <span
              className="inline-block font-baskerville text-white sm:text-4xl md:text-5xl font-extralight"
              style={{ transform: "skewX(-15deg)" }}
            >
              Tauris
            </span>{" "}
            Media
          </h1>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center w-1/3">
          <img
            src="/bullmascot.png"
            alt="logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Right: Hamburger */}
        <div className="text-white flex justify-end w-1/3">
          <Menu
            className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
      </div>

      {/* Overlay */}
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
            className="fixed inset-0 w-full h-screen z-60 flex flex-col sm:flex-row bg-white"
          >
            {/* X button */}
            <button className="text-black absolute right-4 sm:right-6 md:right-8 lg:right-12 top-6">
              <X
                className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </button>

            <div className="pt-20 sm:pl-20 flex flex-row w-full">
              <div className="flex flex-col items-center w-full text-center sm:items-start sm:w-1/2">
                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 font-questrial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold w-full">
                  {[
                    { name: "Work", path: "/work" },
                    { name: "About", path: "/about" },
                    { name: "Projects", path: "/highlights" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="w-full flex justify-center sm:justify-start"
                      whileHover={{
                        y: -10,
                        color: "oklch(0.344 0.124 21.31)",
                        letterSpacing: "1px",
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      <Link to={item.path} onClick={() => setOpen(false)}>{item.name}</Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="w-full flex justify-center sm:justify-start mt-12 sm:mt-16 md:mt-20"
                  whileHover={{
                    y: -10,
                    color: "oklch(0.344 0.124 21.31)",
                    scale: 1.05,
                    letterSpacing: "1px",
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <Link
                    to="/contact"
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-questrial"
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>

              <div className="hidden sm:flex flex-col sm:w-1/2 gap-6 justify-start pl-12 md:pl-20 lg:pl-28 xl:pl-48 pt-12 md:pt-30 lg:pt-54">
                <div>
                  <h3 className="font-medium text-lg">Social</h3>
                  <div className="flex gap-4 mt-2 text-xl sm:text-2xl px-2">
                    <FaLinkedin className="hover:scale-120 transform transition-all" />
                    <FaInstagram className="hover:scale-120 transform transition-all" />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg">Contact</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <h6 className="inline-block px-2 py-1 hover:bg-brand-primary hover:text-white cursor-pointer transition-all duration-600 ease-in-out sm:w-64 w-auto">
                      xyz@gmail.com
                    </h6>
                    <h6 className="inline-block px-2 py-1 hover:bg-brand-primary hover:text-white cursor-pointer transition-all duration-600 ease-in-out sm:w-64 w-auto">
                      +91 9999999999
                    </h6>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg">Location</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <h6 className="inline-block px-2 py-1 hover:bg-brand-primary hover:text-white cursor-pointer transition-all duration-600 ease-in-out sm:w-64 w-auto">
                      Kolkata, West Bengal
                    </h6>
                    <h6 className="inline-block px-2 py-1 hover:bg-brand-primary hover:text-white cursor-pointer transition-all duration-600 ease-in-out sm:w-64 w-auto">
                      India
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Footer (only <640px) */}
            <div className="flex sm:hidden flex-col gap-6 mt-20 w-full px-6 text-center">
              <div>
                <h3 className="font-medium text-lg">Social</h3>
                <div className="flex justify-center gap-4 text-2xl mt-2">
                  <FaLinkedin />
                  <FaInstagram />
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg">Contact</h3>
                <p className="w-full py-1 hover:bg-brand-primary hover:text-white inline-block cursor-pointer transition-all">
                  xyz@gmail.com
                </p>
                <p className="w-full py-1 hover:bg-brand-primary hover:text-white inline-block cursor-pointer transition-all mt-1">
                  +91 9999999999
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg">Location</h3>
                <p className="w-full py-1 hover:bg-brand-primary hover:text-white inline-block cursor-pointer transition-all">
                  Kolkata, West Bengal
                </p>
                <p className="w-full py-1 hover:bg-brand-primary hover:text-white inline-block cursor-pointer transition-all mt-1">
                  India
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
