import { images } from "../data/images";
import { Shield, Star, Heart, Users } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="container mx-auto px-4 mb-16">
        <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] shadow-2xl">
          <img src={images.droneShot} alt="ECR Coastline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">About MMT Resorts</h1>
              <p className="text-xl opacity-90">Redefining luxury hospitality along Chennai's East Coast Road.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-accent mb-6" />
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              Founded with a passion for the sea and hospitality, MMT Resorts began as a boutique collection of private beach houses. Today, we manage over 25 premium properties along the scenic ECR stretch.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              We believe that a vacation should be more than just a room. It should be an experience—waking up to the sound of waves, enjoying a private pool under the stars, and creating memories that last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={images.villaExt} className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Villa Exterior" />
            <img src={images.villaBed} className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" alt="Villa Interior" />
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-primary text-white rounded-3xl p-12 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl font-serif font-bold">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
              <p className="text-gray-400">Every property is physically verified for quality.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Service</h3>
              <p className="text-gray-400">24/7 concierge and on-call support.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Experiences</h3>
              <p className="text-gray-400">Chefs, decor, and events tailored for you.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Happy Guests</h3>
              <p className="text-gray-400">Over 10,000+ satisfied families and groups.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
