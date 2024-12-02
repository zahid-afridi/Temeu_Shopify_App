import React from "react";
import Blogcard from "./components/blogcard.jsx";

export default function blogs() {
  return (
    <>
      <div className="container">
      <div class="one">
  <h2 className="h2">BLOGS ARE HERE!</h2>
</div>
        {/* <h1 className="text-center h3">WHAT THE BLOGS</h1> */}
        <div className="row">
          <div className="col-md-4">
            <Blogcard />
          </div>

          <div className="col-md-4">
            <Blogcard />
          </div>

          <div className="col-md-4">
            <Blogcard />
          </div>
        </div>
      </div>
    </>
  );
}
