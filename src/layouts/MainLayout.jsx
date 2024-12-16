import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="container mx-auto flex-1">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default MainLayout;
