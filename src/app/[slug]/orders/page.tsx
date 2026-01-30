
import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/context/helpers/cpf";
import CpfForms from "./components/cpf-form";
import OrderList from "./components/orders-list";

interface IOrdersPageProps {
    searchParams: Promise<{cpf: string}>
}

const OrdersPage = async ({ searchParams }: IOrdersPageProps) => {
    const {cpf} = await searchParams
    if(!cpf){
        return <CpfForms/>
    }
    if(!isValidCpf(cpf)){
        return <CpfForms/>
    }
    const orders = await db.order.findMany({
        where:{
            customerCpf: removeCpfPunctuation(cpf)
        },
        include:{
            restaurant: {
                select:{
                    name: true,
                    avatarImageUrl: true,
                }
            },
            orderProducts:{
                include:{
                    product: true,
                }
            }
        }
        
    })
    return <OrderList orders={orders}/>
    
};
 
export default OrdersPage;