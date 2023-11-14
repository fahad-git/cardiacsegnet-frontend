
import axios from "axios";
import CONFIG, { ENVIRONMENT } from "@/utils/config";



export const getAllImages = async () => {
    const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.getImagesByUser;
    return axios.get(URL, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcjIiLCJleHAiOjE2OTk5OTI4NDF9.Mux7mmPGYDDdIDpMNos4krYbrqFRSSQv-VRT4lwcSig`,
        }
      })
    // try {
    //   const response = await fetch(CONFIG.url[ENVIRONMENT] + "/images/get-images-by-user", {
    //     headers: {
    //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcjIiLCJleHAiOjE2OTk2MzM0MTN9.LMmkbPzTSNjH3I9JKWXU0oqomtP719usEm99xzRSV5M`,
    //     }
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setImages(data); // Update state with fetched images
    // } catch (error) {
    //   console.error("Error fetching images:", error);
    // }
  };