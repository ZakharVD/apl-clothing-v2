import { Route, Routes } from "react-router-dom";
import Category from "../pages/Categories";
import ProductRoute from "./Product.route";

export default function CategoryRoute() {
  return (
    <Routes>
      <Route index element={<Category />} />
      <Route path=":category/*" element={<ProductRoute />} />
    </Routes>
  );
}