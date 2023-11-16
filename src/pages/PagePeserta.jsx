import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import pesertaApi from "../api/pesertaApi";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";
import WidgetNavbar from "../components/WidgetNavbar";
import { WidgetPesertaAdd } from "../components/WidgetPesertaAdd";
import { WidgetPesertaEdit } from "../components/WidgetPesertaEdit";

const PagePeserta = () => {
  const [pesertaList, setPesertaList] = useState([]);

  useEffect(() => {
    fetchPesertaList();
  }, [pesertaList]);

  const fetchPesertaList = async () => {
    try {
      const pesertaList = await pesertaApi.getPesertaList();
      setPesertaList(pesertaList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <WidgetPesertaAdd />

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nama Peserta</th>
              <th>Alamat</th>
              <th>Tanggal Gabung</th>
              <th>Status</th>
              <th>Username</th>
              <th>Aksi</th>
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
                  <WidgetPesertaEdit pesertaId={peserta._id} />
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
