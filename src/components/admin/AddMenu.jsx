import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useAdmin } from '../../context/AdminContext';

function AddMenu() {
    const { fetchApi } = useAdmin()
    const priceOptions = [
        { name: 'Plate', price: '' },
        { name: 'Small Tray', price: '' },
        { name: 'Medium Tray', price: '' },
        { name: 'Large Tray', price: '' },
        { name: 'Small Cooler', price: '' },
        { name: 'Large Cooler', price: '' },
    ];

    const [formData, setFormData] = useState({
        name: '',
        prices: priceOptions,
        category: '',
        image: null, // Image will be stored here
    });
    const [isLoading, setIsLoading] = useState(false)

    // Handle price changes
    const handlePriceChange = (index, e) => {
        const { value } = e.target;
        const updatedPrices = formData.prices.map((priceOption, i) =>
            i === index ? { ...priceOption, price: value } : priceOption
        );
        setFormData({ ...formData, prices: updatedPrices });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        // Filter out any price option that hasn't been filled in
        const filledPrices = formData.prices.filter((priceOption) => priceOption.price);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('prices', JSON.stringify(filledPrices)); // Add prices as a stringified array
        data.append('image', formData.image); // Append the image file

        try {
            const response = await axios.post('https://diadem-backend.vercel.app/admin/add-item', data, { withCredentials: true });
            console.log(response.data);
            toast.success('uploaded item successfully')

            // Reset form to initial state after adding item
            setFormData({
                name: '',
                prices: priceOptions, // Reset prices as well
                category: '',
                image: null,
            });
            fetchApi()
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <section>
            <div className='mx-5 md:mx-20 my-20'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Name of item:</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className='border p-2'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="category">Item category:</label>
                        <select
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className='border p-2'
                            required
                        >
                            <option value="soup">Soup</option>
                            <option value="rice">Rice</option>
                            <option value="swallow">Swallow</option>
                            <option value="snack">Snack</option>
                            <option value="drink">Drink</option>
                        </select>
                    </div>

                    <div>
                        <label>Prices:</label>
                        {formData.prices.map((priceOption, index) => (
                            <div key={index} className="price-option py-1">
                                <span>{priceOption.name}: </span>$
                                <input
                                    type="number"
                                    name="price"
                                    placeholder={`Enter price for ${priceOption.name}`}
                                    value={priceOption.price}
                                    onChange={(e) => handlePriceChange(index, e)}
                                    className='border p-1'
                                />
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="file">Upload image of the item:</label>
                        <input className='border p-2' type="file" onChange={handleFileChange} />
                    </div>

                    <div className='text-center'>
                        <button className='bg-orange-600 text-white w-44 py-2 rounded-lg' type="submit">
                            {isLoading ? <p>Adding... Please wait</p> : <p>Add Item</p>}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AddMenu