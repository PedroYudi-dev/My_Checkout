import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

const RestaurantPage= async ({params}:RestaurantPageProps) => {
    const { slug } = await params;
    const restarant = await getRestaurantBySlug(slug);
    if(!restarant){
        return notFound();
    }

    return (
      <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restarant.avatarImageUrl}
            alt={restarant.name}
            width={82}
            height={82}
          />
          <h2 className="font-semibold">{restarant.name}</h2>
        </div>
        <div className="space-y-2 p-24 text-center">
          <h3 className="text-2xl font-semibold">Seja bem-vindo !</h3>
          <p className="opacity-55">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-14">
          <ConsumptionMethodOption
            slug={slug}
            imageUrl="/dine_in.png"
            imageAlt="Comer aqui"
            buttonText="Para comer aqui "
            option="DINE_IN"
          />
          <ConsumptionMethodOption
            slug={slug}
            option="TAKEAWAY"
            imageUrl="/takeaway.png"
            imageAlt="Para levar"
            buttonText="Para levar"
          />
        </div>
      </div>
    );
}
export default RestaurantPage;