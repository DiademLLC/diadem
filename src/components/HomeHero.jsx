import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';

const slideVariants = {
    hidden: { opacity: 1, scale: 1.2 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeInOut" } },
    exit: { opacity: 1, scale: 1.1, transition: { duration: 0.8, ease: "easeInOut" } }
};

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 1, ease: "easeInOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }
};

const carousel = [
    'SAUSAGE ROLL.webp',
    'JOLLOF RICE.webp'
]

const HomeHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Automatically advance slides after a certain duration
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === carousel.length - 1 ? 0 : prevSlide + 1
            );
        }, 8000); // 5-second interval
        return () => clearInterval(interval); // Clear interval on unmount
    }, [carousel.length]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        fade: true,
        arrows: false,
    };

    return (
        <section className="h-screen overflow-hidden ">
            <Slider {...settings}>
                <AnimatePresence mode="wait">
                    {carousel.map((img, i) => (
                        i === currentSlide && (
                            <motion.div
                                key={i} // Unique key for re-render and animation
                                className="h-screen relative"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={slideVariants}
                            >
                                <div className="absolute inset-0 -z-10 h-screen bg-black/60"></div>

                                <motion.img
                                    key={`img-${i}`}
                                    className="absolute top-0 -z-20 w-full h-screen object-cover"
                                    src={`/images/${img}`}
                                    alt=""
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={slideVariants}
                                    transition={{ duration: 5, ease: "easeOut" }}
                                />

                                <motion.div
                                    key={`text-${i}`}
                                    className="flex flex-col items-center justify-center h-full space-y-8"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={textVariants}
                                >
                                    <div>
                                        <h1 className="text-6xl lg:text-8xl text-white font-bold mt-20 text-center">
                                            Welcome to <br /> <span className="text-red-600">Diadem Foods</span>
                                        </h1>
                                        <p className="font-normal text-white text-center text-lg pb-3">
                                            “It’s not just food, it’s an experience”
                                        </p>
                                    </div>

                                    <motion.a
                                        href='#menu'
                                        className="bg-red-700 hover:bg-red-900 text-white font-semibold px-6 py-2 rounded text-sm"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={textVariants}
                                    >
                                        SHOP NOW
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

            </Slider>
        </section>
    )
}

export default HomeHero