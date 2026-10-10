/**
 * HYDRA MOTORSPORT - Official Website
 * Brand Identity: RACING. ENGINEERING. TECHNOLOGY.
 * Interactive 2026 F1-Inspired Background: HYDRA HYPERDRIVE
 */

import React, { useState, useEffect } from 'react';
import { HydraHyperdriveCanvas } from './components/background/HydraHyperdriveCanvas';
import { BackgroundControlsHUD } from './components/background/BackgroundControlsHUD';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { DivisionsSection } from './components/divisions/DivisionsSection';
import { BusinessModelSection } from './components/business/BusinessModelSection';
import { RacingPathwaySection } from './components/racing/RacingPathwaySection';
import { EngineeringTechSection } from './components/engineering/EngineeringTechSection';
import { PowerSection } from './components/power/PowerSection';
import { AcademyMediaSection } from './components/academy/AcademyMediaSection';
import { AmbitionSection } from './components/ambition/AmbitionSection';
import { RevenueSection } from './components/revenue/RevenueSection';
import { PartnersSection } from './components/partners/PartnersSection';
import { FounderSection } from './components/founder/FounderSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [aeroTrailsEnabled, setAeroTrailsEnabled] = useState<boolean>(true);
  const [trailDensity, setTrailDensity] = useState<'subtle' | 'dense' | 'off'>('dense');
  const [isOpeningDone, setIsOpeningDone] = useState<boolean>(false);
  const [selectedPathway, setSelectedPathway] = useState<string>('Technical Partnership');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'divisions',
      'business-model',
      'racing',
      'technology',
      'power',
      'academy',
      'ambition',
      'revenue',
      'partners',
      'founder',
      'contact',
    ];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPathway = (pathway: string) => {
    setSelectedPathway(pathway);
    scrollTo('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* 1. HYDRA HYPERDRIVE: Unique Interactive 2026 F1 3D Background */}
      <HydraHyperdriveCanvas
        wireframeMode={wireframeMode}
        aeroTrailsEnabled={aeroTrailsEnabled}
        trailDensity={trailDensity}
        activeSection={activeSection}
        isOpeningDone={isOpeningDone}
        onOpeningComplete={() => setIsOpeningDone(true)}
      />

      {/* 2. Top Navigation Bar (Adhering to Top Bar Contract) */}
      <Navbar activeSection={activeSection} />

      {/* 3. Main Content Sections */}
      <main className="relative z-10">
        {/* Section 02: Opening Hero Animation & Content */}
        <HeroSection
          onExploreClick={() => scrollTo('about')}
          onPartnerClick={() => scrollTo('contact')}
        />

        {/* Section 07: About HYDRA Motorsport */}
        <AboutSection />

        {/* Section 08: Six HYDRA Divisions */}
        <DivisionsSection />

        {/* Section 09: Interactive Business Model Visualization */}
        <BusinessModelSection />

        {/* Section 10: Racing Pathway (Karting -> FREC -> F3 -> F2 -> F1) */}
        <RacingPathwaySection />

        {/* Section 11: Engineering and Technology (7-step cycle + 7 technical panels) */}
        <EngineeringTechSection />

        {/* Section 12: HYDRA Power — Long-Term Vision */}
        <PowerSection />

        {/* Section 13: HYDRA Academy and Media */}
        <AcademyMediaSection />

        {/* Section 14: Long-Term Ambition */}
        <AmbitionSection onPartnerClick={() => scrollTo('contact')} />

        {/* Section 15: Business Model and Revenue (8 Streams) */}
        <RevenueSection />

        {/* Section 16: Partners, Sponsors and Investors */}
        <PartnersSection onSelectPathway={handleSelectPathway} />

        {/* Section 17: Founder Sandy SK */}
        <FounderSection />

        {/* Section 18: Contact and Enquiries */}
        <ContactSection initialEnquiryType={selectedPathway} />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Interactive HUD for Background Viewport Controls */}
      <BackgroundControlsHUD
        wireframeMode={wireframeMode}
        onToggleWireframe={() => setWireframeMode(!wireframeMode)}
        aeroTrailsEnabled={aeroTrailsEnabled}
        onToggleAeroTrails={() => setAeroTrailsEnabled(!aeroTrailsEnabled)}
        trailDensity={trailDensity}
        onChangeTrailDensity={(density) => setTrailDensity(density)}
      />
    </div>
  );
}
