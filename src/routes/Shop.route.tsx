import { Routes, Route } from "react-router-dom";
import GenderSelection from "../pages/Shop";
import CategoryRoute from "./Category.route";

export default function ShopRoute() {
    return (
       <Routes>
          <Route index element={<GenderSelection/>}/>
          <Route path=":gender/*" element={<CategoryRoute />} />
        </Routes>
    );
  }