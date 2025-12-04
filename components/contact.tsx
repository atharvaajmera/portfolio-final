import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconMail,
} from "@tabler/icons-react";
import Mailer from "./form";
import { motion } from "framer-motion";

export default function Contact() {
    const links = [
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "https://github.com/Atharva-3000",
        },
        {
            title: "LinkedIn",
            icon: (
                <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "https://www.linkedin.com/in/atharva-pawar-56060625a/",
        },
        {
            title: "Email",
            icon: (
                <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "mailto:atharvapawar2005@gmail.com",
        },
    ];
    return (
        <section className="min-h-screen bg-[#050505] py-20 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-white/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-teal-500/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative z-10 w-full max-w-6xl px-6"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                    Get in Touch
                </h2>
                <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
                    Have a project in mind or just want to say hi? Feel free to reach out
                    through social media or send me a message directly.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Social Links Card */}
                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex flex-col justify-center items-center h-full">
                        <h3 className="text-2xl font-bold text-white mb-10">
                            Connect with me
                        </h3>
                        <FloatingDock items={links} />
                    </div>

                    {/* Contact Form Card */}
                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Send a Message
                        </h3>
                        <Mailer />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}