import React, { useEffect, useRef } from "react";
import * as NIFTIReader from "nifti-reader-js"

function NiftiReader() {

  const niiFile = "/la_001_0000.nii"
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current || {} as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    let niftiImage: any = undefined;
    let niftiHeader: any = undefined;

    const fetchNiiFile = async () => {
      try {
        // Load .nii file as ArrayBuffer
        const response = await fetch(niiFile);
        let data = await response.arrayBuffer();
        const nifti = NIFTIReader;

        if (nifti.isCompressed(data)) {
          data = nifti.decompress(data);
      }
      
      if (nifti.isNIFTI(data)) {
          niftiHeader = nifti.readHeader(data);

          const width = niftiHeader.dims[1];
          const height = niftiHeader.dims[2];
          // Set canvas size
          canvas.width = width; // Adjust as needed
          canvas.height = height; // Adjust as needed
          niftiImage = nifti.readImage(niftiHeader, data);

          if (nifti.hasExtension(niftiHeader)) {
              const niftiExt = nifti.readExtensionData(niftiHeader, data);
              console.log(niftiExt)
          }
      }
      // Render image data on canvas
      renderImageData(ctx, niftiImage, niftiHeader);

      } catch (error) {
        console.error('Error loading .nii file:', error);
      }
    }

    fetchNiiFile();

  }, []);

  const renderImageData = (ctx: any, niftiImage: any, niftiHeader: any) => {
    if (!ctx || !niftiImage || !niftiHeader) return;
  
    const width = niftiHeader.dims[1];
    const height = niftiHeader.dims[2];
    const imageDataArray = new Uint8Array(niftiImage);
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x;
        const pixelValue = imageDataArray[index];
        // Adjust pixel value for display
         const color = Math.round(pixelValue * 255); // Adjust as needed
        ctx.fillStyle = `rgb(${color},${color},${color})`;
        ctx.fillRect(x, y, 1, 1); // Render pixel
      }
    }
  };

    return (
      <canvas ref={canvasRef} />
    );
  } 
  
export default NiftiReader;