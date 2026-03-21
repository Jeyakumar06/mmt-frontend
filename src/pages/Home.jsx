import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Utensils, PartyPopper, Gamepad2, ChevronDown } from "lucide-react";
import { images } from "../data/images";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={images.heroBg} 
            alt="Luxury Villa Sunset" 
            className="w-full h-full object-cover animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>

        {/* Floating Orbs (Updated Colors) */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-float delay-1000" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-lg md:text-xl font-bold tracking-[0.25em] mb-6 text-accent uppercase drop-shadow-md">
              Make Memorable Trips
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight text-shadow-lg">
              Luxury ECR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">
                Beach View Villas
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 text-gray-100 drop-shadow-md">
              Experience the ultimate coastal getaway in Chennai's most exclusive private residences.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/villas" className="px-8 py-4 bg-accent text-primary font-bold rounded-full hover:bg-white transition-all duration-300 min-w-[200px] shadow-lg hover:shadow-accent/50 cursor-pointer border-2 border-accent">
                  Explore ECR Villas
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-white/50 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white hover:text-primary transition-all duration-300 min-w-[200px] cursor-pointer">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest opacity-70 font-medium">Scroll Down</span>
          <ChevronDown className="animate-bounce text-accent" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-primary">
              Premium Experiences
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              More than just a stay. We curate unforgettable moments for you and your loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Flame size={32} />}
              title="Campfire Experience"
              desc="Cozy evenings by the fire with music and marshmallows under the stars."
              delay={0}
            />
            <ServiceCard 
              icon={<Gamepad2 size={32} />}
              title="Indoor Games"
              desc="Pool tables, board games, and entertainment consoles for endless fun."
              delay={0.1}
            />
            <ServiceCard 
              icon={<Utensils size={32} />}
              title="Private Chef"
              desc="Gourmet meals prepared fresh in your villa by our expert culinary team."
              delay={0.2}
            />
            <ServiceCard 
              icon={<PartyPopper size={32} />}
              title="Event Hosting"
              desc="Perfect setups for birthdays, anniversaries, and intimate gatherings."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img src={images.droneShot} alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              25+ Exclusive Villas <br/>
              <span className="text-accent">One Destination</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
              From cozy 2BHK cottages to massive 8BHK mansions, we have the perfect space for every group size. All located on the scenic East Coast Road.
            </p>
            <Link href="/villas" className="inline-flex items-center gap-3 text-accent hover:text-white transition-colors text-lg font-bold group cursor-pointer uppercase tracking-wide">
                View Collection <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform hover:scale-105 transition-transform duration-500">
              <img src={images.villaPool} alt="Featured Villa" className="w-full" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-accent rounded-2xl z-0 hidden md:block" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border/50 group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-accent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
      
      <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-accent transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
