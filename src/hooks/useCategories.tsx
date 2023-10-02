import { useContext } from "react";
import { ProductsContext } from "../store/Products.context";
import { TCategory } from "../types/data.types";


export function useCategories(gender: "men" | "women") {

    const categories = useContext(ProductsContext);
    const categoriesList: TCategory[] = [];
    categories[gender].map((obj) => {
        categoriesList.push(obj);
    });
    return categoriesList;
}