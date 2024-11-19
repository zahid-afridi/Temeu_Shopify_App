import React, { useEffect } from "react";
import "../../assets/css/style.css";
import Table from "react-bootstrap/Table";
import tableimg from "../../assets/img/tableimg.jpg";
import { CiEdit } from "react-icons/ci";
import { ImBin2 } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";

const DataTableComponent = () => {
  useEffect(() => {
    // Initialize DataTable after the component is mounted
    const table = $("#myTable").DataTable();

    // Clean up DataTable when the component is unmounted
    return () => {
      table.destroy();
    };
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    <>
      <Table id="myTable" className="display w-100">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableimg">
              <img src={tableimg} className="table-logo" alt="" />
            </td>
            <td className="tabletitle text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </td>
            <td className="tableprice">40$</td>
            <td className="tableaction">
              <div className="d-flex justify-content-evenly">
                <button className="btn edit">
                  <CiEdit />
                </button>
                <button className="btn ml-2 delete">
                  <ImBin2 />
                </button>
                <button className="btn ml-2 view">
                  <FaRegEye />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="tableimg">
              <img src={tableimg} className="table-logo" alt="" />
            </td>
            <td className="tabletitle text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </td>
            <td className="tableprice">40$</td>
            <td className="tableaction">
              <div className="d-flex justify-content-evenly">
                <button className="btn edit">
                  <CiEdit />
                </button>
                <button className="btn ml-2 delete">
                  <ImBin2 />
                </button>
                <button className="btn ml-2 view">
                  <FaRegEye />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default DataTableComponent;
