import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import WhyUs from "./components/home/WhyUs";
// import HowItWorks from "./components/home/HowItWorks";
// import Stats from "./components/home/Stats";
// import CTA from "./components/home/CTA";
// import Testimonials from "./components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="pt-20">
      <Hero />
      <Services />
      <WhyUs />
      {/* <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA /> */}
    </div>
  );
}