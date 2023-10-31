import { Button, Grid } from "@mui/material";
import { useState, useRef, ChangeEvent } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { FaUpload } from 'react-icons/fa';


const Maindashboard = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [latestSelectedImage, setLatestSelectedImage] = useState<string | null>(null);

    const sliderRef = useRef<Slider | null>(null);

    const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput && fileInput.files) {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        const image = e.target.result as string;
                        setSelectedImages([image, ...selectedImages]);
                        setLatestSelectedImage(image);
                        if (sliderRef.current) {
                            sliderRef.current.slickGoTo(0);
                        }

                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    return (

        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{
                height: "calc(100% - 64px)",

            }} // Subtracting the height of the AppBar
            spacing={2}
        >

            <Grid item container spacing={2} justifyContent="center">
                <Grid item xs={6} style={{
                    maxWidth: "300px",
                    height: "300px",
                    overflow: "hidden",
                    padding: "2px",
                    margin: "0 8px",
                    boxSizing: "border-box",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}>
                    {latestSelectedImage ? (
                         <div style={{ width: "100%", height: "100%" }}>
                            <Slider ref={sliderRef} {...settings}>
                                {selectedImages.map((imageUrl, index) => (
                                    <div key={index} style={{ width: "100%", height: "100%" }}>
                                        <img
                                            src={imageUrl}
                                            alt={`Image ${index + 1}`}
                                            style={{ width: "100%", height: "auto", maxWidth: "100%", maxHeight: "100%"}}
                                        />
                                    </div>
                                ))}
                            </Slider>
                         </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                fontSize: '36px',
                            }}
                        >
                            <FaUpload /> +
                        </div>
                    )}
                </Grid>




                <Grid item xs={6} style={{
                    maxWidth: "300px", height: "300px", position: "relative", padding: 0, // Set padding to zero
                    margin: "0 8px",
                }}>
                    <div
                        style={{
                            backgroundColor: "lightgrey",
                            height: "100%",
                            width: "100%",
                            overflow: "auto",
                        }}
                    >

                    </div>
                </Grid>

            </Grid>
            <br />

            <Grid item>
                <Grid container spacing={20}>
                    <Grid item>
                        <input type="file"
                            accept="image/*"
                            onChange={uploadImage}
                            color="primary"
                            style={{ display: "none" }}
                            id="imageInput"
                        />
                        <label htmlFor="imageInput">
                            <Button variant="contained" color="primary" component="span">
                                Image Upload
                            </Button>
                        </label>


                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Show Reports
                        </Button>
                    </Grid>
                </Grid>
            </Grid>


            <Grid item>
                <Button variant="contained" color="primary">
                    Save
                </Button>
            </Grid>
        </Grid>


    );

};
export default Maindashboard;

