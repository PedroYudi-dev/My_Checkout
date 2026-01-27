import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { CartContext } from "../context/page";

const CartSheet = () => {
    const {isOpen, toggleCart} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>This action cannot be undone.</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;