import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Tour } from "../types";
import HeroSection from "../components/home/HeroSection";
import FeaturedTours from "../components/home/FeaturedTours";
import DestinationsGrid from "../components/home/DestinationsGrid";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.get("/tours")
      .then((res) => setTours(res.data))
      .catch((err) => console.error("Failed to fetch tours", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <HeroSection />
      <FeaturedTours tours={tours} isLoading={isLoading} />
      <DestinationsGrid />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
