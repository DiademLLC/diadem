const HomeHero = () => {
  return (
    <section className='py-[54.5] max-w-[1440px] mx-auto'>
        <div className='lg:bg-[#f8b1aa] overflow-hidden h-full lg:h-[654px] flex flex-col lg:flex-row justify-between lg:m-5 xl:m-14 rounded-[20px] lg:border lg:border-black relative lg:shadow-xl'>
            <div className='flex flex-col justify-center lg:ml-5 p-5'>
                <div className='space-y-4 lg:space-y-10'>
                    <h1 className=' font-bold whitespace-nowrap'>
                        Welcome 
                        to <br className='hidden xl:block' /> 
                        <br className='block xl:hidden' />
                        <span className='text-red-700'>
                            Diadem foods
                        </span>
                    </h1>

                    <p className='font-normal text-xl md:text-3xl'>“It’s not just food, it’s an experience” </p>

                    <button className='bg-[#CB3530] bg-gradient-to-br via-[#c46002] hover:via-black/80 from-[#CB3530] lg:to-[#CB3530] to-black px-3 md:px-5 py-1 md:py-2 rounded-[10px] text-white text-2xl'>Shop now</button>
                </div>
                
            </div>

            <div className='hidden lg:block xl:absolute bottom-0 lg:right-0'>
                <img className='h-full w-full object-cover' src="/images/hero-img1.png" alt="" />
            </div>
        </div>
    </section>
  )
}

export default HomeHero