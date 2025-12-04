"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundLines = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "h-[20rem] md:h-screen w-full bg-black relative",
        className
      )}
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left blue glow */}
        <div
          className="absolute top-0 left-0 w-[50vw] h-[50vh] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.3) 0%, transparent 60%)'
          }}
        />
        {/* Top right purple glow */}
        <div
          className="absolute top-0 right-0 w-[50vw] h-[50vh] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(147, 51, 234, 0.3) 0%, transparent 60%)'
          }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)'
          }}
        />
      </div>
      {children}
    </div>
  );
};
