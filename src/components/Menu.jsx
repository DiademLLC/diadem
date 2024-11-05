import Card from './reuseables/Card'
import { useState, useEffect } from 'react'
import { useMenu } from '../context/MenuContext'

const categories = [
    { name: 'all', id: 1 },
    { name: 'rice', id: 2 },
    { name: 'soup', id: 3 },
    { name: 'snack', id: 4 },
    { name: 'swallow', id: 5 },
    { name: 'drink', id: 6 },
    { name: 'protein', id: 7 },
    { name: 'others', id: 8 },
]


const Menu = () => {
    const { menuItems, loading } = useMenu()
    const [activeBtn, setActiveBtn] = useState(1);
    const [foods, setFoods] = useState([])
    const [itemsToShow, setItemsToShow] = useState(window.innerWidth >= 1024 ? 8 : 4);

    useEffect(() => {
        if (!loading) {
            // Set foods to menuItems after loading is complete
            setFoods(menuItems);
        }
    }, [menuItems, loading]);

    const handleChangeCategory = (id) => {
        setActiveBtn(id)
        const category = categories.find((category) => category.id === parseInt(id))
        const categoryName = category.name;

        if (categoryName === 'all') {
            setFoods(menuItems);
        } else {
            const checkCategoryInMenu = menuItems.filter((menu) => menu.category === categoryName);
            setFoods(checkCategoryInMenu);
        }
    
        setItemsToShow(window.innerWidth >= 1024 ? 8 : 4);
    }
    const handleLoadMore = () => {
        const isDesktop = window.innerWidth >= 1024;
    
        // Increment the number of items to show based on screen size
        setItemsToShow((prevCount) => prevCount + (isDesktop ? 8 : 4));
    };    

    if (loading) {
        return <div className="flex justify-center items-center ">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
    </div>; 
    }

    return (
        <section id='menu' className='bg-gradient-to-t from-gray-200 to-gray-100 p-5 xl:p-10'>
            <div className='space-y-10 max-w-[1440px] mx-auto'>
                <div className='space-y-6'>
                    <h2 className='heading text-3xl lg:text-4xl text-[#4F4F4F]'><span className=' text-red-600'>Food</span> Categories</h2>

                    <div className="md:hidden">
                        <select
                            value={activeBtn}
                            onChange={(e) => handleChangeCategory(e.target.value)}
                            className="w-full p-2 border rounded shadow-md category bg-white uppercase"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons for larger screens */}
                    <div className="hidden md:flex gap-2 justify-between category">
                        {categories.map((category) => (
                            <button
                                onClick={() => handleChangeCategory(category.id)}
                                key={category.id}
                                className={`${activeBtn === category.id ? 'bg-black/80 text-red-500' : 'bg-white text-[#4F4F4F]'
                                    } capitalize shadow-xl p-2`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='space-y-6'>
                    <h2 className='heading text-3xl lg:text-4xl text-center text-[#4F4F4F]'>Today's <span className=' text-red-600'>Menu</span></h2>

                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8 justify-center'>
                        {foods.slice(0, itemsToShow).map((menu, index) => {
                            return <Card key={index} product={menu} cardType={'menu'} />;
                        })}
                    </div>

                    {/* Only show "Load More" btn if there are more items to display */}
                    <div className='text-center'>
                        {itemsToShow < foods.length && (
                            <button onClick={handleLoadMore} className="mt-3 px-4 py-2 bg-orange-600/80 text-white rounded-lg">
                                Load More
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu