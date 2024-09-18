import {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import Cart from './Cart'
import {AnimatePresence, motion, MotionConfig} from 'framer-motion'
import { IoMdCart } from 'react-icons/io'

const navLinks = [
    {name: 'Home', link: '/'},
    {name: 'About', link: '/about'},
    {name: 'Menu', link: '/#menu'},
    {name: 'Shop', link: '/'},
    {name: 'Contact', link: '/'},
]
const Navbar = () => {
    const {cart, openCart, closeCart, cartItems} = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false)
    const menuVariants = {
        initial: {
            scaleY: 0
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.4,
                ease: [0.112, 0, 0.39, 0]
            }
        },
        exit: {
            scaleY: 0,
            transition: {
                delay: 0.5,
                duration: 0.4,
                ease: [0.112, 0, 0.39, 1]
            }
        }
    }

    const containerVariants = {
        initial: {
            transition: {
                staggerChildren: 0.09,
                staggerDirection: -1
            }
        },
        open: {
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.09,
                staggerDirection: 1
            }
        },
    }

    const linkVariants = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.3,
                ease: [0.37, 0, 0.63, 1]
            }
        },
        open: {           
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0, 0.55, 0.45, 1]
            }
        }
    }

    useEffect(() => {
        if (isOpen || cart) {
          document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
          document.body.style.overflow = 'auto'; // Enable scrolling
        }
    
        // Cleanup function to reset overflow when component unmounts
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isOpen, cart]);

    // Function to handle click outside the cart
    const handleOverlayClick = (e) => {
        // Check if the click is outside the cart content
        if (e.target.classList.contains('cart-overlay')) {
            closeCart();
        }
    };

    return (
        <header className=' relative bg-orange-600/90 z-50'>
            <div className='max-w-[1440px] mx-auto'>
                <nav className='flex sticky items-center justify-between h-14 lg:h-[80px] xl:h-[90px] mx-5 lg:mx-10'> {/*mx-24*/}
                    <div className='h-10 w-10 lg:h-20 lg:w-20'>
                        <img className='h-full w-full object-cover' src="/images/logo.png" alt="diadem logo" />
                    </div>

                    <div className='hidden lg:flex gap-10 text-white'>
                        {navLinks.map((link, index) => {
                            return (
                                <Link 
                                    className='text-xl font-medium'
                                    to={link.link} 
                                    key={index}>
                                        {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    <button className='hidden lg:block relative' onClick={openCart}>
                        <IoMdCart className='text-4xl text-white' />
                        {cartItems.length > 0 && 
                            <p className="absolute -right-[0.85rem] -top-[0.45rem] text-[0.8rem] font-medium bg-white text-black w-4 h-4 rounded-full">
                                {cartItems.reduce((acc,item)=> acc + item.quantity, 0)}
                            </p>
                        }
                    </button>

                    <div className='flex items-center lg:hidden gap-4 '>
                        <button className='relative' onClick={openCart}>
                            <IoMdCart className='text-3xl text-white' />
                            {cartItems.length > 0 && 
                                <p className="flex items-center justify-center absolute -right-[0.85rem] -top-[0.35rem] text-[0.8rem] font-medium bg-white text-black w-4 h-4 rounded-full">
                                {cartItems.reduce((acc,item)=> acc + item.quantity, 0)}
                                </p>
                            }
                        </button>

                        <div className="flex items-center lg:hidden">
                            <MotionConfig 
                                transition={{
                                    duration: 0.5,
                                    ease:'easeInOut'
                                }}
                            >
                                <motion.button
                                    onClick={() =>  setIsOpen((prevIsOpen) => !prevIsOpen) }
                                    initial= {false}
                                    animate={ isOpen ? 'open' : 'closed' }
                                    className="h-10 w-10 rounded-full bg-white/0 transition-colors hover:bg-white/20">
                                    <motion.span 
                                        variants={{
                                            open: {
                                                rotate: ["0deg", "0deg", "45deg"],
                                                top: ["35%", "50%", "50%"],
                                            },
                                            closed: {
                                                rotate: ["45deg", "0deg", "0deg"],
                                                top: ["50%", "50%", "35%"]
                                            }
                                        }}
                                        style={{
                                            top: "35%",
                                            x: "-50%",
                                            y: "-50%"
                                        }}
                                        className="absolute h-1 w-8 bg-white"></motion.span>

                                    <motion.span 
                                        variants={{
                                            open: {
                                                rotate: ["0deg", "0deg", "-45deg"],
                                            },
                                            closed: {
                                                rotate: ["-45deg", "0deg", "0deg"],
                                            }
                                        }}
                                        style={{
                                            top: "50%",
                                            x: "-50%",
                                            y: "-50%"
                                        }}
                                        className="absolute h-1 w-8 bg-white">
                                    </motion.span>
                                    
                                    <motion.span 
                                        variants={{
                                            open: {
                                                rotate: ["0deg", "0deg", "45deg"],
                                                bottom: ["35%", "50%", "50%"],
                                                x: ["0%", "-50%"]
                                            },
                                            closed: {
                                                rotate: ["45deg", "0deg", "0deg"],
                                                bottom: ["50%", "50%", "35%"],
                                                x: ["-50%", "0%"]
                                            }
                                        }}

                                        style={{
                                            bottom: "35%",
                                            x: "0%",
                                            y: "50%"
                                        }}
                                        className="absolute h-1 w-4 bg-white"></motion.span>
                                </motion.button>
                            </MotionConfig>
                        </div>
                    </div>
                </nav>
            </div>

            <AnimatePresence >
                {isOpen && 
                    <motion.div 
                        variants= {menuVariants}
                        initial= "initial"
                        animate= "animate"
                        exit= "exit"
                        className="fixed z-50 left-0 right-0 bg-gray-50 text-black h-screen origin-top lg:hidden">
                        <div className="flex w-full justify-center h-full">
                            <motion.div 
                                variants={containerVariants}
                                initial= "initial"
                                animate= 'open'
                                exit="initial"
                                className="flex flex-col gap-4 items-center justify-center h-full mobile-nav text-4xl ">
                                    {navLinks.map((link, index) => (
                                        <div 
                                            onClick={() =>  setIsOpen((prevIsOpen) => !prevIsOpen) }
                                            key={index} 
                                            className="overflow-hidden py-2"
                                        >
                                            <motion.div 
                                                variants={linkVariants}                              
                                                >
                                                    <Link to={link.link}>{link.name}</Link>
                                            </motion.div>
                                        </div>
                                    ))}
                            </motion.div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

            {cart && <div onClick={handleOverlayClick} className="bg-[rgba(0,0,0,0.6)] w-full h-screen fixed top-0 inset-0 z-50 cart-overlay"></div>}

            <div className={`max-w-[350px] h-full z-50 fixed right-0 top-0 w-full transform transition-transform duration-700 delay-100 ease-in-out ${cart ? 'translate-x-0' : 'translate-x-full'}`}>
                <Cart />
            </div>
            
            
        </header>
    )
}

export default Navbar