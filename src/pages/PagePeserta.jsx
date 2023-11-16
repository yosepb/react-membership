import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import PesertaModel from "../models/PesertaModel";
import pesertaApi from "../api/pesertaApi";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";
import WidgetNavbar from "../components/WidgetNavbar";
import { WidgetPesertaAdd } from "../components/WidgetPesertaAdd";

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

  const pesertaAddListener = (e) => {
    if (e.detail.status) {
      pesertaApi.getPesertaList();
    } else {
      alert(e.detail.error);
    }
  };

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <WidgetPesertaAdd eventListener={pesertaAddListener} />

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nama Peserta</th>
              <th>Alamat</th>
              <th>Tanggal Gabung</th>
              <th>Status</th>
              <th>Username</th>
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
                <td>{peserta.isActive ? "Aktif" : "Tidak"}</td>
                <td>{peserta.username}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => updatePesertaById(peserta._id)}
                  >
                    Lihat
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => updatePesertaById(peserta._id)}
                  >
                    Edit
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
