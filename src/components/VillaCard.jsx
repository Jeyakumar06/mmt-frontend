import { Link } from "wouter";
import { Users, Droplets, Waves, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function VillaCard({ villa, index = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={villa.images[0]} 
          alt={villa.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
          {villa.bhk} BHK
        </div>
        {villa.beachView && (
          <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
            Beach View
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">{villa.name}</h3>
            <p className="text-muted-foreground text-sm">{villa.location}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">₹{villa.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
        </div>
        
        <div className="flex gap-4 mb-6 py-4 border-t border-border/50 border-b">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} className="text-accent" />
            <span>{villa.guestCapacity} Guests</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Droplets size={16} className="text-accent" />
            <span>{villa.pool} Pool</span>
          </div>
        </div>
        
        <Link href={`/villa/${villa.id}`} className="block w-full text-center bg-primary text-white py-3 rounded-lg font-medium hover:bg-accent hover:text-primary transition-all duration-300 group-hover:shadow-lg cursor-pointer">
            View Details
        </Link>
      </div>
    </motion.div>
  );
}
