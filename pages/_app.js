import { createContext } from "react";
import "../styles/globals.css";

const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };
  return (
    <StoreContext.Provider value={{ state: { initialState } }}>{children}</StoreContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return;
  <StoreContextProvider>
    <Component {...pageProps} />;
  </StoreContextProvider>;
}

export default MyApp;
