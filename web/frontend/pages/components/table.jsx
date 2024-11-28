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


const DataTableComponent = ({refresh,setRefresh}) => {
  const storeDetail = useSelector((state) => state.StoreDeatil);
  const [products,setProducts]=useState([])
  const [show, setShow] = useState(false)

useEffect(() => {
  GetProducts()
}, [refresh]);
const GetProducts=async(req,res)=>{
  try {
    const response = await fetch(
      `/api/products/getProduct?shop_id=${storeDetail.Store_Id}`
    );
    const data = await response.json();
    console.log("fetchProduct", data);
    if (response.ok) {
      setProducts(data.products)
    }
  } catch (error) {
    console.log('Product Eroor',error)
  }
}
const handleClick=(item)=>{
  window.open(item.product_url, '_blank');
}
const handleUploade=async(item)=>{
  try {
    const response = await fetch("/api/products/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body: JSON.stringify({
        title: item.title,  
        description: item.description ?  item.description :"No Description" ,
        image_url: item.image_url,
        ProductId: item._id,
        price: item.price,
      }),
    });

    const res = await response.json();
    console.log("upload", res);
    if (response.ok) {
    
      toast.success(res.message)
      setRefresh((prev)=>!prev)
      
    } else {
     
      toast.error(res.message);
    }
  } catch (error) {
   
    console.log("upload error:===>", error);
  }
}

const handleDelte=async(item)=>{
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
      setRefresh((prev)=>!prev)

     
    } else {
    
      toast.success(res.message);
    }
  } catch (error) {
   
    console.log("upload error:===>", error);
  }
}
  return (
    <>
    <Modal show={show} onClose={() => setShow (false)}/>
    
<table class="table table-hover table-info-ba">
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   {products && products.map((item)=>{
    return(
      <tr>
      <td>
        <img  className="tableimg"
        src={item.mainImage} alt="" />
      </td>
      <td>{item.title}</td>
      <td>
        <p>{`$${item.price}`}</p>
      </td>
      <td>
        <div className="d-flex gap-2">
            <MdOutlineUploadFile onClick={()=>handleUploade(item)} />
            <ImBin2  onClick={()=>handleDelte(item)}/>
            <FaRegEye onClick={()=>handleClick(item)} />
        </div>
      </td>
    </tr>
    )
   })}
  
  </tbody>
</table>

    </>
  );
};

export default DataTableComponent;
