import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import tableimg from "../../assets/img/tableimg.jpg";
import { ImBin2 } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import Modal from "./modal.jsx";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const DataTableComponent = ({ refresh, setRefresh }) => {
  const storeDetail = useSelector((state) => state.StoreDeatil);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [uploadingId, setUploadingId] = useState(null); // State to track uploading product
  const [deletingId, setDeletingId] = useState(null); // State to track deleting product

  useEffect(() => {
    GetProducts();
  }, [refresh]);

  const GetProducts = async () => {
    try {
      const response = await fetch(
        `/api/products/getProduct?shop_id=${storeDetail.Store_Id}`
      );
      const data = await response.json();
      console.log("fetchProduct", data);
      if (response.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log("Product Error", error);
    }
  };

  const handleClick = (item) => {
    window.open(item.product_url, "_blank");
  };

  const handleUploade = async (item) => {
    setUploadingId(item._id); // Set current product ID for uploading
    try {
      const response = await fetch("/api/products/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          description: item.description ? item.description : "No Description",
          image_url: item.image_url,
          ProductId: item._id,
          price: item.price,
        }),
      });

      const res = await response.json();
      console.log("upload", res);
      if (response.ok) {
        toast.success(res.message);
        setRefresh((prev) => !prev);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("upload error:===>", error);
    } finally {
      setUploadingId(null); // Reset uploading ID
    }
  };

  const handleDelte = async (item) => {
    setDeletingId(item._id); // Set current product ID for deleting
    try {
      const response = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopifyId: item.shopifyId,
          productId: item._id,
        }),
      });
      const res = await response.json();
      console.log(res);
      if (response.ok) {
        toast.success(res.message);
        setRefresh((prev) => !prev);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("delete error:===>", error);
    } finally {
      setDeletingId(null); // Reset deleting ID
    }
  };

  return (
    <>
      <Modal show={show} onClose={() => setShow(false)} />

      <table className="table table-hover table-info-ba">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <img
                      className="tableimg"
                      src={item.mainImage}
                      alt={item.title}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <p className="price">{`$${item.price}`}</p>
                  </td>
                  <td>
                    <div className="d-flex crudicon">
                      <div className="d-flex gap-2 edit">
                        {uploadingId === item._id ? (
                          <div
                            className="spinner-border spinner-border-sm text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : item.inShopify ? (
                          <span>Uploaded</span> // Show "Uploaded" if inShopify is true
                        ) : (
                          <MdOutlineUploadFile onClick={() => handleUploade(item)} />
                        )}
                      </div>
                      <div className="d-flex gap-2 delete">
                        {deletingId === item._id ? (
                          <div
                            className="spinner-border spinner-border-sm text-danger"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <ImBin2 onClick={() => handleDelte(item)} />
                        )}
                      </div>
                      <div className="d-flex gap-2 view">
                        <FaRegEye onClick={() => handleClick(item)} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default DataTableComponent;
