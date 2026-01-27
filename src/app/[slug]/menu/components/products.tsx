import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { formatCurrency } from "@/helpers/format-currency";

interface IProductsProps{
    products: Product[]
}

const Products = ({products}: IProductsProps) => {
    const {slug} = useParams<{slug:string}>()
    return ( 
        <div className="space-y-3 px-1.5">
            {products.map(product => (
                <Link key={product.id} href={`/${slug}/menu/${product.id}`} className="flex items-center justify-between gap-10 py-3 border-b">
                    <div className="">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="line-claap-2 text-sm text-muted-foreground">{product.description}</p>
                        <p>{formatCurrency(product.price)}</p>
                    </div>
                    <div>
                        <div className="relative min-h-[82px] min-w-[120px]">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="rounded-lg object-contain"
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
     );
}
  


export default Products;