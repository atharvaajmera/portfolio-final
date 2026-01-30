"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle system
        const particleCount = 150;
        const positions = new Float32Array(particleCount * 3);
        const velocities: number[] = [];

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 80;
            positions[i + 1] = (Math.random() - 0.5) * 80;
            positions[i + 2] = (Math.random() - 0.5) * 40;

            velocities.push(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x3b82f6,
            size: 0.15,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Mouse interaction
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / width) * 2 - 1;
            mouseRef.current.y = -(event.clientY / height) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const positions = particles.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Boundary check
                if (Math.abs(positions[i]) > 40) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 40) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 20) velocities[i + 2] *= -1;
            }

            particles.geometry.attributes.position.needsUpdate = true;

            // Gentle parallax
            particles.rotation.x += mouseRef.current.y * 0.0005;
            particles.rotation.y += mouseRef.current.x * 0.0005;

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{ opacity: 0.15 }}
        />
    );
}
