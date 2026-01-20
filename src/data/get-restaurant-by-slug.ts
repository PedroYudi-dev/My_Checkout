import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
    const restarant = await db.restaurant.findFirst({ where: {slug}})
    return restarant;
}