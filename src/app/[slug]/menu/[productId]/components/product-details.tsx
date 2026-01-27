"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface IProudctDetailsProps {
    product: Prisma.ProductGetPayload<{include: {restaurant: true}}>
}

const ProductDetails = ({product }:IProudctDetailsProps) => {
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
    return ( 
        <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 flex flex-col flex-auto">
            <div className="flex-auto">
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
                <div className="flex items-center justify-between">
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
                     <p className="text-sm text-muted-foreground">{product.ingredients}</p>
                </div>

            </div>
             <Button className="mt-6 w-full rounded-full"> Adicionar à sacola</Button>
        </div>
     );
}
 
export default ProductDetails;