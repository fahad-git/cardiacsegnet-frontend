/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import "./image-viewer.css";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
import { getAllImages } from "@/services/images";
import { RESPONSE_CODES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { useAppContext } from "@/handlers/context/app-context";
import { updateImageAction } from "@/handlers/context/actions";

function ImageViewer() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await getAllImages();
      if (response.status === RESPONSE_CODES.SUCCESS) {
        dispatch(updateImageAction(response.data));
        // setImages(response.data); // Update state with fetched images
      } else {
        console.log("Error occured!");
      }
    };
    fetchImages();
  }, []);

  const handleImageClick = (imageId: string) => {
    // const selectedImage = images.find((image) => image.id === imageId);
    if (imageId) {
      router.push(`${PATHS.HOME}/${imageId}`);
    } else {
      console.error(`Invalid Image id`);
    }
  };

  return (
    <>
      <div className="image-viewer-container">
        {state?.images?.length ? (
          <ImageList
            sx={{ width: "100%", height: "100vh" }}
            variant="quilted"
            cols={4}
            rowHeight={310}
          >
            {state?.images?.map((item, index) => (
              <ImageListItem key={"img_" + index}>
                <img
                  onClick={() => handleImageClick(item.id)}
                  src={item.orgDim3Url}
                  alt={item.imageName}
                  loading="lazy"
                />
                <ImageListItemBar title={item.imageName} position="bottom" />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <NoPhotographyOutlinedIcon className="placeholder-icon" />
        )}
      </div>
    </>
  );
}

export default ImageViewer;
