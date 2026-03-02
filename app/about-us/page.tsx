"use client";

import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutUs";
import Footer from "@/components/Footer";

function AboutUsPage() {
  return (
    <>
      <div>
        
        <div className="mb-8">
          <Navbar />
        </div>

        <AboutPage />

        <Footer />
      </div>
    </>
  );
}

export default AboutUsPage;
