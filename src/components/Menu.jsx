import Card from './reuseables/Card'
import { useState } from 'react'

const categories = [
    { name: 'all', id: 1 },
    { name: 'rice', id: 2 },
    { name: 'soups', id: 3 },
    { name: 'snacks', id: 4 },
    { name: 'swallow', id: 5 },
    { name: 'combo', id: 6 },
]

const menus = [
    { id: 1, name: 'Fries', image: '', stars: 5, price: 10, category: 'rice' },
    { id: 2, name: 'Sauce', image: '', stars: 3, price: 40, category: 'rice' },
    { id: 3, name: 'Snack', image: '', stars: 5, price: 60, category: 'soups' },
    { id: 4, name: 'Platter', image: '', stars: 4, price: 70, category: 'soups' },
    { id: 5, name: 'Fries', image: '', stars: 5, price: 10, category: 'snacks' },
    { id: 6, name: 'Sauce', image: '', stars: 3, price: 40, category: 'snacks' },
    { id: 7, name: 'Snack', image: '', stars: 5, price: 60, category: 'swallow' },
    { id: 8, name: 'Platter', image: '', stars: 4, price: 70, category: 'combo' },
]

const Menu = () => {
    const [activeBtn, setActiveBtn] = useState(1);
    const [foods, setFoods] = useState(menus)
    const [itemsToShow, setItemsToShow] = useState(window.innerWidth >= 1024 ? 8 : 4);

    const handleChangeCategory = (id) => {
        setActiveBtn(id)
        const category = categories.find((category) => category.id === parseInt(id))
        const categoryName = category.name;

        if (categoryName === 'all') {
            setFoods(menus);
        } else {
            const checkCategoryInMenu = menus.filter((menu) => menu.category === categoryName);
            setFoods(checkCategoryInMenu);
        }
    
        setItemsToShow(window.innerWidth >= 1024 ? 8 : 4);
    }
    const handleLoadMore = () => {
        const isDesktop = window.innerWidth >= 1024;
    
        // Increment the number of items to show based on screen size
        setItemsToShow((prevCount) => prevCount + (isDesktop ? 8 : 4));
    };    

    return (
        <section id='menu' className='bg-gradient-to-t from-gray-200 to-gray-100 p-5 xl:p-10'>
            <div className='space-y-10 max-w-[1440px] mx-auto'>
                <div className='space-y-6'>
                    <h2 className='heading text-3xl lg:text-4xl'>Food Categories</h2>

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
                                className={`${activeBtn === category.id ? 'bg-orange-500/80 text-white ' : 'bg-white text-black'
                                    } capitalize shadow-xl p-2`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='space-y-6'>
                    <h2 className='heading text-3xl lg:text-4xl text-center'>Today's Menu</h2>

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