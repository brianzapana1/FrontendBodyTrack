// src/components/Layout.jsx  ←  Versión FINAL y perfecta
import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import useReveal from "../hooks/useReveal";

export default function Layout({ children }) {
  useReveal();

  useEffect(() => {
    // Ripple effect
    const handleRipple = (e) => {
      const b = e.target.closest(".btn, .pill, .ghostBtn");
      if (!b) return;

      const r = document.createElement("span");
      const rect = b.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      r.style.cssText = `
        position: absolute;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(255,255,255,.45), transparent 60%);
        transform: scale(0);
        animation: ripple .6s ease;
        pointer-events: none;
        mix-blend-mode: screen;
      `;

      if (getComputedStyle(b).position === "static") b.style.position = "relative";
      b.appendChild(r);
      r.addEventListener("animationend", () => r.remove());
    };

    // Navbar shadow
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
    };

    document.addEventListener("click", handleRipple);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      document.removeEventListener("click", handleRipple);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}