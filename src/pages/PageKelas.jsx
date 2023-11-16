import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import KelasModel from "../models/KelasModel";
import kelasApi from "../api/kelasApi";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";
import WidgetNavbar from "../components/WidgetNavbar";
import { WidgetKelasAdd } from "../components/WidgetKelasAdd";

const PageKelas = () => {
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

  const updateKelasById = async (kelasId) => {
    const updatedKelasData = { ...KelasModel };

    try {
      const updatedKelas = await kelasApi.updateKelas(
        kelasId,
        updatedKelasData
      );
      console.log("Kelas updated:", updatedKelas);
    } catch (error) {
      console.error(error);
    }
  };

  const kelasAddListener = (e) => {
    if (e.detail.status) {
      kelasApi.getKelasList();
    } else {
      alert(e.detail.error);
    }
  };

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <WidgetKelasAdd eventListener={kelasAddListener} />

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nama Kelas</th>
              <th>Nama Trainer</th>
              <th>Tanggal Mulai</th>
              <th>Status</th>
              <th colSpan={1}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kelasList.map((kelas) => (
              <tr key={kelas._id}>
                <td>{kelas.nama}</td>
                <td>{kelas.namaTrainer}</td>
                <td>
                  <WidgetCommonHumanDate date={kelas.tanggalMulai} />
                </td>
                <td>{kelas.isActive ? "Aktif" : "Tidak"}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => updateKelasById(kelas._id)}
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

export default PageKelas;
