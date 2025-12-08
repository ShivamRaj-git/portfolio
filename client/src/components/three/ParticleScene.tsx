import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParticleSceneProps {
  className?: string;
}

export function ParticleScene({ className = "" }: ParticleSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const waveRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState(true);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    if (!container || !camera || !renderer) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
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
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false
      });
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const particleCount = window.innerWidth < 768 ? 800 : 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const neonColors = [
      new THREE.Color(0xFF10F0),
      new THREE.Color(0x00D9FF),
      new THREE.Color(0x39FF14),
      new THREE.Color(0x8B00FF),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    const waveGeometry = new THREE.PlaneGeometry(150, 150, 50, 50);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF10F0,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 2;
    waveMesh.position.y = -30;
    scene.add(waveMesh);
    waveRef.current = waveMesh;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      if (prefersReducedMotion) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        return;
      }

      time += 0.01;

      if (particlesRef.current) {
        const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positionsArray[i3] += velocities[i3];
          positionsArray[i3 + 1] += velocities[i3 + 1];
          positionsArray[i3 + 2] += velocities[i3 + 2];

          positionsArray[i3] += Math.sin(time + i * 0.1) * 0.02;
          positionsArray[i3 + 1] += Math.cos(time + i * 0.1) * 0.02;

          if (Math.abs(positionsArray[i3]) > 50) velocities[i3] *= -1;
          if (Math.abs(positionsArray[i3 + 1]) > 50) velocities[i3 + 1] *= -1;
          if (Math.abs(positionsArray[i3 + 2]) > 25) velocities[i3 + 2] *= -1;
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y = mouseRef.current.x * 0.2;
        particlesRef.current.rotation.x = mouseRef.current.y * 0.1;
      }

      if (waveRef.current) {
        const wavePositions = waveGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < wavePositions.length; i += 3) {
          const x = wavePositions[i];
          const y = wavePositions[i + 1];
          wavePositions[i + 2] = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time) * 3;
        }
        waveGeometry.attributes.position.needsUpdate = true;
        waveRef.current.rotation.z = time * 0.05;
      }

      cameraRef.current.position.x += (mouseRef.current.x * 5 - cameraRef.current.position.x) * 0.02;
      cameraRef.current.position.y += (mouseRef.current.y * 5 - cameraRef.current.position.y) * 0.02;
      cameraRef.current.lookAt(sceneRef.current.position);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      sceneRef.current = null;
      cameraRef.current = null;
      particlesRef.current = null;
      waveRef.current = null;
    };
  }, [handleResize, prefersReducedMotion]);

  if (!webglSupported) {
    return (
      <div 
        className={`absolute inset-0 ${className}`}
        data-testid="particle-scene-fallback"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-transparent to-neon-cyan/10" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      data-testid="particle-scene"
    />
  );
}
