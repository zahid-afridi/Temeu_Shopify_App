import React from "react";
import "../assets/css/style.css";
import "../assets/css/csv.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Button,
  Alert,
  CardTitle,
} from "react-bootstrap";
// import CsvCard from "./components/CsvCard.jsx";
import { TiWarning } from "react-icons/ti";
import { MdDriveFolderUpload } from "react-icons/md";

export default function CsvUpload() {
  return (
    <>
      <Container>
        {/* <Card className="border-0 rounded-lg shadow-sm">
          <CardBody>
            <Row className="justify-content-between align-items-center">
              <Col md={5}>
              <Card className="border-0 rounded-lg shadow-sm p-4 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <i className="fas fa-upload fa-2x text-primary" />
        </div>
        <CardText className="text-center mb-2">
          Drag and Drop files to upload
        </CardText>
        <Button variant="primary" className="mb-2">
          Browse
        </Button>
        <CardText className="text-muted text-center">
          Supported files: AI, PSD, PDF
        </CardText>
      </Card>
              </Col>
              <Col md={7}>
              <Alert variant="warning">
        <TiWarning />
        This is a alert—check it out!
      </Alert>
      <CardTitle tag="h5">Uploaded Files</CardTitle>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="fas fa-file-alt fa-lg mr-2 text-primary" />
            <span>final.psd</span>
          </div>
          <i className="fas fa-trash-alt fa-lg text-danger" />
        </li>
        <li className="list-group-item d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="fas fa-file-pdf fa-lg mr-2 text-danger" />
            <span>brief_for_logo.pdf</span>
          </div>
          <i className="fas fa-trash-alt fa-lg text-danger" />
        </li>
      </ul>
              </Col>
            </Row>
          </CardBody>
        </Card> */}

        <div className="box h-6 align-middle d-flex borderorange shadow p-3 mt-5 bg-body-tertiary rounded">
          <div className="row">
            <div className="col box1 h-6 align-middle d-flex borderorange shadow p-3 m-2 bg-body-tertiary rounded  ">
              <div className="uploadicon warning">
                <MdDriveFolderUpload />
              </div>
            </div>
            <div className="col h-6 align-middle borderorange shadow p-3 m-2 bg-body-tertiary rounded ">
              <Alert variant="warning">
                <TiWarning />
                This is a alert—check it out!
              </Alert>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
