"use client";
import React from "react";
import dynamic from "next/dynamic";
import { MainLayout } from "@/layouts/MainLayout";

const NoSSRImageEditorView = dynamic(() => import("@/views/ImageEditorView"));

function ImageEditor() {
  return (

      <NoSSRImageEditorView />
  
  );
}

export default ImageEditor;
