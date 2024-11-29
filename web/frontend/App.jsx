import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './assets/css/style.css';
import Spinner from "./components/Spinner";
import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import { QueryProvider, PolarisProvider } from "./components";

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getParamsFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const paramObj = {};
    for (const [key, value] of params.entries()) {
      paramObj[key] = value;
    }
    return paramObj;
  };

  useEffect(() => {
    const initializeApp = async () => {
      const urlParams = getParamsFromURL();
      const chargeId = urlParams.charge_id;

      setLoading(true); // Start spinner

      try {
        // Fetch payment details if chargeId exists
        if (chargeId) {
          const paymentResponse = await fetch(`/api/billing/GetPayment?ChargeId=${chargeId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!paymentResponse.ok) {
            throw new Error(`Payment API failed: ${paymentResponse.status}`);
          }

          const paymentData = await paymentResponse.json();
          console.log("Payment Details:", paymentData);
        }

        // Fetch store information
        const storeResponse = await fetch('/api/store/info');
        if (!storeResponse.ok) {
          throw new Error(`Store Info API failed: ${storeResponse.status}`);
        }

        const storeData = await storeResponse.json();
        dispatch({ type: 'STORE_INFO', payload: storeData });
        console.log("Store Info:", storeData);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false); // Stop spinner
      }
    };

    initializeApp(); // Call APIs only once
  }, []); // Empty array ensures this useEffect runs once on mount

  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });

  // Show spinner while loading
  if (loading) {
    return <Spinner />;
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
