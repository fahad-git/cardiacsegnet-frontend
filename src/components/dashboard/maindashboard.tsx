/* eslint-disable @next/next/no-img-element */
import { Button, Grid } from "@mui/material";
import { useState, useRef, ChangeEvent } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Carousel from "react-material-ui-carousel";
import colors from "@/theme/Colors";

const Maindashboard = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [latestSelectedImage, setLatestSelectedImage] = useState<string | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [latestReportContent, setLatestReportContent] = useState<string | null>('');


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sliderRef = useRef<Slider | null>(null);

    const uploadReport = (event: ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput && fileInput.files) {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        const file = e.target.result as string;
                        setSelectedFiles([file, ...selectedFiles]);
                        setLatestReportContent(file);
                        setActiveSlide(0)
                    }// Step 3: Update state with file content
                };
                reader.readAsText(file);
            }
        }
        fileInput.click();
    }
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
                        setActiveSlide(0);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleSlideChange = (index: any) => {
        setActiveSlide(index);
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
                    padding: "0px",
                    margin: "0 8px",
                    boxSizing: "border-box",
                    backgroundColor: colors.lightPurple,
                    border: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}>
                    {latestSelectedImage ? (
                        <div style={{ width: "100%", height: "100%" }}>
                            <Carousel
                                // value={activeSlide}
                                index={activeSlide}
                                autoPlay={false} // Set to true if you want it to autoplay
                                stopAutoPlayOnHover
                                animation="fade"
                                onChange={(e: any) => handleSlideChange(e)}
                            >
                                {selectedImages.map((imageUrl, index) => (
                                    <div key={index} style={{ width: '100%', height: '300px' }}>
                                        <img
                                            src={imageUrl}
                                            alt={`Image ${index + 1}`}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}></div>
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
                            <UploadFileIcon fontSize="large" className="upload-icon-large"/>
                        </div>
                    )}
                </Grid>
                <Grid item xs={6} style={{
                    maxWidth: "300px",
                    height: "300px",
                    backgroundColor: colors.lightPurple,
                    position: "relative",
                    padding: 0, // Set padding to zero
                    margin: "0 8px",
                }}>
                    {latestReportContent ? (
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                                backgroundColor: "lightGrey",
                               overflow: "auto",
                            }}
                        >
                               <Carousel
                                // value={activeSlide}
                                index={activeSlide}
                                autoPlay={false} // Set to true if you want it to autoplay
                                stopAutoPlayOnHover
                                animation="fade"
                                onChange={(e: any) => handleSlideChange(e)}
                            >
                                   {selectedFiles.map((file, index) => (
                                    <div key={index} style={{ width: '100%', height: '300px' }}>
                                        <pre>{file}</pre>
                                        {/* <img
                                            src={imageUrl}
                                            alt={`Image ${index + 1}`}
                                            style={{ width: '100%', height: '100%' }}
                                        /> */}
                                    </div>
                                ))}

                            </Carousel>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}></div>
                            {/* <pre>{reportContent}</pre> */}
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
                            <UploadFileIcon fontSize="large" className="upload-icon-large" />
                        </div>
                    )
                    }
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
                            <input type="file"
                                onChange={uploadReport}
                                accept="txt"
                                color="primary"
                                style={{ display: "none" }}
                                id="reportInput"
                            />
                            <label htmlFor="reportInput">
                                <Button variant="contained" color="primary" component="span">
                                    Show Reports
                                </Button>
                            </label>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                </Grid>
            </Grid >

    );

};
export default Maindashboard;

