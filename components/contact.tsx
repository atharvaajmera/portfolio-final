"use client";

import React from "react";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconMail,
} from "@tabler/icons-react";
import Mailer from "./form";
import dynamic from "next/dynamic";

const ContactBackground = dynamic(() => import("./contact-background"), {
    ssr: false,
});

export default function Contact() {
    const socialLinks = [
        {
            title: "GitHub",
            icon: <IconBrandGithub className="w-5 h-5" />,
            href: "https://github.com/atharvaajmera",
        },
        {
            title: "LinkedIn",
            icon: <IconBrandLinkedin className="w-5 h-5" />,
            href: "https://www.linkedin.com/in/atharva-ajmera-790b10327/",
        },
        {
            title: "Email",
            icon: <IconMail className="w-5 h-5" />,
            href: "mailto:atharvaajmera06@gmail.com",
        },
    ];

    return (
        <section className="min-h-screen bg-[#0b0b0b] py-20 flex flex-col items-center justify-center relative overflow-hidden">
            <ContactBackground />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[15%] left-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-blue-400/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
                        Get in <span className="text-blue-500">Touch</span>
                    </h2>
                    <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed">
                        Have a project in mind or just want to say hi?
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                            {/* <div className="flex items-center gap-3 mb-3">
                                <div className="relative">
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                                </div>
                                <span className="text-sm font-semibold text-white">Open to opportunities</span>
                            </div> */}
                            <p className="text-sm text-white leading-relaxed">
                                Currently available for freelance projects and full-time roles.
                            </p>
                        </div>

                        <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
                            <div className="flex flex-col gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.title}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 hover:translate-x-1 hover:brightness-110"
                                        aria-label={link.title}
                                    >
                                        <span className="text-white group-hover:text-blue-400 transition-colors">
                                            {link.icon}
                                        </span>
                                        <span className="text-sm font-medium text-white group-hover:text-white transition-colors">
                                            {link.title}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-8 bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                        <Mailer />
                    </div>
                </div>
            </div>
        </section>
    );
}