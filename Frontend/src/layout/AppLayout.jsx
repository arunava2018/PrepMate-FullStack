import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/layout/Navbar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header always visible */}

      <Navbar />
      {/* Page content */}
      <main className="flex-grow container m-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default AppLayout;
