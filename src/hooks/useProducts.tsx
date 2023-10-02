import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../store/Products.context";
import { TItem } from "../types/data.types";

export function useProducts(category: string, gender: "men" | "women") {
    const [products, setProducts] = useState<TItem[]>();
    const data = useContext(ProductsContext);

    useEffect(() => {
        data[gender].map((obj) => {
            if (obj.title === category) {
                setProducts(obj.items);
            }
        })
    }, [category, data, gender])

    return products;
}