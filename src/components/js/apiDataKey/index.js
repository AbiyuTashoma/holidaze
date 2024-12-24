import api from "../api";
import { apiKeyUrl } from "../constants";

async function apiDataKey(accessToken) {
  const apiKeyOption = {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const apiKey = await api(apiKeyUrl, apiKeyOption);

  try {
    return apiKey.data.key;
  } catch (error) {
    throw new Error(error);
  }
}

export default apiDataKey;
