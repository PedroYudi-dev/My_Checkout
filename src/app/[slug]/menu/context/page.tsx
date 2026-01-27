'use client'

import { Product } from "@prisma/client"
import { createContext, ReactNode, useState } from "react"

interface ICartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl">{
    quantity: number
}

export interface ICartContext {
    isOpen: boolean
    products: ICartProduct[]
    toggleCart: () => void
    addProduct: (product:  ICartProduct) => void,
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {}
})

export const CartProvaider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<ICartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleCart = () => {
        setIsOpen((prev) => !prev)
    }
    const addProduct = (products: ICartProduct) => {
        setProducts((prev) => [...prev, products])
    }

    return(
        <CartContext.Provider value={{isOpen, products, toggleCart, addProduct}}>
            {children}
        </CartContext.Provider>
    )
}