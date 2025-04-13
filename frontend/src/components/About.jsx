// About.jsx
import { useEffect, useRef, useState } from 'react';
import { CodeBracketIcon, PaintBrushIcon, BoltIcon, DevicePhoneMobileIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function About({ scrollToSection }) {
    const cardsRef = useRef([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Initialize references
    useEffect(() => {
        // Setup the intersection observer for card animations
        const cards = cardsRef.current;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                // Add staggered animation delay based on card index
                const delay = idx * 100;
                
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('card-visible');
                    }, delay);
                } else {
                    entry.target.classList.remove('card-visible');
                }
            });
        }, { 
            root: null,
            rootMargin: '-10% 0px',
            threshold: 0.1
        });
        
        cards.forEach(card => {
            if (card) observer.observe(card);
        });
        
        return () => {
            cards.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);
    
    const features = [
      { 
        title: "Creative Design", 
        description: "We blend artistry with technology to create visually stunning 3D experiences that capture attention and imagination.",
        icon: <PaintBrushIcon className="w-6 h-6 text-violet-400" />
      },
      { 
        title: "3D Innovation", 
        description: "Pushing the boundaries of 3D web technology to deliver immersive, interactive elements that elevate your digital presence.",
        icon: <SparklesIcon className="w-6 h-6 text-violet-400" />
      },
      { 
        title: "User Experience", 
        description: "Crafting intuitive interfaces with smooth interactions that make complex 3D elements feel natural and engaging.",
        icon: <BoltIcon className="w-6 h-6 text-violet-400" />
      },
      { 
        title: "Responsive Development", 
        description: "Building websites that look and perform flawlessly across all devices, from desktop workstations to mobile phones.",
        icon: <DevicePhoneMobileIcon className="w-6 h-6 text-violet-400" />
      },
      { 
        title: "Performance Optimization", 
        description: "Ensuring fast load times and smooth animations through advanced optimization techniques for 3D assets.",
        icon: <ChartBarIcon className="w-6 h-6 text-violet-400" />
      },
      { 
        title: "Modern Aesthetics", 
        description: "Incorporating cutting-edge design principles with the latest visual trends to create distinctive digital experiences.",
        icon: <CodeBracketIcon className="w-6 h-6 text-violet-400" />
      },
    ];

    const handleMouseEnter = (index) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    return (
      <section id="about" className="min-h-screen py-20 relative">        
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            About{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
              Our Studio
            </span>
          </h2>
          
          <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
            We specialize in creating stunning 3D web experiences using cutting-edge technology 
            and innovative design principles to bring your digital vision to life.
          </p>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {features.map((item, index) => (
              <div
                key={index}
                id={`card-${index}`}
                ref={el => cardsRef.current[index] = el}
                className="backdrop-blur-lg bg-[#0c051e]/80 p-6 sm:p-8 border border-violet-500/20 
                  hover:border-violet-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 
                  group relative card-hidden transform translate-y-12 opacity-0 cursor-pointer octagon-shape"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Simple hover effect with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Dot pattern background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ 
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                ></div>
                
                <div className="mb-4 p-3 inline-block bg-[#160c36]/70 border border-violet-500/20 relative z-10
                  group-hover:scale-105 group-hover:bg-[#160c36]/90 group-hover:border-violet-500/40 transition-all duration-300 ease-out octagon-icon">
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 relative z-10 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                <p className="text-white/60 relative z-10 group-hover:text-white/90 transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  