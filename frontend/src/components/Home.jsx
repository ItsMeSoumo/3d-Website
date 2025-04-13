// Home.jsx
import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Float, Sphere, Torus } from "@react-three/drei";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Suspense } from "react";
import * as THREE from "three";

// Custom hook for touch/drag interactions
function useInteractionDetection() {
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => {
      // Add small delay to prevent flickering between drag end and hover effects
      setTimeout(() => setIsDragging(false), 100);
    };
    
    // Add event listeners to document for better capture
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);
  
  return isDragging;
}

// Background spheres that only respond to mouse movement
function BackgroundSpheres() {
  const bg1 = useRef();
  const bg2 = useRef();
  const bg3 = useRef();
  const bg4 = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  useFrame(() => {
    // Smooth mouse movement with easier transition
    setSmoothMouse({
      x: THREE.MathUtils.lerp(smoothMouse.x, mouse.x, 0.02),
      y: THREE.MathUtils.lerp(smoothMouse.y, mouse.y, 0.02)
    });
    
    if (bg1.current && bg2.current && bg3.current && bg4.current) {
      // These spheres only respond to mouse movement, with different sensitivity
      
      // Far left sphere
      bg1.current.position.x = -5 + (smoothMouse.x * 1.5);
      bg1.current.position.y = 2 + (smoothMouse.y * 1);
      bg1.current.rotation.y += 0.003;
      bg1.current.rotation.z += 0.001;
      
      // Far right sphere
      bg2.current.position.x = 5 + (smoothMouse.x * 1.2);
      bg2.current.position.y = -2 + (smoothMouse.y * 0.8);
      bg2.current.rotation.y -= 0.002;
      bg2.current.rotation.x += 0.001;
      
      // Top sphere
      bg3.current.position.x = 1 + (smoothMouse.x * 0.7);
      bg3.current.position.y = 4 + (smoothMouse.y * 0.5);
      bg3.current.rotation.z += 0.002;
      bg3.current.rotation.x -= 0.001;
      
      // Bottom sphere
      bg4.current.position.x = -2 + (smoothMouse.x * 0.9);
      bg4.current.position.y = -4 + (smoothMouse.y * 0.6);
      bg4.current.rotation.y -= 0.003;
      bg4.current.rotation.z -= 0.001;
    }
  });
  
  return (
    <group>
      <Sphere args={[0.35, 32, 32]} position={[-5, 2, -4]} ref={bg1}>
        <meshPhysicalMaterial 
          color="#0ea5e9" 
          emissive="#0284c7"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={0.8}
        />
      </Sphere>
      
      <Sphere args={[0.4, 32, 32]} position={[5, -2, -5]} ref={bg2}>
        <meshPhysicalMaterial 
          color="#8b5cf6" 
          emissive="#6d28d9"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={0.8}
        />
      </Sphere>
      
      <Sphere args={[0.3, 32, 32]} position={[1, 4, -6]} ref={bg3}>
        <meshPhysicalMaterial 
          color="#ec4899" 
          emissive="#be185d"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={0.8}
        />
      </Sphere>
      
      <Sphere args={[0.25, 32, 32]} position={[-2, -4, -5]} ref={bg4}>
        <meshPhysicalMaterial 
          color="#10b981" 
          emissive="#047857"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={0.8}
        />
      </Sphere>
    </group>
  );
}

