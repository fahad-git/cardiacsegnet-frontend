import axios from "axios";
import CONFIG, { ENVIRONMENT } from "@/utils/config";

export function getMyProfile(authToken: string ) {
    const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.getMyProfile;
    return axios.get(URL, {
        headers: {
          authorization: `Bearer ${authToken}`,
        }
      })
}
