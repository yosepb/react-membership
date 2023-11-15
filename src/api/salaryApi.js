import configApi from "../config.api";

// Fungsi untuk mengambil data gaji
export const getSalaries = async () => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/salary`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"), // Mengambil token dari local storage
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const content = await response.json();
    return content;
  } catch (error) {
    throw new Error(`Error fetching salaries: ${error.message}`);
  }
};

// Fungsi untuk menghapus data gaji berdasarkan ID
export const deleteSalary = async (salaryId) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/salary/${salaryId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const content = await response.json();
    return content;
  } catch (error) {
    throw new Error(`Error deleting salary: ${error.message}`);
  }
};
