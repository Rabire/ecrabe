import CallToAction from "./components/CallToAction";
import Faqs from "./components/Faqs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="unset-all !space-y-0">
        <Hero />
        {/* <PrimaryFeatures /> */}
        {/* <SecondaryFeatures /> */}
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
