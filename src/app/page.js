import Home from "@/components/hero/page";
import Background from "@/components/background";
import { RocketSection } from "@/components/RocketSection";

export default function Page() {
  return (
    <div>
      <div className="relative">
        <Home />
      </div>

      {/* Section below Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        <Background />
      </section>

      {/* Feature SaaS Section */}
      <RocketSection />
    </div>
  );
}