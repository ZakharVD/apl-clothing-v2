import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ProductsProvider } from "./store/Products.context.tsx";
import { UserProvider } from "./store/User.context.tsx";
import { CartProvider } from "./store/Cart.context.tsx";
import { AlertProvider } from "./store/Alert.context.tsx";
import { FavoriteProvider } from "./store/Favorite.context.tsx";
import { ModalProvider } from "./store/Modal.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <FavoriteProvider>
              <ModalProvider>
                <AlertProvider>
                  <App />
                </AlertProvider>
              </ModalProvider>
            </FavoriteProvider>
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
