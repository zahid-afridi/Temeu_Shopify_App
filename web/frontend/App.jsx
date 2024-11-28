import { BrowserRouter } from "react-router-dom";
import './assets/css/style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import { QueryProvider, PolarisProvider } from "./components";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to manage loading spinner

  useEffect(() => {
    GetStoreInfo();
  }, []);

  const GetStoreInfo = async () => {
    try {
      const response = await fetch('/api/store/info');
      const data = await response.json();
      console.log('Store Information', data);
      dispatch({ type: 'STORE_INFO', payload: data });
    } catch (error) {
      console.error('Error fetching store information:', error);
    } finally {
      setLoading(false); // Stop showing the spinner once data is loaded
    }
  };
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const { t } = useTranslation();
 if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
  )
 }
  return (
    <PolarisProvider>
     
        <QueryProvider>
          <NavMenu>
          <a href="/" rel="home" />
          <a href="/csvUpload">CSV Upload</a>
          <a href="/Pricing">Pricing</a>
          </NavMenu>
          <Routes pages={pages} />
        </QueryProvider>
     
    </PolarisProvider>
  );
}
