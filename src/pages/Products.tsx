import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { TItem } from "../types/data.types";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const { category, gender } = useParams();

  if (gender !== "men" && gender !== "women") {
    // handle the error here
    throw new Error();
  }
  if (typeof category !== "string") {
    throw new Error();
  }

  const products = useProducts(category, gender);

  return (
      <div className="lg:w-[75%] mx-auto flex flex-row justify-center flex-wrap min-h-[90vh]">
        {products?.map((product: TItem) => {
          return (
            <ProductCard
              key={product.id}
              route={`${product.id}`}
              product={product}
            />
          );
        })}
      </div>
  );
}
