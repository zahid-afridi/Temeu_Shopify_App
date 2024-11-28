import { BrowserRouter } from "react-router-dom";
import './assets/css/style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import { QueryProvider, PolarisProvider } from "./components";
import { useDispatch } from "react-redux";

import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    GetStoreInfo()

  },[])
  const GetStoreInfo=async()=>{
    try {
      const response = await fetch('/api/store/info');
      const data = await response.json();
      console.log('Store Information',data)
      dispatch({ type: 'STORE_INFO', payload: data });
    } catch (error) {
      console.error('Error fetching store information:', error);
    }
  }
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const { t } = useTranslation();

  return (
    <PolarisProvider>
     
        <QueryProvider>
          <NavMenu>
          <a href="/" rel="home" />
          <a href="/Pricing">Pricing</a>
          </NavMenu>
          <Routes pages={pages} />
        </QueryProvider>
     
    </PolarisProvider>
  );
}
