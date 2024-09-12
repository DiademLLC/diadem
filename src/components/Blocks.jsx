import React from 'react'

const Blocks = () => {
  return (
    <section className='h-full  overflow-hidden bg-gray-100 py-10'>
        <div className='flex gap-1 max-w-[1440px] mx-auto'>
            <div className='relative w-1/2'>
                <img className='object-cover w-full f-full' src="/images/rice1.png" alt="" />
                <div className="bg-[rgba(0,0,0,0.4)] w-full h-full absolute top-0 inset-0 z-10 "></div>

                <div className='absolute inset-0 flex flex-col justify-start p-4 sm:p-8 md:p-14  z-20 text-white sm:space-y-2 md:space-y-5'>
                    <h2 className='text-bold text-xl md:text-4xl lg:text-5xl'>JOLLOF RICE </h2>
                    <span className='text-medium  md:text-2xl lg:text-3xl'>TURKEY/PLANTAIN</span>

                    <div className='flex'>
                        <button className='bg-[#81234c] px-2 md:px-4 py-2 rounded-full'>DIADEM SPECIAL</button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-1/2 gap-1'>
                <div className='flex gap-1'>
                    <div className='relative w-1/2 '>
                        <img className='relative w-full h-full object-cover' src="/images/zobo-small.png" alt="zobo image" />
                    </div>
                    <div className='relative w-1/2'>
                        <img className='object-cover w-full f-full' src="/images/ayamase-small.png" alt="" />
                    </div>
                </div>
                <div className='relative h-full'>
                    <img className='object-cover w-full h-full' src="/images/block4.png" alt="" />
                    <div className="bg-[rgba(0,0,0,0.4)] w-full h-full absolute top-0 inset-0 z-10 "></div>
                    <div className='absolute inset-0 flex flex-col justify-center items-center z-20 text-white'>
                        <h2 className='text-semibold text-lg md:text-3xl'>ORDER </h2>
                        <span className='text-bold text-lg md:text-4xl -mt-2 sm:-mt-0'>ONLINE</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Blocks