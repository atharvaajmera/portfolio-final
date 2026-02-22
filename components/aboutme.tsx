import { motion } from "framer-motion";

export default function Aboutme() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full max-w-[750px] mx-auto px-4"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-left">
        About <span className="text-blue-500">Me</span>
      </h2>
      <div className="text-left text-white leading-relaxed space-y-4">
        <p className="text-base md:text-lg">
          I&apos;m a <span className="text-white font-semibold">Full-Stack Developer</span> driven by a simple habit: I love building things and I never stop being curious. My work is fueled by a constant urge to explore new tech stacks and see how different pieces of a system fit together.
        </p>
        <p className="text-base md:text-lg">
          When I&apos;m not at my desk, I&apos;m usually swapping code for a different kind of immersion - whether that&apos;s listening to songs or diving into a game. For me, it&apos;s all about the thrill of the &quot;new,&quot; whether it&apos;s a fresh playlist, discovering new artists, or a challenging level.
        </p>
      </div>
    </motion.div>
  );
}
