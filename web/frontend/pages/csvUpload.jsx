import React, { useState } from "react";
import "../assets/css/style.css";
import "../assets/css/csv.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Alert } from "react-bootstrap";
import { TiWarning } from "react-icons/ti";
import { MdDriveFolderUpload } from "react-icons/md";
import toast from "react-hot-toast";
import csvtojson from "csvtojson";
import { useSelector } from "react-redux";
import { CgDanger } from "react-icons/cg";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // State to track if the upload is in progress
  const storeDetail = useSelector((state) => state.StoreDeatil);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a CSV
      if (file.type === "text/csv") {
        setFile(file);
        toast.success("CSV file selected successfully. Please upload.", {
          duration: 8000, // Set toast duration to 8 seconds
        });
        e.target.value = null;
      } else {
        toast.error("Only CSV files are allowed.");
      }
    }
  };

  // Trigger file input
  const handleIconClick = () => {
    document.getElementById("fileInput").click(); // Open file input dialog
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true); // Start the upload process
    toast.success("File is uploading. You can leave this page while we process the products.",{
      duration:100000
    });
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvData = event.target.result;
        const jsonArray = await csvtojson({ noheader: true, output: 'json' }).fromString(csvData);
        const dataToInsert = jsonArray.map((row) => ({ asin: row.field1 }));

        // Fetch ASIN data in the background using async calls
        await fetchAsinDataInBackground(dataToInsert);

        setFile(null);
        setIsUploading(false); // Stop the upload process once complete
        toast.success('CSV processed successfully!');
      } catch (error) {
        toast.error('Error processing CSV: ' + error.message);
        setIsUploading(false); // Stop the upload process on error
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setIsUploading(false); // Stop the upload process on error
    };

    reader.readAsText(file);
  };

  const fetchAsinDataInBackground = async (dataToInsert) => {
    // Set loading state to true before starting API calls

    for (const item of dataToInsert) {
      try {
        const response = await fetch(`/api/upload/file/?Shop_id=${storeDetail.Store_Id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ asin: item.asin }),
        });
        const data = await response.json();
        if (data.success) {
          toast.success(`Product ${item.asin} fetched successfully!`);
        } else {
          toast.error(`Failed to fetch product with ASIN ${item.asin}: ${data.message}`);
        }
      } catch (error) {
        toast.error(`Error fetching ASIN data for ${item.asin}: ` + error.message);
      }

      // Wait for 1 second before sending the next request
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  return (
    <>
      <Alert className="alertproduct container mt-4" variant="warning">
      <CgDanger />
        You have 99999999999 Products left!
      </Alert>
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
                  disabled={isUploading} // Disable input during upload
                />
                <div className="uploadtext d-flex">
                  <h1>Select the file you want</h1>
                  <h3>or</h3>
                  <Button className="btn-shine" onClick={handleUpload} disabled={isUploading}>UPLOAD FILE</Button>
                </div>
                <p className="text-mute">Support file types: CSV</p>
              </div>
            </div>
            <div className="col h-6 align-middle p-3 m-2 bg-body-tertiary rounded">
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
