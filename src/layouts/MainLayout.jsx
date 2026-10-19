import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { useState } from "react";
import Sidebar from "../components/sidebar/SideBar";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="flex flex-1 overflow-hidden" onClick={() => setIsMenuOpen(false)}>
        <Sidebar />

        <div className="flex-1 overflow-y-auto relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;