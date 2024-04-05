/* eslint-disable @next/next/no-img-element */
import { Button, Grid } from "@mui/material";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Carousel from "react-material-ui-carousel";
import colors from "@/theme/Colors";
import { toasterror, toastsuccess, toastinfo } from "../toastify/toastify";
import { getAllImages, pushImageDetailRequest, uploadImageRequest } from "@/services/images";
import { v4 as uuid } from "uuid";
import CONFIG, { ENVIRONMENT } from "@/utils/config";
import { useAppContext } from "@/handlers/context/app-context";
import { useParams, useRouter } from "next/navigation";
import { RESPONSE_CODES } from "@/utils/constants";
import { updateImageAction } from "@/handlers/context/actions";
import PATHS from "@/utils/paths";
import Loader from "@/handlers/loader/loader";
interface fileListType {
  file: File;
  encodedFile: string;
}

const Maindashboard = () => {

  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<fileListType[]>([]);
  const [latestSelectedImage, setLatestSelectedImage] = useState<string | null>(
    null
  );
  const [newImage, setNewImage] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  let callApi = true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true)
      const response = await getAllImages();
      if (response.status === RESPONSE_CODES.SUCCESS) {
        dispatch(updateImageAction(response.data));
        setIsLoading(false)
        // setImages(response.data); // Update state with fetched images
      } else {
        console.log("Error occured!");
        setIsLoading(false)
      }
    };
    console.log(callApi)
    if(params?.id && callApi){
      callApi = false;
      fetchImages();
      setTimeout(() => {callApi = true}, 1000)
    }
  }, []);


  useEffect(() => {
    const imageId = params?.id;
    if(imageId){
      const storedImage = state?.images.find(
        (image: { id: string }) => image.id === imageId
        );
        if (storedImage) {
          setNewImage(storedImage)
          console.log(newImage)
        }
    }
  }, []);

  const handleUpload = async () => {
    setIsLoading(true)
    toastinfo("You image is uploading...")
    const uploadFile = async (file: File) => {
      const form = new FormData();
      form.append("image", file);
      return uploadImageRequest(form);
    };
    if (selectedImages[activeSlide]) {
      try {
        const res = await uploadFile(selectedImages[activeSlide].file);
        if (res.status === 200) {
          const imageId = uuid()
          await pushImageDetailRequest({
            id: imageId,
            imageExtention: res.data.filename.split(".")[1],
            imageName: res.data.filename,
            orgUrl: CONFIG.url[ENVIRONMENT] + res.data.orgUrl,
            segUrl: CONFIG.url[ENVIRONMENT] + res.data.segUrl,
            xaiUrl: CONFIG.url[ENVIRONMENT] + res.data.xaiUrl,

            orgDim1Url: CONFIG.url[ENVIRONMENT] + res.data.orgDim1Url,
            orgDim2Url: CONFIG.url[ENVIRONMENT] + res.data.orgDim2Url,
            orgDim3Url: CONFIG.url[ENVIRONMENT] + res.data.orgDim3Url,

            segDim1Url: CONFIG.url[ENVIRONMENT] + res.data.segDim2Url,
            segDim2Url: CONFIG.url[ENVIRONMENT] + res.data.segDim2Url,
            segDim3Url: CONFIG.url[ENVIRONMENT] + res.data.segDim3Url,

            xaiDim1Url: CONFIG.url[ENVIRONMENT] + res.data.xaiDim1Url,
            xaiDim2Url: CONFIG.url[ENVIRONMENT] + res.data.xaiDim2Url,
            xaiDim3Url: CONFIG.url[ENVIRONMENT] + res.data.xaiDim3Url,
            
            imageAnnotations: {},
            reportUrl: "",
            comments: "",
          });
          toastsuccess("Image Saved");
          setIsLoading(false)
          setTimeout(()=>{
            router.push(`${PATHS.IMAGE_VIEWER}`);
          }, 2000)
        } else {
          toasterror("Failed to upload");
          setIsLoading(false)
        }
      } catch (e) {
        toasterror("Error while uploading");
        setIsLoading(false)
      }
    }
  };

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    toastinfo("Your image is loading...")
    setIsLoading(true)
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
            setIsLoading(false)
          }
        };
        reader.readAsDataURL(file);
      } else{
        toasterror("Failed to load image.")
        setIsLoading(false)  
      }
    } else{
      toasterror("Failed to load image.")
      setIsLoading(false)  
    }
  };

  const handleSlideChange = (index: any) => {
    setActiveSlide(index);
  };

  // const options = {
  //   cMapUrl: "cmaps/",
  //   cMapPacked: true,
  //   standardFontDataUrl: "standard_fonts/",
  // };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "calc(100% - 10px)",
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
            backgroundColor: colors.lightGreen,
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
        {
        isLoading ? (
                  <>
                      <div className="dashboard-loader-container"></div>
                      <Loader />
                  </>
        ) :

          (latestSelectedImage ? (
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
          ))
          }
        </Grid>
      </Grid>
      <br />

      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <input
              type="file"
              accept="*"
              onChange={uploadImage}
              color="primary"
              style={{ display: "none" }}
              id="imageInput"
            />
            <label htmlFor="imageInput">
              <Button variant="contained" disabled={isLoading} color="primary" component="span">
                Load Image
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button variant="contained" disabled={isLoading} color="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Grid>
      </Grid>
      </Grid>
    {/* {
      newImage &&
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{marginTop: "20px"}}
      >
        <Grid item>
          <h2 className="img-h2">Orignal Image</h2>
          <img
              className="image-show"
              src={newImage?.url ?? ""}
              alt={newImage?.imageName}
              loading="lazy"
              />
        </Grid>
        <Grid item>
          <h2 className="img-h2">Segmented Image</h2>
          <img
              className="image-show"
              src={newImage?.segUrl ?? ""}
              alt={newImage?.imageName}
              loading="lazy"
              />
        </Grid>
        <Grid item>
          <h2 className="img-h2">XAI Image</h2>
          <img
              className="image-show"
              src={newImage?.xaiUrl ?? ""}
              alt={newImage?.imageName}
              loading="lazy"
              />
        </Grid>
      </Grid>
    } */}
    </Grid>
  );
};
export default Maindashboard;
