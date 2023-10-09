"use client";
import { MainLayout } from "@/layouts/MainLayout";
import dynamic from "next/dynamic";
import React from "react";

const NoSSRImageEditorView = dynamic(() => import("@/views/ImageEditorView"));

function page() {
  return (
    <MainLayout>
      <NoSSRImageEditorView />
    </MainLayout>
  );
}

export default page;
