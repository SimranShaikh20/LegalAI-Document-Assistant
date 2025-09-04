import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DocumentUpload from "@/components/DocumentUpload";
import RiskDashboard from "@/components/RiskDashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <DocumentUpload />
      <RiskDashboard />
    </div>
  );
};

export default Index;
