import { useProducts } from "./useProducts";
import { TItem } from "../types/data.types";
import { useEffect, useState } from "react";

export function useProduct(category: string, gender: "men" | "women", id: string) {
    const [product, setProduct] = useState<TItem>();
    const data = useProducts(category, gender);

   useEffect(() => {
    data?.map((obj: TItem) => {
        if(obj.id.toString() === id) {
            setProduct(obj);
        }
    })
   }, [data, id])
    return product;
}