"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AexonAIChat from "@/components/AexonAIChat";
import Projects from "@/components/projects";

export default function ClientLayout() {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Products />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <AexonAIChat />
    </ThemeProvider>
  );
}
