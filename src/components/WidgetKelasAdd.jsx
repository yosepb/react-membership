import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";
import KelasModel from "../models/KelasModel";
import kelasApi from "../api/kelasApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export const WidgetKelasAdd = () => {
  const [kelas, setKelas] = useState(KelasModel);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleKelas = (name, e) => {
    let value;

    if (name === "tanggalMulai") {
      value = e;
    } else {
      value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }

    setKelas((values) => ({ ...values, [name]: value }));
  };

  const createNewKelas = async () => {
    try {
      await kelasApi.createKelas(kelas);
      handleClose();
      setKelas(KelasModel);
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
        Buat Kelas Baru +
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kelas Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Nama Kelas</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Nama Kelas"
                    name="nama"
                    value={kelas.nama}
                    onChange={(value) => handleKelas("nama", value)}
                  />
                </InputGroup>

                <Form.Label>Trainer Kelas</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Trainer Kelas"
                    name="namaTrainer"
                    value={kelas.namaTrainer}
                    onChange={(value) => handleKelas("namaTrainer", value)}
                  />
                </InputGroup>

                <Form.Group className="mb-3">
                  <Form.Check
                    label="Kelas Aktif ?"
                    name="isActive"
                    id="isActive"
                    checked={kelas.isActive}
                    onChange={(value) => handleKelas("isActive", value)}
                  />
                </Form.Group>

                <Form.Label>Tanggal Mulai</Form.Label>
                <InputGroup className="mb-3">
                  <DatePicker
                    selected={kelas.tanggalMulai}
                    onChange={(value) => handleKelas("tanggalMulai", value)}
                    placeholderText="Tanggal Mulai"
                    className="form-control"
                    name="tanggalMulai"
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
          <Button variant="primary" onClick={createNewKelas}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
