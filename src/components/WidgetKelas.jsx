import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import KelasModel from "../models/KelasModel";
import kelasApi from "../api/kelasApi";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";

const WidgetKelas = () => {
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

  const createNewKelas = async () => {
    const newKelasData = { ...KelasModel };

    try {
      const createdKelas = await kelasApi.createKelas(newKelasData);
      console.log("Kelas created:", createdKelas);
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

  return (
    <div>
      <Button variant="primary" onClick={createNewKelas}>
        Buat Kelas Baru
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama Kelas</th>
            <th>Nama Trainer</th>
            <th>Tanggal Mulai</th>
            <th>Aksi</th>
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
              <td>
                <Button
                  variant="primary"
                  onClick={() => updateKelasById(kelas._id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WidgetKelas;
