"use client";
import React from "react";
import dynamic from "next/dynamic";

const NoSSRImageEditorView = dynamic(() => import("@/views/ImageEditorView"));

function page() {
  return (
      <NoSSRImageEditorView />
  );
}

export default page;
