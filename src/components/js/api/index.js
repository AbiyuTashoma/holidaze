import { registerUrl } from "../constants";

async function api(registerOption) {
  const response = await fetch(registerUrl, registerOption);
  try {
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(response.statusText);
  }
}

export default api;
