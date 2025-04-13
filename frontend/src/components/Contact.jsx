// Contact.jsx
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export default function Contact({ scrollToSection }) {
  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          <span className="text-white">Get In</span>{" "}
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
          Reach out to us to discuss your project needs or schedule a consultation with our 3D design experts.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="backdrop-blur-lg bg-[#160c36]/30 rounded-xl p-8 border border-violet-500/20 shadow-lg shadow-violet-900/10">
            <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-white/90">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-violet-400/70" />
                  </div>
                  <Input id="name" placeholder="Your name" className="pl-10 bg-[#0b0221]/50 border-violet-500/30 focus:border-violet-400 text-white" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-white/90">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-violet-400/70" />
                  </div>
                  <Input id="email" placeholder="Your email" className="pl-10 bg-[#0b0221]/50 border-violet-500/30 focus:border-violet-400 text-white" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-white/90">Message</label>
                <Textarea id="message" placeholder="Your message" rows={4} className="bg-[#0b0221]/50 border-violet-500/30 focus:border-violet-400 text-white resize-none" />
              </div>

              <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:opacity-90 transition-opacity border-none">
                Send Message
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-8 md:pl-10">
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#160c36]/70 rounded-lg border border-violet-500/20">
                  <MapPin size={20} className="text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Our Location</h4>
                  <p className="text-white/70">1234 Innovation Drive, Tech City, TC 10101</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#160c36]/70 rounded-lg border border-violet-500/20">
                  <Mail size={20} className="text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email Us</h4>
                  <p className="text-white/70">contact@3dstudio.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#160c36]/70 rounded-lg border border-violet-500/20">
                  <Phone size={20} className="text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Call Us</h4>
                  <p className="text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#160c36]/70 rounded-lg border border-violet-500/20">
                  <Clock size={20} className="text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Working Hours</h4>
                  <p className="text-white/70">Monday - Friday: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
