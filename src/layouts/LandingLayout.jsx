import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

import { useState } from "react";
import Footer from "../components/footer/Footer";

const LandingLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="min-h-screen" onClick={() => setIsMenuOpen(false)}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LandingLayout;
