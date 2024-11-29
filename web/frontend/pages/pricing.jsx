// PricingTable.jsx
import React from "react";
import "../assets/css/pricing.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";  // Corrected import syntax

const PricingTable = () => {
  const packagedata=[
    {
      _id:1,
      name: "Test",
      price: "50",
      aliexproductnumer:50,
      csvProductNumber:50,
      description:'test package'
    },
    {
      _id:2,
      name: "Silver",
      price: "20",
      aliexproductnumer:200,
      csvProductNumber:100,
      description:'test package'
    },

    
  ]
  const storeDetail = useSelector((state) => state.StoreDeatil);
  // console.log('storeDeatil',storeDetail)
  return (
    <Container className="p-2 pt-5">
      <h1 className="h2 text-center">PRICING</h1>
      <div className="pricing-table">
        
        {packagedata && packagedata.map((item)=>{
          return(
            <div className="ptable-item">
          <PricingItem  item={item} />
        </div>
          )
        })}
      </div>
    </Container>
  );
};

const PricingItem = ({ status,item }) => {
  const storeDetail = useSelector((state) => state.StoreDeatil);

  const handleBuy = async(item) => {
    try {   
      const data = {
     name: item.name,
     price: item.price,
     aliexProductnumber: item.aliexproductnumer,
     csvProductNumber: item.csvProductNumber,
     store_id: storeDetail.Store_Id,
     retrun_url: `https://${storeDetail.domain}/admin/apps/80c01f7c1ffa0f2a36b49bb87c30e143`
     
 }
//  dispatch(updateEbayProduct(item.packageEbayImportNumber))
//  dispatch(updateCsvProduct(item.packageCsvImportNumber))
       const response= await fetch('/api/billing/userpay',{
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(data)
       })
       const result = await response.json()
       console.log('billginpayment',result)
       if (response.ok) {
           window.open(result.confirmation_url)
       }
     
    } catch (error) {
     console.log('billingpyamen erro',error)
    }
  };
  return (
    <div className="ptable-single">
      <div className="ptable-header">
     
        <div className="ptable-title">
          <h2>{item.name}</h2>
        </div>
        <div className="ptable-price">
          <h2><small>$</small>{item.price}<span>/ M</span></h2>
        </div>
      </div>
      <div className="ptable-body">
        <div className="ptable-description">
          <ul>
            {item.aliexproductnumer && <li>AliExpress Product Number: {item.aliexproductnumer}</li>}
            {item.csvProductNumber && <li>CSV Product Number: {item.csvProductNumber}</li>}
            
          </ul>
        </div>
        {/* <p>{item.description}</p> */}
      </div>
      <div className="ptable-footer">
        <div className="ptable-action d-flex justify-content-center">
          <button className="btn-shine text-white" onClick={()=>handleBuy(item)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
