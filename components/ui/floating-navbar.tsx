"use client";
import React from "react";
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
  return (
    <div
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
    </div>
  );
};