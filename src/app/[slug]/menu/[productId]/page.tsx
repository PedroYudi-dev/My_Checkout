import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProudctHeader from "./components/product-header";

interface IProductPagePros{
    params: Promise<{slug: string; productId: string}>
}

const ProductPage = async ({params}: IProductPagePros) => {
    const {slug, productId} = await params
    const product = await db.product.findFirst({where: {id: productId}, include: {restaurant: { select: {name: true, avatarImageUrl: true, slug:true },},},})
    if(!product){
        return notFound()
    }
    if(product.restaurant.slug.toUpperCase() !== slug.toUpperCase()){
        return notFound()
    }
    return ( 
        <>
            <div className="flex h-full flex-col">
              <ProudctHeader key={product.id} product={product}/>
              <ProductDetails product={product} />  
            </div>
        </>
     );
}
 
export default ProductPage;