import Hero from "@/components/Hero";
import TheName from "@/components/TheName";
import TheProblem from "@/components/TheProblem";
import WhatIsBuilt from "@/components/WhatIsBuilt";
import TheFuture from "@/components/TheFuture";
import WhyBuilt from "@/components/WhyBuilt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TheName />
      <TheProblem />
      <WhatIsBuilt />
      <TheFuture />
      <WhyBuilt />
      <Footer />
    </main>
  );
}
