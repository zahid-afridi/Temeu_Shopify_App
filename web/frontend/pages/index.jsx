import React, { useEffect, useState } from "react";
import { Alert, Container, Badge, Button } from "react-bootstrap";
import Table from "./components/table.jsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { CgDanger } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate=useNavigate()
  const [url, setUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [storeBilling, setStoreBilling] = useState({});
  const storeDetail = useSelector((state) => state.StoreDeatil);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getBilling = async () => {
      if (storeDetail?.Store_Id) {
        try {
          const response = await fetch(
            `/api/billing/getBilling?StoreId=${storeDetail.Store_Id}`
          );
          const data = await response.json();
          // console.log("paymethome", data.StorePayment);
          setStoreBilling(data.StorePayment);
        } catch (error) {
          console.error("Error fetching billing data:", error);
        }
      }
    };

    const timeout = setTimeout(() => {
      getBilling();
    }, 500); // Delay of 500ms to ensure StoreDetail is loaded

    return () => clearTimeout(timeout);
  }, [storeDetail.Store_Id, refresh]);

  const ImportProduct = async () => {
    if (!url) {
      toast.error("Please enter a valid URL.");
      return;
    }
    try {
      setIsFetching(true); // Set fetching to true when API call starts
      const res = await fetch(
        `/api/aliexpress_importer?url=${url.trim()}&Shop_id=${
          storeDetail.Store_Id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("data", data);
      if (res.ok) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
        setUrl("");
      }
    } catch (error) {
      console.log("erer", error);
    } finally {
      setIsFetching(false); // Reset fetching status after API call ends
    }
  };

  const handleNavigate = () => {
   navigate('/Pricing');
  };

  return (
    <>
      {storeBilling?.aliexProductNumber > 0 ? (
        <>
          <Alert className="alertproduct container mt-4" variant="warning">
            <CgDanger />
            {`You have ${storeBilling.aliexProductNumber} Products left!`}
          </Alert>
          <div className="d-flex align-items-center mt-5">
            <Container className="input-container">
              <div className="bg-white inputbox rounded-pill borderorange">
                <div
                  className="form d-flex position-relative"
                  style={{ width: "95%" }}
                >
                  <input
                    style={{
                      padding: "10px 18px",
                      backgroundColor: "#E9ECEF",
                      boxShadow: "none",
                    }}
                    type="search"
                    className="form-control w-30 my-3 rounded-pill"
                    id="datatable-search-input"
                    control-id="ControlID-34"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter Product URL"
                  />
                  <button
                    onClick={ImportProduct}
                    className="btn-shine"
                    disabled={isFetching} // Disable button when fetching
                  >
                    <span>{isFetching ? "Importing..." : "IMPORT NOW"}</span>
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column align-items-center mt-5">
          <Badge bg="danger" className="p-3 mb-3">
            You have reached your limit. Please upgrade.
          </Badge>
          <Button variant="primary" onClick={handleNavigate}>
            Upgrade
          </Button>
        </div>
      )}
      <div className="d-flex align-items-center mt-5">
        <Container>
          <Table refresh={refresh} setRefresh={setRefresh} />
        </Container>
      </div>
    </>
  );
}
