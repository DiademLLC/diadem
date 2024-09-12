import { FaStar } from "react-icons/fa"
import { ModalContext } from "../../context/ModalContext"
import { useContext } from "react";
import { FaPlus } from "react-icons/fa";

const Card = ({product, cardType}) => {
    const {openModal} = useContext(ModalContext);

    const handleOpenModal= () => {
        openModal(product.id)
    }
  return (
    <div className='bg-white rounded-[10px]  flex-grow flex flex-col overflow-hidden shadow-lg'>
        <div className="">
            <img className="w-full object-cover" src="/images/pic.png" alt="" />
        </div>

        <div className={`${cardType === 'menu' && 'bg-white'} p-3`}>
            <h3 className={` text-2xl`}>{product.name}</h3>
            {/* <div className="flex items-center gap-2">
                {Array.from({ length: product.stars }).map((_, i) => {
                    return <FaStar key={i} className="text-orange-400 text-xl" />
                })}

                {cardType === 'popular' && <p>4.5(140)</p>}
            </div> */}
            <p className='text-xs'>descriptive text about this particular food</p>

            <div className="flex items-center justify-between mt-1">
                {/* <p className="pricing">${product.price}</p> */}
                {/* <button onClick={handleOpenModal} className="bg-black/80 text-white px-2 py-1 capitalize rounded-md">add to cart</button> */}
                <button onClick={handleOpenModal} className="bg-orange-600/80 w-6 h-6 text-white p-2 capitalize rounded-full flex justify-center items-center">
                    <FaPlus className='' />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Card