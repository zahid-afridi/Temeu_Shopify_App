import React from "react";
import "../assets/css/style.css";
import "../assets/css/csv.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,

  Button,
  Alert,
 
} from "react-bootstrap";
// import CsvCard from "./components/CsvCard.jsx";
import { TiWarning } from "react-icons/ti";
import { MdDriveFolderUpload } from "react-icons/md";

export default function CsvUpload() {
  return (
    <>
      <Container>
        
        <div className="box align-middle d-flex borderorange shadow p-3 mt-5 bg-body-tertiary rounded">
          <div className="row">
            <div className="col align-items-center box1 h-6 align-middle d-flex borderorange shadow p-3 m-2 bg-body-tertiary rounded  ">
              <div className="uploadicon">
                <MdDriveFolderUpload />
                <div className="uploadtext d-flex">
                <h1>Select the file you want</h1>
                <h3>or</h3>
                <Button className="btn-shine">UPLOAD FILE</Button>
                </div>
                <p className="text-mute">Support file types: AI, PSD, PDF</p>
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
                  This is a alert—check it out!
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
