
import axios from "axios";
import CONFIG, { ENVIRONMENT } from "@/utils/config";
import getAuthToken from "@/handlers/helpers/token";


export const getAllImages = async () => {
  const authToken = getAuthToken();
    const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.getImagesByUser;
    return axios.get(URL, {
        headers: {
          authorization: `Bearer ${authToken}`,
        }
      })
  };