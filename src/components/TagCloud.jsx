import { useRef, useState, useEffect, useMemo } from 'react';

const TagCloud = ({ tags, minSpeed = 0.5, maxSpeed = 2 }) => {
    const containerRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const requestRef = useRef();
    const mouseRef = useRef({ x: 0, y: 0 });

    const radius = 200; // Radius of the sphere

    // Generate initial positions on a sphere (Fibonacci Sphere algorithm for even distribution)
    const items = useMemo(() => {
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
        return tags.map((tag, i) => {
            const y = 1 - (i / (tags.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y
            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            return { tag, x: x * radius, y: y * radius, z: z * radius };
        });
    }, [tags]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate mouse position relative to center of container (-1 to 1)
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

            // Limit speed
            mouseRef.current = {
                x: x * maxSpeed,
                y: -y * maxSpeed
            };
        };

        // Auto rotate slightly if no mouse interaction
        mouseRef.current = { x: 0.2, y: 0.2 };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [maxSpeed]);

    const animate = () => {
        setRotation(prev => ({
            x: prev.x + mouseRef.current.y * 0.02, // Rotate around X axis based on Mouse Y
            y: prev.y + mouseRef.current.x * 0.02, // Rotate around Y axis based on Mouse X
            z: prev.z
        }));
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const getTransform = (item, rot) => {
        // Rotate point (x,y,z) around origin by rot.x, rot.y, rot.z
        // 1. Rotate around X
        let y1 = item.y * Math.cos(rot.x) - item.z * Math.sin(rot.x);
        let z1 = item.y * Math.sin(rot.x) + item.z * Math.cos(rot.x);
        let x1 = item.x;

        // 2. Rotate around Y
        let x2 = x1 * Math.cos(rot.y) + z1 * Math.sin(rot.y);
        let z2 = -x1 * Math.sin(rot.y) + z1 * Math.cos(rot.y);
        let y2 = y1;

        // Perspective projection
        const scale = 300 / (300 - z2); // Simple perspective
        const alpha = (z2 + radius) / (2 * radius); // Opacity based on depth

        return {
            transform: `translate3d(${x2}px, ${y2}px, ${z2}px) scale(${scale})`,
            opacity: Math.max(0.1, alpha + 0.5),
            zIndex: Math.floor(scale * 100)
        };
    };

    return (
        <div
            ref={containerRef}
            className="relative w-[400px] h-[400px] mx-auto flex items-center justify-center perspective-[1000px] touch-none"
        >
            {items.map((item, i) => {
                const style = getTransform(item, rotation);
                return (
                    <div
                        key={i}
                        className="absolute text-primary font-bold text-lg select-none whitespace-nowrap will-change-transform"
                        style={style}
                    >
                        {item.tag}
                    </div>
                );
            })}
        </div>
    );
};

export default TagCloud;
