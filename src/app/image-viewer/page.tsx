/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import "./image-viewer.css"
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import { getAllImages } from "@/services/images";
import { RESPONSE_CODES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import Loader from "@/handlers/loader/loader";
import { useAppContext } from "@/handlers/context/app-context";
import { updateImageAction } from "@/handlers/context/actions";

function ImageViewer() {

  const router = useRouter();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    // Fetch images from the API endpoint
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await getAllImages();
    if (response.status === RESPONSE_CODES.SUCCESS) {
      dispatch(updateImageAction(response.data));
      // setImages(response.data); // Update state with fetched images
    } else {
      console.log("Error occured!")
    }
  };

  const handleImageClick = (imageId: string) => {
    // const selectedImage = images.find((image) => image.id === imageId);
    if (imageId) {
      router.push(`${PATHS.IMAGE_EDITOR}/${imageId}`);
    }
    else {
      console.error(`Invalid Image id`);
    }
  }

  return <>
    <div className="image-viewer-container">
      <Grid container spacing={2}>
        {state?.images?.length == 0 ? <Loader /> : state?.images?.map((image, index) => (
          <Grid item key={index} xs={4}>
            <Paper className="image-box"
              onClick={() => handleImageClick(image.id)}

            >
              {(image?.url && image.url !== "") ? (
                <>
                  <img
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    className="image-thumbnail"
                  />

                </>
              ) : (
                <NoPhotographyOutlinedIcon className="placeholder-icon" />

              )}
            </Paper>
            <div className="captions-container">
              <Typography
                key={index} className="image-caption"
              >
                {image.imageName}
              </Typography>
            </div>
          </Grid>
        ))}

      </Grid>
    </div>
  </>
}

export default ImageViewer;
