// PricingTable.jsx
import React from "react";
import "../assets/css/pricing.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";  // Corrected import syntax

const PricingTable = () => {
  const storeDetail = useSelector((state) => state.StoreDeatil);
  console.log('storeDeatil',storeDetail)
  return (
    <Container className="p-2 pt-5">
      <h1 className="h2 text-center">PRICING</h1>
      <div className="pricing-table">
        <div className="ptable-item">
          <PricingItem title="Silver" price="99" />
        </div>
        <div className="ptable-item featured-item">
          <PricingItem title="Gold" price="199" status="Hot" />
        </div>
        <div className="ptable-item">
          <PricingItem title="Platinum" price="299" />
        </div>
      </div>
    </Container>
  );
};

const PricingItem = ({ title, price, status }) => {
  return (
    <div className="ptable-single">
      <div className="ptable-header">
        {status && <div className="ptable-status"><span>{status}</span></div>}
        <div className="ptable-title">
          <h2>{title}</h2>
        </div>
        <div className="ptable-price">
          <h2><small>$</small>{price}<span>/ M</span></h2>
        </div>
      </div>
      <div className="ptable-body">
        <div className="ptable-description">
          <ul>
            <li>Pure HTML & CSS</li>
            <li>Responsive Design</li>
            <li>Well-commented Code</li>
            <li>Easy to Use</li>
          </ul>
        </div>
      </div>
      <div className="ptable-footer">
        <div className="ptable-action d-flex justify-content-center">
          <button className="btn-shine text-white" href="#">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
