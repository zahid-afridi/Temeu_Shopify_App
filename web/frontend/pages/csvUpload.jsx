import React, { useState } from "react";
import "../assets/css/style.css";
import "../assets/css/csv.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Alert } from "react-bootstrap";
import { TiWarning } from "react-icons/ti";
import { MdDriveFolderUpload } from "react-icons/md";
import toast from "react-hot-toast";

export default function CsvUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a CSV
      if (file.type === "text/csv") {
        setSelectedFile(file);
        toast.success("CSV file selected successfully Please upload", {
          duration: 8000, // Set toast duration to 8 seconds
        });
      } else {
        toast.error("Only CSV files are allowed.");
      }
    }
  };

  // Trigger file input
  const handleIconClick = () => {
    if (!selectedFile) {
      document.getElementById("fileInput").click(); // Open file input dialog
    } else {
      toast.error("You have already selected a file. Please upload or Refresh the page");
    }
  };

  return (
    <>
      <Container>
        <div className="box align-middle d-flex borderorange shadow p-3 mt-5 bg-body-tertiary rounded">
          <div className="row">
            <div className="col align-items-center box1 h-6 align-middle d-flex borderorange shadow p-3 m-2 bg-body-tertiary rounded">
              <div className="uploadicon">
                <MdDriveFolderUpload cursor={"pointer"} onClick={handleIconClick} />
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept=".csv"
                />
                <div className="uploadtext d-flex">
                  <h1>Select the file you want</h1>
                  <h3>or</h3>
                  <Button className="btn-shine">UPLOAD FILE</Button>
                </div>
                <p className="text-mute">Support file types: CSV</p>
              </div>
            </div>
            <div className="col h-6 align-middle p-3 m-2 bg-body-tertiary rounded ">
              <div className="uploadcontent">
                <Alert variant="warning">
                  <TiWarning />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem iusto suscipit quas temporibus unde dolore tenetur
                    nesciunt dicta repellat labore! Rem ipsum ducimus aliquid!
                    Dolor qui sit blanditiis quos nihil!
                  </p>
                  This is an alert—check it out!
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
