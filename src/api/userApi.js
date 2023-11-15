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

export default { signIn };
