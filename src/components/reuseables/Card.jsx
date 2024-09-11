import { FaStar } from "react-icons/fa"
import { ModalContext } from "../../context/ModalContext"
import { useContext } from "react";

const Card = ({product, cardType}) => {
    const {openModal} = useContext(ModalContext);

    const handleOpenModal= () => {
        openModal(product.id)
    }
  return (
    <div className='bg-[#C6312B] rounded-[10px] border border-[#FED1CD] flex-grow flex flex-col overflow-hidden shadow-lg'>
        <div className="p-3">
            <img className="w-full object-cover" src="/images/fries1.png" alt="" />
        </div>

        <div className={`${cardType === 'menu' && 'bg-white'} px-3 pb-3`}>
            <h3 className={`${cardType === 'menu' ? 'text-black' : 'text-white'} text-2xl`}>{product.name}</h3>
            {/* <div className="flex items-center gap-2">
                {Array.from({ length: product.stars }).map((_, i) => {
                    return <FaStar key={i} className="text-orange-400 text-xl" />
                })}

                {cardType === 'popular' && <p>4.5(140)</p>}
            </div> */}

            <div className="flex items-center justify-between mt-1">
                {/* <p className="pricing">${product.price}</p> */}
                <button onClick={handleOpenModal} className="bg-black/80 text-white px-2 py-1 capitalize rounded-md">add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default Card