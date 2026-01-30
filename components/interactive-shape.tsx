"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CodeBlock extends THREE.LineSegments {
    originalPosition: THREE.Vector3;
    randomOffset: number;
}

export default function InteractiveShape() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create code-like cubes representing data/functions
        const codeBlocks: CodeBlock[] = [];
        const codeGroup = new THREE.Group();

        // Create a grid of cubes like code blocks
        const gridSize = 5;
        const spacing = 1.5;

        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                for (let z = 0; z < gridSize; z++) {
                    if (Math.random() > 0.7) {
                        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
                        const edges = new THREE.EdgesGeometry(geometry);

                        // Different colors for different "types" of code elements
                        const colorIndex = Math.floor(Math.random() * 4);
                        const colors = [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x10b981];

                        const lineMaterial = new THREE.LineBasicMaterial({
                            color: colors[colorIndex],
                            transparent: true,
                            opacity: 0.8,
                        });

                        const cube = new THREE.LineSegments(edges, lineMaterial) as unknown as CodeBlock;
                        cube.position.set(
                            (x - gridSize / 2) * spacing,
                            (y - gridSize / 2) * spacing,
                            (z - gridSize / 2) * spacing
                        );

                        cube.originalPosition = cube.position.clone();
                        cube.randomOffset = Math.random() * Math.PI * 2;

                        codeBlocks.push(cube);
                        codeGroup.add(cube);
                    }
                }
            }
        }

        scene.add(codeGroup);

        // Create connections between random blocks (like function calls)
        const connections: THREE.Line[] = [];
        for (let i = 0; i < 20; i++) {
            const block1 = codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
            const block2 = codeBlocks[Math.floor(Math.random() * codeBlocks.length)];

            if (block1 !== block2) {
                const points = [block1.position, block2.position];
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0x3b82f6,
                    transparent: true,
                    opacity: 0.2,
                });
                const line = new THREE.Line(lineGeometry, lineMaterial);
                connections.push(line);
                codeGroup.add(line);
            }
        }

        // Add binary rain particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 200;
        const posArray = new Float32Array(particlesCount * 3);
        const velocities: number[] = [];

        for (let i = 0; i < particlesCount; i++) {
            posArray[i * 3] = (Math.random() - 0.5) * 15;
            posArray[i * 3 + 1] = Math.random() * 15 - 5;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 15;
            velocities.push(0.02 + Math.random() * 0.03);
        }

        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: 0x00ff88,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });

        const particlesMesh = new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );
        scene.add(particlesMesh);

        // Mouse move handler
        const handleMouseMove = (event: MouseEvent) => {
            mousePosition.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1,
            };
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Rotate entire code structure
            codeGroup.rotation.y = elapsedTime * 0.15;
            codeGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;

            // Make it responsive to mouse
            codeGroup.rotation.x += mousePosition.current.y * 0.2;
            codeGroup.rotation.y += mousePosition.current.x * 0.2;

            // Animate individual code blocks (like functions executing)
            codeBlocks.forEach((block) => {
                const offset = block.randomOffset;
                const scale = 1 + Math.sin(elapsedTime * 2 + offset) * 0.15;
                block.scale.set(scale, scale, scale);

                // Pulsing opacity
                (block.material as THREE.LineBasicMaterial).opacity =
                    0.5 + Math.sin(elapsedTime * 3 + offset) * 0.3;
            });

            // Update connection lines opacity (like data flow)
            connections.forEach((line, i) => {
                (line.material as THREE.LineBasicMaterial).opacity =
                    0.1 + Math.sin(elapsedTime * 2 + i) * 0.15;
            });

            // Animate binary rain
            const positions = particlesGeometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particlesCount; i++) {
                positions[i * 3 + 1] -= velocities[i];

                // Reset particles that fall too far
                if (positions[i * 3 + 1] < -8) {
                    positions[i * 3 + 1] = 8;
                }
            }
            particlesGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (container && renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
            codeBlocks.forEach((block) => {
                block.geometry.dispose();
                (block.material as THREE.Material).dispose();
            });
            connections.forEach((line) => {
                line.geometry.dispose();
                (line.material as THREE.Material).dispose();
            });
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ minHeight: "400px" }}
        />
    );
}

