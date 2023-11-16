import configApi from "../config.api";

const signIn = async (user) => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/user/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const content = await response.json();
    localStorage.setItem("token", content.token);
  } catch (error) {
    throw new Error(error);
  }
};

const checkToken = async () => {
  try {
    const response = await fetch(`${configApi.BASE_URL}/user/check-token`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export default {
  signIn,
  checkToken,
};
