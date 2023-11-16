import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import PesertaModel from "../models/PesertaModel";
import pesertaApi from "../api/pesertaApi";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";
import WidgetNavbar from "../components/WidgetNavbar";

const PagePeserta = () => {
  const [pesertaList, setPesertaList] = useState([]);

  useEffect(() => {
    fetchPesertaList();
  }, []);

  const fetchPesertaList = async () => {
    try {
      const pesertaList = await pesertaApi.getPesertaList();
      setPesertaList(pesertaList);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewPeserta = async () => {
    const newPesertaData = { ...PesertaModel };

    try {
      const createdPeserta = await pesertaApi.createPeserta(newPesertaData);
      console.log("Peserta created:", createdPeserta);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePesertaById = async (pesertaId) => {
    const updatedPesertaData = { ...PesertaModel };

    try {
      const updatedPeserta = await pesertaApi.updatePeserta(
        pesertaId,
        updatedPesertaData
      );
      console.log("Peserta updated:", updatedPeserta);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <Button variant="primary" onClick={createNewPeserta}>
          Buat Peserta Baru
        </Button>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nama Peserta</th>
              <th>Alamat</th>
              <th>Tanggal Gabung</th>
              <th>Peserta</th>
              <th colSpan={3}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesertaList.map((peserta) => (
              <tr key={peserta._id}>
                <td>{peserta.nama}</td>
                <td>{peserta.alamat}</td>
                <td>
                  <WidgetCommonHumanDate date={peserta.tanggalGabung} />
                </td>
                <td>array username [{peserta.username}]</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => updatePesertaById(peserta._id)}
                  >
                    Lihat
                  </Button>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => updatePesertaById(peserta._id)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => updatePesertaById(peserta._id)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default PagePeserta;
