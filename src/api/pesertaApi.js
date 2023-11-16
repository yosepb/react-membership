import configApi from "../config.api";

const createPeserta = async (peserta) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/peserta`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(peserta),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const content = await response.json();
    return content;
  } catch (error) {
    throw new Error(error);
  }
};

const getPesertaList = async () => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/peserta`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const pesertaList = await response.json();
    return pesertaList;
  } catch (error) {
    throw new Error(error);
  }
};

const getPesertaById = async (pesertaId) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/peserta/${pesertaId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const peserta = await response.json();
    return peserta;
  } catch (error) {
    throw new Error(error);
  }
};

const updatePeserta = async (pesertaId, pesertaData) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/peserta/${pesertaId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(pesertaData),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const updatedPeserta = await response.json();
    return updatedPeserta;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  createPeserta,
  getPesertaList,
  getPesertaById,
  updatePeserta,
};
