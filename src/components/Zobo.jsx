import React from 'react'

const Zobo = () => {
  return (
    <section className=' bg-[#B71058]'>
        <div className='flex flex-col lg:flex-row relative max-w-[1440px] mx-auto'>
            <div className='flex relative lg:w-[55%]'>
                <img className='relative z-0 w-full  object-contain' src="/images/zobo-image.png" alt="zobo image" />
            </div>

            <div className='lg:w-[45%] bg-[#B71058]/60 h-full text-white absolute lg:relative inset-0 flex items-center lg:items-start justify-center'>
                <div className='hidden lg:block absolute top-40 left-14 w-[50%] h-[40%]'>
                    <img className='' src="/images/strawberry-image.png" alt="" />
                </div>

                <div className='relative lg:absolute lg:-left-32 z-10 flex flex-col justify-center lg:justify-between space-y-2 lg:space-y-8 h-full lg:py-28 p-4 lg:p-0'>
                    <h2 className='text-center lg:text-start text-4xl md:text-6xl xl:text-8xl font-bold zobo-font'>DIADEM FRUITY <br/> ZOBO</h2>

                    <div className='space-y-5 lg:space-y-10'>
                        <div className='space-y-2 max-w-[700px] lg:max-w-[600px]'>
                            <p className='xl:text-xl'>
                                Discover the Rich Flavors of Zobo! <br />
                                Experience the authentic taste of Africa with our refreshing Zobo drink. Made from natural hibiscus leaves, our Zobo is packed with bold flavors, vibrant colors, and a burst of health benefits. Whether you enjoy it chilled or with a twist of ginger or pineapple, every sip brings you closer to the heart of African tradition. Taste the difference. Feel the freshness.
                            </p>

                            <div className='flex flex-wrap gap-2 uppercase'>
                                <div className='bg-transparent border border-white px-3 lg:px-6 py-2 rounded-full'> 1 Litre </div>
                                <div className='bg-transparent border border-white px-3 lg:px-6 py-2 rounded-full'> alc 0% </div>
                                <div className='bg-transparent border border-white px-3 lg:px-6 py-2 rounded-full'> 100% natural </div>
                            </div>
                        </div>

                        <div className='flex flex-wrap gap-2 lg:gap-5'>
                            <button className='bg-white text-[#5E3C33] px-3 lg:px-5 py-1 lg:py-3 rounded-full text-2xl font-semibold uppercase'>order now</button>
                            <button className='bg-transparent border border-white text-white px-3 lg:px-5 py-1 lg:py-3 rounded-full text-2xl font-semibold uppercase'>add to cart</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default Zobo