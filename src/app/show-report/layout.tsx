"use client";

// Providers
import { MainLayout } from "../../layouts/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
