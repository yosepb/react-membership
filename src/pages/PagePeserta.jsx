import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import pesertaApi from "../api/pesertaApi";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";
import WidgetNavbar from "../components/WidgetNavbar";
import { WidgetPesertaAdd } from "../components/WidgetPesertaAdd";
import { WidgetPesertaEdit } from "../components/WidgetPesertaEdit";
import userApi from "../api/userApi";

const PagePeserta = () => {
  const [pesertaList, setPesertaList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkStatusToken = async () => {
      try {
        const response = await userApi.checkToken();
        setIsLoggedIn(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkStatusToken();
  }, []);

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
      {isLoggedIn ? (
        <>
          <WidgetNavbar />
          <Container className="mt-4">
            <WidgetPesertaAdd />

            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Nama Peserta</th>
                  <th>Alamat</th>
                  <th>Tanggal Gabung</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pesertaList.map((peserta) => (
                  <tr key={peserta._id}>
                    <td>{peserta.username}</td>
                    <td>{peserta.nama}</td>
                    <td>{peserta.alamat}</td>
                    <td>
                      <WidgetCommonHumanDate date={peserta.tanggalGabung} />
                    </td>
                    <td>{peserta.isActive ? "Aktif" : "Tidak"}</td>
                    <td>
                      <WidgetPesertaEdit pesertaId={peserta._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </>
      ) : (
        <Container>
          <h3 className="ml-3 mt-3">
            <i>
              Anda harus <a href="/">login</a>
            </i>
          </h3>
        </Container>
      )}
    </>
  );
};

export default PagePeserta;
