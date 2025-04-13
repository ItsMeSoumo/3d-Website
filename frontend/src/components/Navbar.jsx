// Navbar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0b0221]/50 border-b border-violet-500/30 shadow-lg shadow-violet-900/10 backdrop-saturate-150">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-md shadow-purple-500/30">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            3D Studio
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          {["home", "about", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize text-sm font-medium transition-all duration-300 bg-transparent border-none ${
                activeSection === section 
                  ? "text-white relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-violet-500/70 after:transition-all after:duration-300" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              {section}
            </button>
          ))}
        </nav>
        
        <button className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 btn">
          Sign In
        </button>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-[#0b0221]/60 border-b border-violet-500/30 shadow-lg shadow-violet-900/10 backdrop-saturate-150">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {["home", "about", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => {
                  scrollToSection(section);
                  setMobileMenuOpen(false);
                }}
                className={`capitalize text-sm font-medium transition-all duration-300 bg-transparent border-none ${
                  activeSection === section ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {section}
              </button>
            ))}
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 btn">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
