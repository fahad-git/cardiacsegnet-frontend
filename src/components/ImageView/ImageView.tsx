/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { useAppContext } from "@/handlers/context/app-context";
import { useParams } from "next/navigation";


const ImageView = () => {

  const { state } = useAppContext();
  const params = useParams();
  const [newImage, setNewImage] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const imageId = params?.id;
    if(imageId){
      const storedImage = state?.images.find(
        (image: { id: string }) => image.id === imageId
        );
        if (storedImage) {
          setNewImage(storedImage)
        }
    }
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "calc(100% - 30px)",
        marginTop: "30px"
      }} // Subtracting the height of the AppBar
      spacing={2}
    >   
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        // style={{marginTop: "100px"}}
        >
        <Grid item>
            <h4 className="img-h2">Org Img Dim 1</h4>
            <img
                className="image-show"
                src={newImage?.orgDim1Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        <Grid item>
            <h4 className="img-h2">Org Img Dim 2</h4>
            <img
                className="image-show"
                src={newImage?.orgDim2Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        <Grid item>
            <h4 className="img-h2">Org Img Dim 3</h4>
            <img
                className="image-show"
                src={newImage?.orgDim3Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        </Grid>
        <br/><br/>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{marginTop: "50px"}}
        >
        <Grid item>
            <h4 className="img-h2">Seg Img Dim 1</h4>
            <img
                className="image-show"
                src={newImage?.segDim1Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        <Grid item>
            <h4 className="img-h2">Seg Img Dim 1</h4>
            <img
                className="image-show"
                src={newImage?.segDim2Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        <Grid item>
            <h4 className="img-h2">Seg Img Dim 1</h4>
            <img
                className="image-show"
                src={newImage?.segDim3Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        </Grid>
        <br/><br/>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{marginTop: "50px"}}
        >
        <Grid item>
            <h4 className="img-h2">XAI Img Dim 1</h4>
            <img
                className="image-show"
                src={newImage?.xaiDim1Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        <Grid item>
            <h4 className="img-h2">XAI Img Dim 2</h4>
            <img
                className="image-show"
                src={newImage?.xaiDim2Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        <Grid item>
            <h4 className="img-h2">XAI Img Dim 3</h4>
            <img
                className="image-show"
                src={newImage?.xaiDim3Url ?? ""}
                alt={newImage?.imageName}
                loading="lazy"
                />
        </Grid>
        </Grid>
    </Grid>

    

  );
};
export default ImageView;
