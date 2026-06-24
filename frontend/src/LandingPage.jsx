import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Capabilities from "./components/Capabilities";
import Comparison from "./components/Comparison";
import Ticker from "./components/Ticker";
import Footer from "./components/Footer";
import RequestAccessModal from "./components/RequestAccessModal";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white text-zinc-900 font-sans overflow-x-hidden">
      <Nav onRequestAccess={() => setModalOpen(true)} />
      <main>
        <Hero onRequestAccess={() => setModalOpen(true)} />
        <Metrics />
        <section id="capabilities">
          <Capabilities />
        </section>
        <section id="compare">
          <Comparison />
        </section>
        <section id="integrations">
          <Ticker />
        </section>
      </main>
      <Footer onRequestAccess={() => setModalOpen(true)} />
      <RequestAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
