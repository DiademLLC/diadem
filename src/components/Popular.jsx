import { useMenu } from '../context/MenuContext';
import Card from './reuseables/Card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer z-10"
  >
    <FaArrowRight size={20} />
  </div>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer z-10"
  >
    <FaArrowLeft size={20} />
  </div>
);

const Popular = () => {
  const { menuItems, loading } = useMenu()

  if (loading) {
    return <div className="flex justify-center items-center ">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
    </div>; 
  }
  const popular = menuItems.slice(0, 4);
  // console.log('popular:', popular1)
  const settings = {
    nav: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-t from-gray-100 to-gray-50 px-5 py-10 lg:px-24 lg:py-20">
      <div className="space-y-6 max-w-[1440px] mx-auto">
        {/* <h2 className="heading text-3xl lg:text-5xl">Our Popular Dishes</h2> */}

        {/* Slider Component */}
        <Slider {...settings} >
          {popular.map((product, index) => (
            <div key={index} className="flex-grow px-2"> {/* Flex Basis for full width */}
              <Card product={product} cardType={'popular'} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Popular