import { useParams } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import CategoryBox from "../components/CategoryBox";

export default function Category() {
  const { gender } = useParams();
  if (gender !== "men" && gender !== "women") {
    // handle the error here
    throw new Error();
  }
  const categories = useCategories(gender);

  return (
    <>
      <section className="grid sm:grid-cols-2">
        {categories.map((category) => {
          return (
            <CategoryBox
              key={category.title}
              title={category.title}
              route={`/shop/${gender}/${category.title}`}
            />
          );
        })}
      </section>
    </>
  );
}
