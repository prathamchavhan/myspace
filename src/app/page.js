import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StarCursor from "@/components/StarCursor";
import Preloader from "@/components/Preloader";

export default function Page() {
  return (
    <>
      <Preloader />
      <div>
        <StarCursor />
        <Navbar />
        <Hero />
      </div>
    </>
  );
}