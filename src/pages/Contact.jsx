import React from 'react'

const Contact = () => {
  return (
    <div className='relative min-h-screen flex items-center justify-center'>

      <video autoPlay muted loop className='fixed top-0 left-0 w-full h-full object-cover z-10'>
        <source src='/videos/contact.mp4' type="video/mp4"/>
      </video>

      <div className='grid grid-cols-1 lg:grid-cols-2 w-full h-screen z-20 overflow-hidden'>
        
        <div className='bg-white/ p-4 sm:p-8 md:p-10 lg:p-14 flex items-center'>
          <p className='text-center lg:text-left px-1 sm:px-6 lg:px-0 pt-20 md:pt-13 lg:pt-18 lg:pr-20 xl:pr-48 text-xs sm:text-sm md:text-lg lg:text-xl text-white font-baskerville leading-relaxed'>Bold moves start here. At Tauris, we are the force behind ambitious visions. We embody the unwavering confidence of the Bull, providing the strategic design and cinematic production needed for any entity, anywhere in the world, to establish a commanding presence. No matter the industry, we make sure you don't just fit in—you lead. Let's discuss your next confident stride.</p>
        </div>

        <div className='hidden lg:flex flex-col justify-start h-full backdrop-blur-2xl bg-white/20 border-l border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] p-8 py-12 pt-16 overflow-hidden'>

          <div className='mb-8'>
            <h3 className='text-white/60 text-lg mb-4'>Reach out</h3>
            <div className='text-white text-xl font-light'>
              taurisStudio@mail
              <span className='ml-2'>↗</span>
            </div>
          </div>

          <div className='w-full h-px bg-white/20 mb-10 -mx-8 border-t border-white/20' style={{ width: 'calc(100% + 64px)' }}></div>

          <div className='mb-8'>
            <h3 className='text-white/60 text-lg mb-4'>Address</h3>
            <div className='text-white/80 font-light leading-relaxed'>
              Kolkata<br/>
              West Bengal
            </div>
          </div>

          <div className='w-full h-px bg-white/20 mb-10 -mx-8 border-t border-white/20' style={{ width: 'calc(100% + 64px)' }}></div>

          <div className='flex-1'></div>

          <div className='flex justify-between items-start mb-6'>
            <div>
              <div className='text-sm text-white/60 mb-6'>Sitemap</div>
            </div>

            <div className='flex gap-12'>
              <div className='flex flex-col gap-3 text-xs text-white/80'>
                <div className='font-medium'>WORK</div>
                <div className='font-medium'>PROJECTS</div>
                <div className='font-medium'>ABOUT</div>
              </div>
            </div>

            <div className='flex flex-col gap-3 text-xs text-white/80'>
              <div className='font-medium'>LINKEDIN</div>
              <div className='font-medium'>INSTAGRAM</div>
              <div className='font-medium'>YOUTUBE</div>
            </div>
          </div>

          <div>
            <div className='w-full h-px bg-white/20 mb-3 -mx-8 border-t border-white/20' style={{ width: 'calc(100% + 64px)' }}></div>
            <div className='flex justify-between items-center pt-4 text-white/50 text-sm'>
              <div>Copyright © WMV Media LTD. 2025</div>
              <div>film ⟷ design / space</div>
            </div>
          </div>

        </div>

        <div className='flex lg:hidden flex-col backdrop-blur-2xl bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] p-8 pb-0 md:p-5 md:pb-4 py-6 sm:py-8'>

          <div className='flex flex-row justify-items-start gap-6 sm:gap-8 mb-2 sm:mb-4'>
            <div>
              <h3 className='text-white/60 text-base sm:text-lg mb-3'>Reach out</h3>
              <div className='text-white text-lg sm:text-xl font-light'>
                taurisStudio@mail
                <span className='ml-2'>↗</span>
              </div>
            </div>

            <div>
              <h3 className='text-white/60 text-base sm:text-lg mb-3'>Address</h3>
              <div className='text-white/80 font-light leading-relaxed text-sm sm:text-base'>
                Kolkata, 
                West Bengal
              </div>
            </div>
          </div>

          <div className='w-full h-px bg-white/20 mb-2 sm:mb-4 -mx-4 sm:-mx-8 border-t border-white/20' style={{ width: 'calc(100% + 32px)' }}></div>

          <div className='space-y-4 sm:space-y-6 md:space-y-4'>
            <div>
              <div className='text-sm text-white/60 mb-4'>Sitemap</div>
            </div>

            <div className='flex flex-col xs:flex-row gap-4 xs:gap-4 sm:gap-6'>
              <div className='flex flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-white/80'>
                <div className='font-medium'>WORK</div>
                <div className='font-medium'>PROJECTS</div>
                <div className='font-medium'>ABOUT</div>
              </div>
              
              <div className='flex flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-white/80'>
                <div className='font-medium'>LINKEDIN</div>
                <div className='font-medium'>INSTAGRAM</div>
                <div className='font-medium'>YOUTUBE</div>
              </div>
            </div>
          </div>

          <div className='mt-6 sm:mt-8 md:mt-4'>
            <div className='w-full h-px bg-white/20 -mx-4 sm:-mx-8 border-t border-white/20' style={{ width: 'calc(100% + 32px)' }}></div>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 pt-4 sm:pt-6 text-white/50 text-xs sm:text-sm'>
              <div>Copyright © WMV Media LTD. 2025</div>
              <div>film ⟷ design / space</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
