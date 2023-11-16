import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";
import PesertaModel from "../models/PesertaModel";
import pesertaApi from "../api/pesertaApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export const WidgetPesertaAdd = () => {
  const [peserta, setPeserta] = useState(PesertaModel);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handlePeserta = (name, e) => {
    let value;

    if (name === "tanggalGabung") {
      value = e;
    } else {
      value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }

    setPeserta((values) => ({ ...values, [name]: value }));
  };

  const createNewPeserta = async () => {
    try {
      await pesertaApi.createPeserta(peserta);
      Swal.fire("Good job!", "Adding new data successfully!", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Buat Peserta Baru +
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Peserta Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Nama Peserta</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Nama Peserta"
                    name="nama"
                    value={peserta.nama}
                    onChange={(value) => handlePeserta("nama", value)}
                  />
                </InputGroup>

                <Form.Label>Alamat Peserta</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Alamat Peserta"
                    name="alamat"
                    value={peserta.alamat}
                    onChange={(value) => handlePeserta("alamat", value)}
                  />
                </InputGroup>

                <Form.Group className="mb-3">
                  <Form.Check
                    label="Peserta Aktif ?"
                    name="isActive"
                    id="isActive"
                    checked={peserta.isActive}
                    onChange={(value) => handlePeserta("isActive", value)}
                  />
                </Form.Group>

                <Form.Label>Tanggal Gabung</Form.Label>
                <InputGroup className="mb-3">
                  <DatePicker
                    selected={peserta.tanggalGabung}
                    onChange={(value) => handlePeserta("tanggalGabung", value)}
                    placeholderText="Tanggal Gabung"
                    className="form-control"
                    name="tanggalGabung"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createNewPeserta}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
