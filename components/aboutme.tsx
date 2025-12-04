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
        About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
      </h2>
      <div className="text-left text-gray-300 leading-relaxed space-y-4">
        <p className="text-base md:text-lg">
          Hey there! I&apos;m Atharva, an <span className="text-white font-semibold">Electrical Engineering</span> undergrad at{" "}
          <span className="text-white font-semibold">IIT Jodhpur</span> with a deep curiosity for technology and intelligent systems.
        </p>
        <p className="text-base md:text-lg">
          I love diving into <span className="text-white font-semibold">Machine Learning</span> and{" "}
          <span className="text-white font-semibold">full-stack web development</span>, exploring how smart algorithms and thoughtful
          design can come together to solve real problems.
        </p>
        <p className="text-base md:text-lg">
          I&apos;m driven by the thrill of learning something new every day — whether that&apos;s understanding how models think,
          optimizing code for performance, or just experimenting with new tech stacks. When I&apos;m not coding, you&apos;ll
          probably find me reading mystery novels, exploring UI design ideas, or getting lost in a good technical rabbit hole.
        </p>
        <p className="text-base md:text-lg text-gray-400 italic">
          Always learning, always building, and always curious — that&apos;s pretty much me in a nutshell.
        </p>
      </div>
    </motion.div>
  );
}
