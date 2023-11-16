import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";
import PesertaModel from "../models/PesertaModel";
import pesertaApi from "../api/pesertaApi";
import kelasApi from "../api/kelasApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import Swal from "sweetalert2";

export const WidgetPesertaEdit = ({ pesertaId }) => {
  const [peserta, setPeserta] = useState(PesertaModel);
  const [show, setShow] = useState(false);

  const [kelasList, setKelasList] = useState([]);

  useEffect(() => {
    fetchKelasList();
  }, []);

  const fetchKelasList = async () => {
    try {
      const kelasList = await kelasApi.getKelasList();
      setKelasList(kelasList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handlePeserta = (name, value) => {
    if (name === "tanggalGabung") {
      setPeserta((values) => ({ ...values, [name]: value }));
    } else if (name === "isActive") {
      setPeserta((values) => ({ ...values, [name]: value.target.checked }));
    } else if (name === "kelas_id") {
      const kelasId = value.target.id;
      const isChecked = value.target.checked;

      setPeserta((values) => {
        let updatedKelasId;

        if (isChecked) {
          updatedKelasId = [...values.kelas_id, kelasId];
        } else {
          updatedKelasId = values.kelas_id.filter((id) => id !== kelasId);
        }

        return { ...values, kelas_id: updatedKelasId };
      });
    } else {
      setPeserta((values) => ({ ...values, [name]: value.target.value }));
    }
  };

  const updatePesertaById = async (pesertaId) => {
    try {
      await pesertaApi.updatePeserta(pesertaId, peserta);
      handleClose();
      Swal.fire("Good job!", "Editing data successfully!", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  useEffect(() => {
    const getPesertaById = async () => {
      try {
        const peserta = await pesertaApi.getPesertaById(pesertaId);
        peserta.tanggalGabung = parseISO(peserta.tanggalGabung);
        setPeserta(peserta);
      } catch (error) {
        console.error(error);
      }
    };

    getPesertaById();
  }, [pesertaId]);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
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

                <Form.Label>Username</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Username"
                    name="username"
                    value={peserta.username}
                    onChange={(value) => handlePeserta("username", value)}
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
                <hr />
                <Form.Label>
                  <b> Member dari Kelas</b>
                </Form.Label>
                <span className="d-block mb-3 text-danger">
                  <i>*cek untuk menambah, uncek untuk menghapus</i>
                </span>
                <Form>
                  {kelasList.map(
                    (kelas) =>
                      kelas.isActive && (
                        <div key={kelas._id} className="mb-3">
                          <Form.Check id={kelas._id}>
                            <Form.Check.Input
                              type="checkbox"
                              checked={peserta.kelas_id.includes(kelas._id)}
                              onChange={(value) =>
                                handlePeserta("kelas_id", value)
                              }
                              id={kelas._id}
                            />
                            <Form.Check.Label>{kelas.nama}</Form.Check.Label>
                          </Form.Check>
                        </div>
                      )
                  )}
                </Form>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => updatePesertaById(pesertaId)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
