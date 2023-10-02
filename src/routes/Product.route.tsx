import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";
import Product from "../pages/Product";

export default function ProductRoute() {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path=":productId" element={<Product />} />
    </Routes>
  );
}