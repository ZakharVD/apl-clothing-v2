import { ReactNode, createContext, useEffect, useState } from "react";
import { getProductsInfo } from "../utils/firebase/productsData";
import { TProducts } from "../types/data.types";

type ProductsProviderProps = {
  children: ReactNode;
};

export const ProductsContext = createContext({} as TProducts);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<TProducts>({men: [], women: []});

  useEffect(() => {
    async function getProducts() {
      const products = await getProductsInfo();
      setProducts(products);
    }
    getProducts();
  }, []);


  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}
