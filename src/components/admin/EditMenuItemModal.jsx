import { useState } from 'react'
import axios from 'axios';
import { FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const EditMenuItemModal = ({ menuItem, closeModal, fetchApi }) => {
    const priceOptions = [
        'Plate',
        'Small Tray',
        'Medium Tray',
        'Large Tray',
        'Small Cooler',
        'Large Cooler',
    ];

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(() => {

        const prices = priceOptions.map(option => {
            const foundPrice = menuItem.prices.find(p => p.name === option)
            return {name: option, price: foundPrice ? foundPrice.price : ''};
        });

        return{
            ...menuItem,
            image: null,
            existingImage: menuItem.image,
            prices
        }
    });

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const filledPrices = formData.prices.filter((priceOption) => priceOption.price);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        filledPrices.forEach((priceObj, index) => {
            data.append(`prices[${index}][name]`, priceObj.name);
            data.append(`prices[${index}][price]`, priceObj.price);
          });

        if (formData.image) {
            data.append('image', formData.image);
        } else {
            data.append('existingImage', formData.existingImage);
        }

        const token = localStorage.getItem('authToken');

        try {        
            const response = await axios.put(`https://diadem-backend.vercel.app/admin/edit-item/${formData._id}`, data, {headers: { Authorization: `Bearer ${token}` }});
            
            if(response.data.success){
                await fetchApi();
                toast.success('Item edited successfully');
                closeModal();
            }
        } catch (error) {
            toast.error('Error saving edited item, please try again!')
            // console.error(err);
        } finally {
            setIsLoading(false)
        }
    }

     // Handle input change
     const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle price changes
    const handlePriceChange = (index, e) => {
        const { value } = e.target;
        const updatedPrices = formData.prices.map((priceOption, i) =>
            i === index ? { ...priceOption, price: value } : priceOption
        );
        setFormData({ ...formData, prices: updatedPrices });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    }


    return (
        <div className='fixed top-0 inset-0 z-10'>
            <div className='bg-black/70 h-full w-full flex justify-center items-center'>
                <div className='space-y-3'>
                    <div className='flex justify-end'>
                        <button onClick={closeModal} className='bg-white w-12 h-12 rounded-full flex justify-center items-center'>
                            <FaXmark className='text-2xl' />
                        </button>
                    </div>

                    <div className='bg-white h-full p-5 rounded-2xl max-w-max relative z-20'>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col'>
                                    <label htmlFor="image">Image:</label>
                                    <input onChange={handleImageChange} className='p-1 border rounded-lg border-green-600' type="file" name="image" id="image" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="name">Item name:</label>
                                    <input onChange={handleInputChange} value={formData.name} className='p-1 border rounded-lg border-green-600' type="text" name="name" id="name" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="category">Category:</label>
                                    <select
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className='border p-2 border-green-600 rounded-lg'
                                        required
                                    >
                                        <option value="soup">Soup</option>
                                        <option value="rice">Rice</option>
                                        <option value="swallow">Swallow</option>
                                        <option value="snack">Snack</option>
                                        <option value="drink">Drink</option>
                                    </select>
                                </div>

                                {formData.prices.map((priceOption, index) => (
                                    <div key={index} className="price-option py-1">
                                        <span>{priceOption.name}: </span>$ {}
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder={`Enter price for ${priceOption.name}`}
                                            value={priceOption.price}
                                            onChange={(e) => handlePriceChange(index, e)}
                                            className='border p-1 border-green-600 rounded-lg'
                                        />
                                    </div>
                                ))}

                                <div className='mt-4'>
                                    <button className='bg-green-700 text-white w-full py-1 rounded-xl'>
                                        {isLoading ? <p>Saving...</p> : <p>Save changes</p>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditMenuItemModal