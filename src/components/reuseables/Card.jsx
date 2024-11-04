import { FaStar } from "react-icons/fa"
import { ModalContext } from "../../context/ModalContext"
import { useContext } from "react";
import { FaPlus } from "react-icons/fa";

const Card = ({ product, cardType }) => {
    const { openModal } = useContext(ModalContext);

    const handleOpenModal = () => {
        openModal(product._id)
    }
    return (
        <div className='bg-white rounded-[10px]  flex-grow flex flex-col overflow-hidden shadow-lg'>
            <div className="">
                <img className="w-full h-44 object-cover" src={product.image} alt="" /> {/*adjust height for img card*/}
            </div>

            <div className={`${cardType === 'menu' && 'bg-white'} p-3`}>
                <h3 className={`text-sm md:text-2xl capitalize`}>{product.name}</h3>

                <div className="flex items-center justify-between mt-2">
                    <button onClick={handleOpenModal} className="bg-orange-600/80 w-6 h-6 text-white p-2 capitalize rounded-full flex justify-center items-center">
                        <FaPlus className='' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card