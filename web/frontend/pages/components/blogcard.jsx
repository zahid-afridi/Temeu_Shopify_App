import React from "react";

export default function blogcard() {
  return (
    <>
      <div className="cont">
        <div className="product-card">
          <div className="product-card__image">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Red Nike Shoes"
            />
          </div>
          <div className="product-card__info">
            <h2 className="product-card__title">Nike Air Max</h2>
            <p className="product-card__description">
              Experience ultimate comfort and style with these iconic Nike Air
              Max sneakers.
            </p>
            <div className="product-card__price-row">
              <span className="product-card__price">$149.99</span>
              <button className="product-card__btn">READ MORE</button>
              </div>
              <button className="btn-shine text-white w-100">PUBLISH NOW</button>
          </div>
        </div>
      </div>
    </>
  );
}
