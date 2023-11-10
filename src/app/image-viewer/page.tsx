/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import "./image-viewer.css"
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import { getAllImages } from "@/services/images";
import { RESPONSE_CODES } from "@/utils/constants";
import Loader from "@/components/loader/loader";

function ImageViewer() {
  const [images, setImages] = useState<Array<{ url: string; imageName: string }>>([]);
  useEffect(() => {
    // Fetch images from the API endpoint
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await getAllImages();
    if (response.status === RESPONSE_CODES.SUCCESS) {
      setImages(response.data); // Update state with fetched images
    }else{
      console.log("Error occured!")
    }    
  };

  return <>
    <div className="image-viewer-container">
      <Grid container spacing={2}>
        {images.length == 0 ? <Loader/>: images.map((image, index) => (
          <Grid item key={index} xs={4}>
            <Paper className="image-box">
              {(image?.url && image.url !== "") ? (
                <>
                  <img
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    className="image-thumbnail"
                  />

                </>
              ) : (
                <NoPhotographyOutlinedIcon className="placeholder-icon"/>

              )}
            </Paper>
            <div className="captions-container">
            <Typography
               key={index}  className="image-caption"
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
