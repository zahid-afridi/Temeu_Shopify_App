import React, { useState } from "react";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Table from "./components/table.jsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";


export default function index() {
  const [url,setUrl]=useState('')
  const storeDetail = useSelector((state) => state.StoreDeatil);

  const ImportProduct=async()=>{
    if (!url) {
      toast.error('Please enter a valid URL.');
    }
   try {
    const res=await fetch(`/api/aliexpress_importer?url=${url.trim()}&Shop_id=${storeDetail.Store_Id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data=await res.json()
    console.log('data',data)
   } catch (error) {
    console.log('erer',error)
   }
  }
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
                onChange={(e)=>setUrl(e.target.value)}
                placeholder="Enter Product URL"
              />
              <button onClick={ImportProduct} class="btn-shine">
                <span >IMPORT NOW</span>
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className="d-flex align-items-center mt-5">

      <Container>
        <div className="bg-white inputbox rounded-4 overflow-hidden p-4 pl-3 pr-3 w-100 borderorange">
          <Table />
        </div>
      </Container></div>
    </>
  );
}
