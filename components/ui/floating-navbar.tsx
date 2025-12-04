"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import "./floating-navbar.css";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav = ({
  navItems,
  className = "",
}: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      
      if (typeof previous === "number") {
        const direction = current - previous;

        if (scrollYProgress.get() < 0.04) {
          setVisible(true);
        } else {
          if (direction < 0) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: 0,
            x: "-50%",
          }}
          animate={{
            y: 0,
            opacity: 1,
            x: "-50%",
          }}
          exit={{
            opacity: 0,
            y: -100,
            x: "-50%",
          }}
          transition={{
            duration: 0.2,
          }}
          className={`floating-nav ${className}`}
          style={{
            left: '50%',
          }}
        >
          {navItems.map((navItem, idx) => (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              className="floating-nav-link"
            >
              <span className="icon">{navItem.icon}</span>
              <span className="text">{navItem.name}</span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};