"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../context/page";


interface IProudctDetailsProps {
    product: Prisma.ProductGetPayload<{include: {restaurant: true}}>
}

const ProductDetails = ({product }:IProudctDetailsProps) => {
    const {toggleCart, addProduct} = useContext(CartContext)
    const [quantity, setQuantity] = useState<number>(1)
    
    const handleDrecreaseQuantity = () =>{
        setQuantity((prev) => {
        if(prev === 1){
            return 1
        }
        return prev - 1
    })
    }
    const handleIncreaseQuantity = () =>{
        setQuantity((prev) => prev + 1)
    }

    const handleAddTotoggleCart = () =>{
        addProduct({
            ...product,
            quantity,
        })
        toggleCart()
    }
    return ( 
    <>
        <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 flex flex-col flex-auto overflow-hidden">
            <div className="flex-auto overflow-hidden">
                {/* Restaurante */}
                <div className="flex items-center gap-1.5">
                    <Image
                        src={product.restaurant.avatarImageUrl}
                        alt={product.restaurant.name}
                        width={16}
                        height={16}
                        className="rounded-full"
                    />
                    <p className="text-xl text-muted-foreground">
                        {product.restaurant.name}
                    </p>
                </div>

                {/* Nome do produto */}
                <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

                {/* Preço e quantidade */}
                <div className=" mt-3 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {formatCurrency(product.price)}   
                    </h3> 
                    <div className="flex items-center gap-3 text-center">
                        <Button variant="outline" className="w-8 h-8 rounded-xl" onClick={handleDrecreaseQuantity}>
                            <ChevronLeft/>
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button variant="destructive" className="w-8 h-8 rounded-xl" onClick={handleIncreaseQuantity}>
                            <ChevronRight/>
                        </Button>
                    </div>
                </div>

                <ScrollArea className="h-full">
                    {/* Sobre */}
                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold">Sobre</h4>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>

                    
                    {/* Ingredientes */}
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-1">
                            <ChefHatIcon size={18}/>
                            <h4 className="font-semibold">Ingredientes</h4>
                        </div>
                        <ul className="text-muted-foreground list-disc px-5 text-sm text">
                            {product.ingredients.map((ingredient) =>(
                                <li key={ingredient}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </ScrollArea>
            </div>
             <Button className="mt-6 w-full rounded-full" onClick={handleAddTotoggleCart}> Adicionar à sacola</Button>
        </div>
       <CartSheet/>
    </>
     );
}
 
export default ProductDetails;