import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FileText, Activity, Pen } from "lucide-react";
import { motion } from "framer-motion";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/5"></div>
);

const items = [
  {
    title: "HealthConnect",
    description:
      "A full-fledged healthcare management platform with live ambulance tracking, digital queue tokens, doctor scheduling, admin dashboards, and referral support.",
    header: <Skeleton />,
    icon: <Activity className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "TestiFy",
    description:
      "AI-powered tool that generates structured test papers from topics using the Gemini API.",
    header: <Skeleton />,
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <Pen className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
];

export default function Projects() {

  return (
    <section className="relative z-10 min-h-screen bg-[#050505] py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Some of my <span className="text-teal-400">Projects</span>
        </h2>
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  );
}