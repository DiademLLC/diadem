import { useContext, useState, useEffect, createContext } from "react";

export const ModalContext = createContext();

// export const useModal = () => useContext(ModalContext)

const menus = [
    {
        id: 1,
        name: 'Fries',
        image: 'fries1.png',
        stars: 5,
        prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
        ],
        category: 'category 1'
    },
    {
        id: 2, name: 'Sauce', image: 'fries1.png', stars: 3,
        prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
            { id: 5, name: 'small cooler', price: 50 },
            { id: 6, name: 'large cooler', price: 80 }
        ], category: 'category 1'
    },
    {
        id: 3, name: 'Snack', image: 'fries1.png', stars: 5, prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
            { id: 5, name: 'small cooler', price: 50 },
            { id: 6, name: 'large cooler', price: 80 }
        ], category: 'category 2'
    },
    {
        id: 4, name: 'Platter', image: 'fries1.png', stars: 4, prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
            { id: 5, name: 'small cooler', price: 50 },
            { id: 6, name: 'large cooler', price: 80 }
        ], category: 'category 2'
    },
    {
        id: 5, name: 'Fries', image: 'fries1.png', stars: 5, prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
            { id: 5, name: 'small cooler', price: 50 },
            { id: 6, name: 'large cooler', price: 80 }
        ], category: 'category 3'
    },
    {
        id: 6, name: 'Sauce', image: 'fries1.png', stars: 3, prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
            { id: 5, name: 'small cooler', price: 50 },
            { id: 6, name: 'large cooler', price: 80 }
        ], category: 'category 3'
    },
    {
        id: 7, name: 'Snack', image: 'fries1.png', stars: 5, prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
            { id: 5, name: 'small cooler', price: 50 },
            { id: 6, name: 'large cooler', price: 80 }
        ], category: 'category 4'
    },
    {
        id: 8, name: 'Platter', image: 'fries1.png', stars: 4, prices: [
            { id: 1, name: 'plate', price: 10 },
            { id: 2, name: 'small tray', price: 20 },
            { id: 3, name: 'medium tray', price: 30 },
            { id: 4, name: 'large tray', price: 40 },
            { id: 5, name: 'small cooler', price: 50 },
            { id: 6, name: 'large cooler', price: 80 }
        ], category: 'category 5'
    },
]


export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null)


    const openModal = (id) => {
        const product = menus.find((menu) => menu.id === parseInt(id))
        if (!product) return null;
        setModalContent(product)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setModalContent(null)
        setIsModalOpen(false)
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent }}>
            {children}
        </ModalContext.Provider>
    )
}