import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HeroSection } from "./hero";

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col min-h-screen">
      <HeroSection />
    </BackgroundLines>
  );
}
