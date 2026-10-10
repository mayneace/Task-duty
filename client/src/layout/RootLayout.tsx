import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import footer from "../components/footer";

const RootLayout: React.FC = () => {
  return (
    <div>
      <NavBar />

      <main>
        <Outlet />
      </main>

      <footer />
    </div>
  );
};

export default RootLayout;
