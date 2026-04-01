import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BestOfBusiness from "@/components/BestOfBusiness";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import InsuranceTipsPage from "@/pages/InsuranceTipsPage";

const HomePage = () => {
  return (
    <div className="min-h-screen" data-testid="homepage">
      <Header />
      <main>
        <HeroSection />
        <BestOfBusiness />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/insurance-tips" element={<InsuranceTipsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
