import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { Typewriter } from "react-simple-typewriter";
import Aboutme from "@/components/aboutme";

export function HeroSection() {
  return (
    <div className="relative flex min-h-screen w-full bg-[#050505] antialiased flex-col items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:60px_60px] select-none opacity-[0.03]",
          "[background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]",
        )}
      />

      {/* Radial gradient spotlights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-zinc-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <Spotlight
        className="absolute -top-20 left-1/4 h-[80vh] w-[40vw]"
        fill="rgba(255, 255, 255, 0.05)"
      />

      <Spotlight
        className="absolute -top-20 right-1/4 h-[80vh] w-[40vw] scale-x-[-1]"
        fill="rgba(255, 255, 255, 0.05)"
      />

      <div className="relative z-20 mx-auto w-full max-w-4xl px-6 py-20 flex flex-col items-center">
        {/* Main heading with gradient name */}
        <h1 className="text-4xl md:text-6xl lg:text-9xl font-bold text-center tracking-tight">
          <span className="text-white">Hi! I&apos;m</span>{" "}
          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Atharva
          </span>
        </h1>

        {/* Typewriter with monospace font */}
        <div className="mt-6 h-12 flex items-center justify-center">
          <span className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-mono tracking-wide">
            <Typewriter
              words={["Full Stack Developer", "Tech Enthusiast", "Machine Learning Explorer"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </div>

        {/* CTA Button */}
        <a
          href="#projects"
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg
            bg-white/5 backdrop-blur-md border border-white/10
            hover:bg-white/10 hover:border-white/20
            shadow-[0_0_15px_rgba(255,255,255,0.1)]
            transform hover:scale-105 transition-all duration-300 ease-out group"
        >
          View My Work
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>

        {/* About section integrated below */}
        <div className="mt-24 w-full">
          <Aboutme />
        </div>
      </div>
    </div>
  );
}