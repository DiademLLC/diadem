import { ModalContext } from "../../context/ModalContext"
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";

const Modal = () => {
    const { closeModal, isModalOpen, modalContent } = useContext(ModalContext)
    const { addItemToCart, isLoading, cartItems, updateItemQuantity, openCart, cart } = useContext(CartContext);

    // Function to handle click outside the modal
    const handleOverlayClick = (e) => {
        // Check if the click is outside the modal content
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    const handleItem = (priceId, change) => {
        const priceObject = modalContent.prices.find((item) => item._id === priceId);

        const cartItem = cartItems.find(
            (item) => item.type === priceObject.name && item._id === modalContent._id
        );

        if (!cartItem && change === 1) {
            // return console.log('does not exists')
            return addItemToCart(modalContent, 1, priceId);
        };

        const currentQuantity = cartItem.quantity
        const currentType = cartItem.type

        updateItemQuantity(cartItem._id, currentType, (currentQuantity + change))
    }

    const handleOpenCart = () => {
        closeModal()
        openCart()
    }

    useEffect(() => {
        if (isModalOpen || cart) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen, cart])


    return (
        <div>{isModalOpen &&
            <div onClick={handleOverlayClick} className="bg-black/60 h-full w-full fixed top-0 left-0 z-40 flex justify-center items-end md:items-center modal-overlay">
                <div className="bg-white  md:rounded-2xl w-full md:max-w-[500px] md:w-[500px] p-5 space-y-5">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl">Please select a variation</h3>
                        <button onClick={closeModal}>
                            <FaXmark className="text-2xl text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {modalContent.prices.map((price, index) => {

                            const cartItem = cartItems.find(item => item.type === price.name && item._id === modalContent._id);

                            const currentQuantity = cartItem ? cartItem.quantity : 0;
                            console.log('price;', price)

                            return (
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <h3>{price.name}</h3>
                                        <p>${price.price}</p>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div
                                            onClick={() => handleItem(price._id, - 1)}
                                            className="w-8 h-8 bg-orange-300 rounded flex items-center justify-center text-white cursor-pointer">
                                            <FaMinus />
                                        </div>
                                        {isLoading ? <p>...</p> : <p>{currentQuantity}</p>}
                                        <div
                                            onClick={() => handleItem(price._id, + 1)}
                                            className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white cursor-pointer"
                                        >
                                            <FaPlus />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-2 uppercase">
                        <button
                            onClick={handleOpenCart}
                            className="w-full bg-orange-400 text-white rounded py-2 uppercase font-medium"
                        >
                            View cart and checkout
                        </button>
                        <button
                            onClick={closeModal}
                            className="w-full border border-orange-400 text-orange-400 rounded py-2 uppercase font-medium"
                        >
                            Continue shopping
                        </button>
                    </div>
                </div>
            </div>
        }</div>
    )
}

export default Modal