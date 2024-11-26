import { Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../../assets/css/style.css";

function Example({ onClose, show }) {
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={onClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        
        <Modal.Body className="modalbody">
          <Container className="modalcontainer">
            <Row>
              <Col lg="6" className="h-auto">
              <div className="product-img h-50">
                <img className="w-100" src="../assets/img/product (1).webp" alt="" />
                <img className="w-100" src="../assets/img/product (2).webp" alt="" />
                <img className="w-100" src="../assets/img/product (3).webp" alt="" />
                <img className="w-100" src="../assets/img/product (4).webp" alt="" /></div>
              </Col>
              <Col lg="6">
              <div className="product-detail mt-1">
                <h3 className="h3">This is Title</h3>
                <p className="p">This is description sdvrfweojnsidv ij vdiv wifnsivj erifbnwsiv ibThis is description sdvrfweojnsidv ij vdiv wifnsivj erifbnwsiv ibThis is description sdvrfweojnsidv ij vdiv wifnsivj erifbnwsiv ibThis is description sdvrfweojnsidv ij vdiv wifnsivj erifbnwsiv ibThis is description sdvrfweojnsidv ij vdiv wifnsivj erifbnwsiv ibThis is description sdvrfweojnsidv ij vdiv wifnsivj</p>
                <p className="mt-1 h6">$50 - $100</p>
                <button className="btn-shine text-white">CHECK ON TEMU</button>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
