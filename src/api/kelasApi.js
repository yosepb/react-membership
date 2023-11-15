import configApi from "../config.api";

const createKelas = async (kelasData) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/kelas`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(kelasData),
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

const getKelasList = async () => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/kelas`, {
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

    const kelasList = await response.json();
    return kelasList;
  } catch (error) {
    throw new Error(error);
  }
};

const getKelasById = async (kelasId) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/kelas/${kelasId}`, {
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

    const kelas = await response.json();
    return kelas;
  } catch (error) {
    throw new Error(error);
  }
};

const updateKelas = async (kelasId, kelasData) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/kelas/${kelasId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kelasData),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const updatedKelas = await response.json();
    return updatedKelas;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  createKelas,
  getKelasList,
  getKelasById,
  updateKelas,
};
