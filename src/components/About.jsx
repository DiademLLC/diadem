import React from 'react'

const About = () => {
  return (
    <section>
        <div className='flex flex-col lg:flex-row items-center pt-14 md:pt-20 lg:py-32'>
            <div className='w-[100%] lg:w-[50%] p-4 lg:p-10 space-y-4 max-w-[650px]'>
                <h2 className='text-3xl md:text-5xl text-center font-semibold xl:mb-8 text-orange-600'>About Us</h2>
                <p className='text-base md:text-2xl font-semibold'>
                  Welcome to DiademFoods
                </p>
                <p className='text-base md:text-xl font-medium'>
                  A Vibrant Nigerian food outlet located in Chicago, IL that was established out of passion for fresh nutritous and delicious foods. Specializing in a unique blend of natural flavors, our menu includes authentic Nigerian dishes and a variety of natural, healthy drinks.
                </p>
                <p className='text-base md:text-xl font-medium'>
                  We offer catering services for events and special occasions, also accept online orders and delivery. <br />
                  Discover the native natural taste in all our meals!                   
                </p>
                <p className='text-base md:text-2xl font-medium text-orange-600'>Diadems is not just the food, its an experience....</p>
            </div>

            <div className='w-[100%] lg:w-[45%] h-[500px] md:h-[750px] '>
                <img className='h-full w-full object-cover' src="/images/about.webp" alt="CEO Diadems foods" />
            </div>
        </div>
    </section>
  )
}

export default About