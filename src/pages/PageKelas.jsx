import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import kelasApi from "../api/kelasApi";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";
import WidgetNavbar from "../components/WidgetNavbar";
import { WidgetKelasAdd } from "../components/WidgetKelasAdd";
import { WidgetKelasEdit } from "../components/WidgetKelasEdit";
import userApi from "../api/userApi";

const PageKelas = () => {
  const [kelasList, setKelasList] = useState([]);
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
    fetchKelasList();
  }, [kelasList]);

  const fetchKelasList = async () => {
    try {
      const kelasList = await kelasApi.getKelasList();
      setKelasList(kelasList);
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
      {isLoggedIn ? (
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
                    <td>{kelas.isActive ? "Aktif" : "Tidak"}</td>
                    <td>
                      <WidgetKelasEdit kelasId={kelas._id} />
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

export default PageKelas;
