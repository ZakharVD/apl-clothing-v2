import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ShopRoute from "./routes/Shop.route";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Checkout from "./pages/Checkout";
import Alert from "./components/Alert";
import Favorite from "./pages/Favorite";
import DashboardRoute from "./routes/Dashboard.route";
import Loading from "./components/Loading";

export default function App() {
   return (
    <>
    <Alert/>
    <Loading/>
       <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/shop/*" element={<ShopRoute />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/dashboard/*" element={<DashboardRoute/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/favorites" element={<Favorite/>}/>
        </Route>
      </Routes>
    </>
  )
}


function Layout({ children }: {children?: ReactNode}) {
  return (
    <>
      <NavBar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

