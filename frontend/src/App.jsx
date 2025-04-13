import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

// Floating decorative spheres distributed across the page
function FloatingDecoration() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-5 pointer-events-none overflow-hidden">
      {/* Top left sphere */}
      <div className="absolute top-[10%] left-[5%] w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/60 to-fuchsia-400/60 shadow-lg shadow-violet-500/20 blur-[1px] animate-float-slow"></div>
      
      {/* Top right sphere */}
      <div className="absolute top-[15%] right-[8%] w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/50 to-cyan-300/50 shadow-lg shadow-blue-500/20 blur-[1px] animate-float"></div>
      
      {/* Middle left sphere */}
      <div className="absolute top-[35%] left-[15%] w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/40 to-rose-400/40 shadow-lg shadow-pink-500/20 blur-[1px] animate-float-slow-reverse"></div>
      
      {/* Bottom left sphere */}
      <div className="absolute bottom-[20%] left-[10%] w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400/40 to-purple-300/40 shadow-lg shadow-indigo-500/20 blur-[1px] animate-float-medium"></div>
      
      {/* Bottom right large sphere */}
      <div className="absolute bottom-[25%] right-[5%] w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-400/30 shadow-lg shadow-indigo-500/20 blur-[1px] animate-float-slow"></div>
      
      {/* Small spheres scattered around */}
      <div className="absolute top-[60%] right-[25%] w-4 h-4 rounded-full bg-gradient-to-br from-white/30 to-gray-300/30 shadow-lg shadow-white/10 blur-[1px] animate-pulse"></div>
      <div className="absolute top-[75%] left-[30%] w-5 h-5 rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-300/20 shadow-lg shadow-violet-500/10 blur-[1px] animate-float-medium-reverse"></div>
      <div className="absolute top-[45%] right-[15%] w-3 h-3 rounded-full bg-gradient-to-br from-violet-400/40 to-fuchsia-300/40 shadow-lg shadow-violet-500/20 blur-[1px] animate-float-fast"></div>
      
      {/* Tiny accent dots */}
      <div className="absolute top-[25%] left-[40%] w-2 h-2 rounded-full bg-white/40 blur-[1px] animate-pulse"></div>
      <div className="absolute top-[80%] right-[40%] w-2 h-2 rounded-full bg-white/40 blur-[1px] animate-pulse"></div>
      <div className="absolute top-[10%] left-[60%] w-2 h-2 rounded-full bg-white/40 blur-[1px] animate-pulse"></div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container min-h-screen bg-opacity-90 overflow-hidden">
      {/* Space-themed background elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        {/* Main glow elements */}
        <div className="absolute top-0 left-1/4 w-2/3 h-2/3 rounded-full bg-purple-900/20 filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 rounded-full bg-indigo-900/20 filter blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 rounded-full bg-violet-800/10 filter blur-[80px]"></div>
        
        {/* Small floating particles */}
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-cyan-300/50"></div>
        <div className="absolute top-[70%] left-[30%] w-3 h-3 rounded-full bg-purple-400/40"></div>
        <div className="absolute top-[40%] right-[15%] w-2 h-2 rounded-full bg-blue-300/60"></div>
        <div className="absolute top-[25%] right-[25%] w-1 h-1 rounded-full bg-white/70"></div>
        <div className="absolute bottom-[20%] right-[40%] w-2 h-2 rounded-full bg-teal-300/50"></div>
        <div className="absolute bottom-[30%] left-[20%] w-1 h-1 rounded-full bg-white/60"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
      </div>
      
      {/* Floating decorative spheres */}
      <FloatingDecoration />
      
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
      <main className="content-wrapper">
        <Home scrollToSection={scrollToSection} activeSection={activeSection} setActiveSection={setActiveSection} />
        <About scrollToSection={scrollToSection} />
        <Contact scrollToSection={scrollToSection} />
      </main>
    </div>
  );
}

export default App;
