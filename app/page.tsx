"use client";
import "./globals.css";
import { BackgroundLinesDemo } from "@/components/heading";
//import { Mailer } from "@/components/form";
import Skills from "@/components/skills";
import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Projects  from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen text-white flex flex-col px-6">
      <FloatingNav navItems={navItems} />
      <section id="about" className="pt-24">
      <BackgroundLinesDemo />
      </section>
      <section id="skills" className="pt-24">
      <Skills />
      </section>
      <section id="projects" className="pt-24">
      <Projects />
      </section>
      <section id="contact" className="pt-24">
      <Contact/>
      </section>
    </main>
  );
}