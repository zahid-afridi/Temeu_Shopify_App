import React, { useState } from "react";

import { Container } from "react-bootstrap";
import Table from "./components/table.jsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function index() {
  const [url, setUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false); // Added state for API fetching status
  const storeDetail = useSelector((state) => state.StoreDeatil);
  const [refresh, setRefresh] = useState(false);

  const ImportProduct = async () => {
    if (!url) {
      toast.error('Please enter a valid URL.');
      return;
    }
    try {
      setIsFetching(true); // Set fetching to true when API call starts
      const res = await fetch(`/api/aliexpress_importer?url=${url.trim()}&Shop_id=${storeDetail.Store_Id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('data', data);
      if (res.ok) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
        setUrl('');
      }
    } catch (error) {
      console.log('erer', error);
    } finally {
      setIsFetching(false); // Reset fetching status after API call ends
    }
  };

  return (
    <>
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
                <span>{isFetching ? 'Importing...' : 'IMPORT NOW'}</span> {/* Dynamic text */}
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className="d-flex align-items-center mt-5">
        <Container>
          <Table refresh={refresh} setRefresh={setRefresh} />
        </Container>
      </div>
    </>
  );
}
