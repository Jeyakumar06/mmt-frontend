import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import logo from "@assets/Mmt_Resorts_final_3D_PNG_1764946756666.png";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="block mb-6 cursor-pointer">
              <img src={logo} alt="MMT Resorts" className="h-16 bg-white/10 rounded-lg p-2 backdrop-blur-sm" />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed font-light">
              Experience the finest luxury beachfront villas in Chennai ECR. 
              Curated for exclusivity, comfort, and unforgettable memories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-6 text-accent">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/villas" className="text-gray-300 hover:text-accent transition-colors cursor-pointer flex items-center gap-2"><span className="text-accent">›</span> All Villas</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors cursor-pointer flex items-center gap-2"><span className="text-accent">›</span> About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-accent transition-colors cursor-pointer flex items-center gap-2"><span className="text-accent">›</span> Contact</Link></li>
              <li><Link href="/villas" className="text-gray-300 hover:text-accent transition-colors cursor-pointer flex items-center gap-2"><span className="text-accent">›</span> Private Pools</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-6 text-accent">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-300">
                <MapPin className="text-accent shrink-0 mt-1" size={20} />
                <span className="font-light">East Coast Road (ECR),<br />Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300">
                <Phone className="text-accent shrink-0" size={20} />
                <span className="font-light">+91 8940294931</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300">
                <Mail className="text-accent shrink-0" size={20} />
                <span className="font-light">bookings@mmtresorts.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} MMT Resorts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
