import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { Typewriter } from "react-simple-typewriter";
import Aboutme from "@/components/aboutme";
import dynamic from "next/dynamic";

const InteractiveShape = dynamic(() => import("@/components/interactive-shape"), {
  ssr: false,
});

export function HeroSection() {
  return (
    <div className="relative flex w-full bg-[#050505] antialiased flex-col items-center justify-start overflow-hidden pt-6 pb-12">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:60px_60px] select-none opacity-[0.03]",
          "[background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]",
        )}
      />

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

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-4 min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-left tracking-tight">
              <span className="text-white"> Hi! I&apos;m</span>{" "}<br />
              <span className="text-blue-500">
                Atharva
              </span>
            </h1>

            <div className="h-12 flex items-start">
              <span className="text-xl md:text-2xl text-white font-mono tracking-wide">
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
          </div>

          <div className="hidden lg:flex items-center justify-center h-[500px]">
            <InteractiveShape />
          </div>
        </div>

        <div className="mt-24 w-full flex justify-center">
          <Aboutme />
        </div>
      </div>
    </div>
  );
}