// Animated 3D Component
function SpaceObject() {
  const group = useRef();
  const sphere1 = useRef();
  const sphere2 = useRef();
  const sphere3 = useRef();
  const sphere4 = useRef();
  const sphere5 = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const isDragging = useInteractionDetection();
  const { viewport } = useThree();

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calculate normalized mouse positions (-1 to 1)
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    // Check if mouse is hovering over home section
    const handleMouseOver = () => {
      setIsHovering(true);
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };
    
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Add hover events to the home section
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.addEventListener('mouseenter', handleMouseOver);
      homeSection.addEventListener('mouseleave', handleMouseOut);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (homeSection) {
        homeSection.removeEventListener('mouseenter', handleMouseOver);
        homeSection.removeEventListener('mouseleave', handleMouseOut);
      }
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Smoother mouse movement with easier transition
    setSmoothMouse({
      x: THREE.MathUtils.lerp(smoothMouse.x, isHovering && !isDragging ? mouse.x : 0, 0.03),
      y: THREE.MathUtils.lerp(smoothMouse.y, isHovering && !isDragging ? mouse.y : 0, 0.03)
    });
    
    // Base animation
    const baseRotationX = Math.sin(t / 4) / 6;
    const baseRotationY = Math.sin(t / 2) / 2;
    
    // Add mouse movement influence only when hovering and not dragging
    const mouseRotationY = smoothMouse.x * 0.5;
    const mouseRotationX = smoothMouse.y * 0.3;
    
    // Only apply auto-rotation when not being dragged with OrbitControls
    if (!isDragging) {
      // Combine animations for main group (without scroll influence)
      group.current.rotation.x = baseRotationX + mouseRotationX;
      group.current.rotation.y = baseRotationY + mouseRotationY;
      
      // Small position adjustment based on mouse
      group.current.position.x = smoothMouse.x * 0.3;
      group.current.position.y = smoothMouse.y * 0.2;
    }
    
    // Animate spheres
    if (sphere1.current && sphere2.current && sphere3.current && sphere4.current && sphere5.current) {
      // Mouse distance for effects
      const mouseDistance = Math.sqrt(smoothMouse.x ** 2 + smoothMouse.y ** 2);
      
      // Orbital motion for sphere1 with mouse influence
      sphere1.current.position.x = 1.8 * Math.cos(t * 0.8) + (smoothMouse.x * 0.1);
      sphere1.current.position.y = 0 + (smoothMouse.y * 0.1);
      sphere1.current.position.z = 1.8 * Math.sin(t * 0.8);
      
      // Pulse size based on mouse distance
      const pulse1 = 0.15 + Math.sin(t * 2) * 0.02 + (mouseDistance * 0.02);
      sphere1.current.scale.set(pulse1, pulse1, pulse1);
      
      // Different orbital motion for sphere2 with mouse influence
      sphere2.current.position.x = -1.2 * Math.cos(t * 0.5) - (smoothMouse.x * 0.15);
      sphere2.current.position.y = 1.5 * Math.sin(t * 0.5) + (smoothMouse.y * 0.15);
      sphere2.current.position.z = 0.8 * Math.sin(t * 0.7);
      
      // Pulse size based on mouse movement
      const pulse2 = 0.1 + Math.sin(t * 3) * 0.01 + (mouseDistance * 0.01);
      sphere2.current.scale.set(pulse2, pulse2, pulse2);
      
      // Sphere 3 - Background smaller sphere
      sphere3.current.position.x = -2.2 * Math.sin(t * 0.3) - (smoothMouse.x * 0.05);
      sphere3.current.position.y = -1.2 * Math.cos(t * 0.4) + (smoothMouse.y * 0.05);
      sphere3.current.position.z = -0.5;
      const pulse3 = 0.08 + Math.sin(t * 1.5) * 0.01 + (mouseDistance * 0.005);
      sphere3.current.scale.set(pulse3, pulse3, pulse3);
      
      // Sphere 4 - Another background sphere
      sphere4.current.position.x = 2.5 * Math.cos(t * 0.2) + (smoothMouse.x * 0.1);
      sphere4.current.position.y = -1.8 * Math.sin(t * 0.3) - (smoothMouse.y * 0.05);
      sphere4.current.position.z = -1;
      const pulse4 = 0.12 + Math.sin(t * 2.5) * 0.015 + (mouseDistance * 0.01);
      sphere4.current.scale.set(pulse4, pulse4, pulse4);
      
      // Sphere 5 - Tiny distant sphere
      sphere5.current.position.x = -1.5 * Math.sin(t * 0.15) - (smoothMouse.x * 0.02);
      sphere5.current.position.y = 2 * Math.cos(t * 0.25) + (smoothMouse.y * 0.02);
      sphere5.current.position.z = -1.5;
      const pulse5 = 0.06 + Math.sin(t * 1.8) * 0.005;
      sphere5.current.scale.set(pulse5, pulse5, pulse5);
    }
  });

  return (
    <group ref={group}>
      {/* Central sphere */}
      <Sphere args={[1, 36, 36]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#8b5cf6" 
          roughness={0.2} 
          metalness={0.8}
          emissive="#4c1d95"
          emissiveIntensity={0.4}
        />
      </Sphere>
      
      {/* Orbital rings */}
      <Torus args={[1.8, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#8b5cf6" 
          roughness={0.3} 
          metalness={0.7}
          emissive="#a78bfa"
          emissiveIntensity={0.2}
        />
      </Torus>
      
      <Torus args={[2.2, 0.02, 16, 100]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <meshStandardMaterial 
          color="#c4b5fd" 
          roughness={0.3} 
          metalness={0.7}
          emissive="#a78bfa"
          emissiveIntensity={0.2}
        />
      </Torus>
      
      {/* Main orbiting spheres */}
      <Sphere args={[0.15, 24, 24]} position={[1.8, 0, 0]} ref={sphere1}>
        <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.6} />
      </Sphere>
      
      <Sphere args={[0.1, 24, 24]} position={[-1.2, 1.5, 0]} ref={sphere2}>
        <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={0.6} />
      </Sphere>
      
      {/* Additional background spheres */}
      <Sphere args={[0.08, 20, 20]} position={[-2.2, -1.2, -0.5]} ref={sphere3}>
        <meshStandardMaterial color="#c084fc" emissive="#8b5cf6" emissiveIntensity={0.4} />
      </Sphere>
      
      <Sphere args={[0.12, 20, 20]} position={[2.5, -1.8, -1]} ref={sphere4}>
        <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </Sphere>
      
      <Sphere args={[0.06, 16, 16]} position={[-1.5, 2, -1.5]} ref={sphere5}>
        <meshStandardMaterial color="#f9a8d4" emissive="#ec4899" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
}

function Home({ activeSection, setActiveSection, scrollToSection }) {
  return (
    <section
      id="home"
      className="min-h-screen pt-20 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
    >
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Creative{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
              3D Designs
            </span>{" "}
            for the Modern Web
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-lg">
            Bringing your ideas to life with cutting-edge 3D technology and beautiful UI design principles.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:opacity-90 transition-opacity border-none btn"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("about")}
              className="border-violet-500/30 hover:bg-violet-500/10 text-white btn"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 h-[400px] lg:h-[500px] mt-10 lg:mt-0">
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
              <pointLight position={[-10, -10, -10]} color="#a78bfa" intensity={1} />
              <PerspectiveCamera makeDefault position={[0, 0, 6]} />
              <BackgroundSpheres />
              <SpaceObject />
              <Environment preset="night" />
              <OrbitControls 
                enableZoom={false} 
                autoRotate={false} 
                enableRotate={true} 
                enablePan={false}
                rotateSpeed={0.7}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
                dampingFactor={0.05}
                domElement={document.getElementById('root')}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-violet-400" size={24} />
      </div>
    </section>
  );
}

export default Home;
