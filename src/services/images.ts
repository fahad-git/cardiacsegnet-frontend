import axios from "axios";
import CONFIG, { ENVIRONMENT } from "@/utils/config";
import getAuthToken from "@/handlers/helpers/token";
import { PushImageDetailResquestBody } from "@/utils/types";

export const getAllImages = async () => {
  const authToken = getAuthToken();
  const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.getImagesByUser;
  return axios.get(URL, {
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};

export const uploadImageRequest = async (body: FormData) => {
  const authToken = getAuthToken();
  const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.uploadImage;
  return axios.post(URL, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const pushImageDetailRequest = async (
  body: PushImageDetailResquestBody
) => {
  const authToken = getAuthToken();
  const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.pushImageDetail;
  return axios.post(URL, body, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
