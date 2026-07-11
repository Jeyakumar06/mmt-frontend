import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@assets/Mmt_Resorts_final_3D_PNG_1764946756666.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Villas", path: "/villas" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="block relative z-50 cursor-pointer">
            <img 
              src={logo} 
              alt="MMT Resorts" 
              className={`transition-all duration-300 ${scrolled || mobileMenuOpen ? "h-12 md:h-14" : "h-16 md:h-20"}`} 
            />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className={`font-medium text-sm uppercase tracking-widest hover:text-accent transition-colors cursor-pointer ${
                  location === link.path ? "text-accent font-bold" : scrolled ? "text-primary" : "text-white drop-shadow-md"
                }`}>
                {link.name}
            </Link>
          ))}  
           <Link
    href="/login"
    className="border border-primary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300"
  >
    Login
  </Link>
          <a
            href="https://wa.me/919080399924"
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white hover:text-accent transition-all duration-300 shadow-lg"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="text-primary" size={32} />
          ) : (
            <Menu className={`${scrolled ? "text-primary" : "text-white"}`} size={32} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-5 duration-300">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className={`text-2xl font-serif font-bold tracking-wide cursor-pointer ${
                  location === link.path ? "text-accent" : "text-primary"
                }`} onClick={() => setMobileMenuOpen(false)}>
                {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
