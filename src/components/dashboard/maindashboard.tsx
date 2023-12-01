/* eslint-disable @next/next/no-img-element */
import { Button, Grid } from "@mui/material";
import { useState, useRef, ChangeEvent } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Carousel from "react-material-ui-carousel";
import colors from "@/theme/Colors";
import { toasterror, toastsuccess } from "../toastify/toastify";
import { pushImageDetailRequest, uploadImageRequest } from "@/services/images";
import { v4 as uuid } from "uuid";
import CONFIG, { ENVIRONMENT } from "@/utils/config";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface fileListType {
  file: File;
  encodedFile: string;
}

const Maindashboard = () => {
  const [selectedImages, setSelectedImages] = useState<fileListType[]>([]);
  const [latestSelectedImage, setLatestSelectedImage] = useState<string | null>(
    null
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<fileListType[]>([]);
  const [latestReportContent, setLatestReportContent] = useState<
    string | null
  >();
  const [pageWidth, setPageWidth] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sliderRef = useRef<Slider | null>(null);

  const handleUpload = async () => {
    const uploadFile = async (file: File) => {
      const form = new FormData();
      form.append("image", file);
      return uploadImageRequest(form);
    };
    if (selectedImages[activeSlide] && selectedFiles[activeSlide]) {
      try {
        const res = await uploadFile(selectedImages[activeSlide].file);
        const reportRes = await uploadFile(selectedFiles[activeSlide].file);
        if (res.status === 200 && reportRes.status === 200) {
          await pushImageDetailRequest({
            id: uuid(),
            imageExtention: res.data.filename.split(".")[1],
            imageName: res.data.filename,
            url: CONFIG.url[ENVIRONMENT] + res.data.url,
            imageAnnotations: {},
            reportUrl: CONFIG.url[ENVIRONMENT] + reportRes.data.url ?? "",
            comments: "",
          });
          toastsuccess("Image Saved");
        }
      } catch (e) {
        toasterror("Error while uploading");
      }
    }
  };

  const uploadReport = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const encodedFile = e.target.result as string;
            setSelectedFiles([{ file, encodedFile }, ...selectedFiles]);
            const fileUrl = URL.createObjectURL(file);
            setLatestReportContent(fileUrl);
            setActiveSlide(0);
          } // Step 3: Update state with file content
        };
        reader.readAsText(file);
      }
    }
    fileInput.click();
  };
  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const image = e.target.result as string;
            setSelectedImages([
              { file, encodedFile: image },
              ...selectedImages,
            ]);
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
    const fileUrl = URL.createObjectURL(selectedFiles[index].file);
    setLatestReportContent(fileUrl);
  };

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
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
        <Grid
          item
          xs={6}
          style={{
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
          }}
        >
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
                {selectedImages.map((imageFile, index) => (
                  <div key={index} style={{ width: "100%", height: "300px" }}>
                    <img
                      src={imageFile.encodedFile}
                      alt={`Image ${index + 1}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ))}
              </Carousel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              ></div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                fontSize: "36px",
              }}
            >
              <UploadFileIcon fontSize="large" className="upload-icon-large" />
            </div>
          )}
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            maxWidth: "300px",
            height: "300px",
            backgroundColor: colors.lightPurple,
            position: "relative",
            padding: 0, // Set padding to zero
            margin: "0 8px",
          }}
        >
          {latestReportContent ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "lightGrey",
                overflow: "auto",
              }}
            >
              <div style={{ width: "100%", height: "300px" }}>
                <Document file={latestReportContent} options={options}>
                  <Page
                    key={`page_${1}`}
                    pageNumber={1}
                    onLoadSuccess={() => setPageWidth(window.innerWidth)}
                    width={Math.max(pageWidth * 0.8, 390)}
                  />
                </Document>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              ></div>
              {/* <pre>{reportContent}</pre> */}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                fontSize: "36px",
              }}
            >
              <UploadFileIcon fontSize="large" className="upload-icon-large" />
            </div>
          )}
        </Grid>
      </Grid>
      <br />

      <Grid item>
        <Grid container spacing={20}>
          <Grid item>
            <input
              type="file"
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
            <input
              type="file"
              onChange={uploadReport}
              accept="application/pdf"
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
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
export default Maindashboard;
