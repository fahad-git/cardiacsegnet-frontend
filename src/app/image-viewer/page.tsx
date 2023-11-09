"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import NavbarLoggedIn from "@/components/Navigation/NavbarLoggedIn";
import "./image-viewer.css"
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';

function ImageViewer() {

  const BASE_URL = "http://localhost:8000"
  const [images, setImages] = useState<Array<{ url: string; imageName: string }>>([]);

  useEffect(() => {
    // Fetch images from the API endpoint
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(BASE_URL + "/api/images/get-images-by-user", {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcjIiLCJleHAiOjE2OTk2MzM0MTN9.LMmkbPzTSNjH3I9JKWXU0oqomtP719usEm99xzRSV5M`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data); // Update state with fetched images
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return <>

    <div className="image-viewer-container">
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item key={index} xs={3}>
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
                <NoPhotographyOutlinedIcon className="placeholder-icon" />

              )}
            </Paper>
            <div className="captions-container">
            <Typography style={{paddingRight: "50px"}}
               key={index}  className="image-caption"
              >
                {image.imageName}
              </Typography>
              </div>
          </Grid>
        ))}

      </Grid>
      {/* <div className="captions-container">
          {images.map((image, index) => (
            <Typography variant="caption" key={index} className="image-caption">
              {image.imageName}
            </Typography>
          ))}
        </div> */}
    </div>
  </>
}

export default ImageViewer;
