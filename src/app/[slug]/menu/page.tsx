import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface IRestaurantMenuPagePros {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod:string}>;
}

const isConsumptionMethodValid = (consumptionMethod: string) =>{
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: IRestaurantMenuPagePros) => {
  const { slug } = await params;
  const {consumptionMethod} = await searchParams
  if (!isConsumptionMethodValid(consumptionMethod)){
    return notFound()
  }
  const restarant = await db.restaurant.findFirst({ where: {slug}, include: {menuCategories: {include: {products: true}}}})
  if(!restarant){
    return notFound()
  }
  return (
    <div>
      <RestaurantHeader restarant={restarant} />
      <RestaurantCategories restarant={restarant}/>
    </div>
  );
};
 


export default RestaurantMenuPage;