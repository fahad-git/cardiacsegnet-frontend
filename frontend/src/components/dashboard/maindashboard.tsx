import Sidebar from "@/components/Sidebar/Sidebar";
import { AppBar, Button, Grid, Tab, Tabs, Toolbar } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";


const Maindashboard = () => {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const slider = React.useRef(null);
    const nextSlide = () => {
        // slider.current.slickNext();
    };

    const prevSlide = () => {
        // slider.current.slickPrev();
    };

    return (
        
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: "calc(100% - 64px)" }} // Subtracting the height of the AppBar
                spacing={2}
            >
                <Grid item>
                    <Grid container spacing={60}>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Image Upload
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Show Reports
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                    <Grid item xs={4}>
                        <Slider {...settings}>
                            <div>
                                <img src="/images/image1.jpeg" alt="Image 1" />
                            </div>
                            <div>
                                <img src="/images/image2.jpeg" alt="Image 2" />
                            </div>
                            <div>
                                <img src="/images/image3.jpeg" alt="Image 3" />
                            </div>
                        </Slider>

                        {/* <div style={{ backgroundColor: "lightblue", height: 200 }}></div> */}
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ backgroundColor: "lightgray", height: 200 }}></div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ backgroundColor: "lightgreen", height: 200 }}></div>
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