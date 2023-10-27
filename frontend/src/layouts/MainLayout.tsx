import Sidebar from "@/components/Sidebar/Sidebar";
import { AppBar, Button, Grid, Tab, Tabs, Toolbar } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import Maindashboard from "@/components/dashboard/maindashboard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#3498db' }}>
          <Toolbar style={{ justifyContent: 'flex-end' }}>
            <Tabs className='tabs'>
              <Tab label="Home" style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textTransform: 'uppercase' }} />
              <Tab label="About" style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textTransform: 'uppercase' }} />
              <Tab label="My Profile" style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textTransform: 'uppercase' }} />
              <Tab label="Contact Us" style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textTransform: 'uppercase' }} />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Maindashboard />
        {children}
      </div>

    </div>


  );
};
