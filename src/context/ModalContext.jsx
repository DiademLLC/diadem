import { useContext, useState, useEffect, createContext } from "react";
import { useMenu } from "./MenuContext";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const { menuItems } = useMenu()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null)


    const openModal = (id) => {
        const product = menuItems.find((menu) => menu._id === id)
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