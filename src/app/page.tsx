"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MeetingModal from "@/components/MeetingModal";
import LogoLoop from "@/components/LogoLoop";
import ScrollReveal from "@/components/ScrollReveal";
import Preloader from "@/components/Preloader";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFigma } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", ariaLabel: "React" },
  { node: <SiNextdotjs />, title: "Next.js", ariaLabel: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript", ariaLabel: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", ariaLabel: "Tailwind CSS" },
  { node: <SiNodedotjs />, title: "Node.js", ariaLabel: "Node.js" },
  { node: <SiFigma />, title: "Figma", ariaLabel: "Figma" },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Preloader />
      <Navbar onBookCall={() => setModalOpen(true)} />
      <HeroSection onBookCall={() => setModalOpen(true)} />

      <div style={{ height: '120px', position: 'relative', overflow: 'hidden', background: 'var(--color-bg-primary)', display: 'flex', alignItems: 'center' }}>
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={36}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--color-bg-primary)"
          ariaLabel="Technology partners"
        />
      </div>

      <BentoGrid />


      <style>{`
        .scroll-quote-text {
          font-size: clamp(2rem, 5vw, 4rem) !important;
          line-height: 1.2 !important;
          font-weight: 700 !important;
          letter-spacing: -0.02em !important;
        }
      `}</style>

      <ProcessSection />
      <PortfolioSection />
      <CTASection onBookCall={() => setModalOpen(true)} />
      <Footer />
      {modalOpen && <MeetingModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
