import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SkillSphereProps {
  className?: string;
}

export function SkillSphere({ className = "" }: SkillSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState(true);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    if (!container || !rendererRef.current) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    rendererRef.current.setSize(width, height);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        failIfMajorPerformanceCaveat: false
      });
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = new THREE.Group();
    scene.add(group);

    const ringCount = 3;
    const neonColors = [0xFF10F0, 0x00D9FF, 0x39FF14];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    for (let i = 0; i < ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(1.5 + i * 0.3, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: neonColors[i % neonColors.length],
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + (i * Math.PI) / 6;
      ring.rotation.y = (i * Math.PI) / 4;
      group.add(ring);
      geometries.push(ringGeometry);
      materials.push(ringMaterial);
    }

    const sphereGeometry = new THREE.IcosahedronGeometry(1, 1);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF10F0,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(sphere);
    geometries.push(sphereGeometry);
    materials.push(sphereMaterial);

    const innerSphereGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const innerSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
    group.add(innerSphere);
    geometries.push(innerSphereGeometry);
    materials.push(innerSphereMaterial);

    const pointCount = 50;
    const pointsGeometry = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.8 + Math.random() * 0.5;
      
      pointPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pointPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pointPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color(neonColors[Math.floor(Math.random() * neonColors.length)]);
      pointColors[i * 3] = color.r;
      pointColors[i * 3 + 1] = color.g;
      pointColors[i * 3 + 2] = color.b;
    }

    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);
    geometries.push(pointsGeometry);
    materials.push(pointsMaterial);

    window.addEventListener("resize", handleResize);

    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!rendererRef.current) return;
      
      if (prefersReducedMotion) {
        rendererRef.current.render(scene, camera);
        return;
      }

      time += 0.005;

      group.rotation.x = time * 0.3;
      group.rotation.y = time * 0.5;

      sphere.rotation.x = time * 0.2;
      sphere.rotation.z = time * 0.3;

      innerSphere.rotation.y = -time * 0.8;
      innerSphere.rotation.z = time * 0.4;

      group.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
          child.rotation.z = time * (0.2 + index * 0.1);
        }
      });

      rendererRef.current.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [handleResize, prefersReducedMotion]);

  if (!webglSupported) {
    return (
      <div 
        className={`w-full h-full flex items-center justify-center ${className}`}
        data-testid="skill-sphere-fallback"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <div className="absolute inset-0 border-2 border-neon-pink rounded-full animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-4 border-2 border-neon-cyan rounded-full animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
          <div className="absolute inset-8 border-2 border-neon-green rounded-full animate-spin" style={{ animationDuration: "4s" }} />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      data-testid="skill-sphere"
    />
  );
}
