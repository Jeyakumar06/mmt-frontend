import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Zap,
  Tag,
  Heart,
} from "lucide-react";

const bookingTeam = [
  {
    name: "Mano",
    phone: "+91 9080399924",
  },
  {
    name: "",
    phone: "",
  },
  {
    name: "",
    phone: "",
  },
  {
    name: "",
    phone: "",
  },
];

const getInitials = (name) => {
  if (!name) return "";
  return name
    .trim()
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getWhatsAppLink = (phone) => {
  const digitsOnly = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digitsOnly}`;
};

const getCallLink = (phone) => `tel:${phone.replace(/\s+/g, "")}`;

const whyBookFeatures = [
  {
    icon: Zap,
    title: "Instant Booking Assistance",
    description:
      "Get real-time availability and confirmations without waiting on a form.",
  },
  {
    icon: Tag,
    title: "Best Price Guidance",
    description:
      "Our specialists help you find the right villa at the right price.",
  },
  {
    icon: Heart,
    title: "Personalized Villa Recommendations",
    description:
      "Tell us your dates and group size — we'll match you to the perfect stay.",
  },
  {
    icon: MessageCircle,
    title: "Quick WhatsApp Response",
    description: "Most WhatsApp inquiries are answered within 15 minutes.",
  },
];

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-3 mb-4">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const contactInfoCards = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 9080399924", "Mon – Sun, 9:00 AM to 9:00 PM"],
    href: "tel:+919080399924",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["mmtresorts@gmail.com", "We reply within one business day"],
    href: "mailto:mmtresorts@gmail.com",
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    lines: [
      "No 1/129, 1st Floor, Kovalam Road,",
      "Kelambakkam, Chengalpattu – 603 103",
    ],
  },
  {
    icon: Clock,
    title: "Quick Response",
    lines: ["We typically reply to WhatsApp", "inquiries within 15 minutes"],
  },
];

function ContactInfoCard({ icon: Icon, title, lines, href }) {
  const content = (
    <div className="group h-full bg-gradient-to-b from-white to-gray-50/60 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 p-10 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
        <Icon size={26} className="text-accent" />
      </div>
      <h4 className="font-serif font-bold text-lg text-primary mb-3">
        {title}
      </h4>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "text-gray-700 font-medium"
                : "text-sm text-muted-foreground"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block h-full">
      {content}
    </a>
  ) : (
    content
  );
}

function BookingExecutiveRow({ member }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
      {/* Verified badge (mobile) */}
      <div className="absolute top-6 right-6 md:hidden flex items-center gap-1 bg-primary/5 text-primary text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full border border-primary/10">
        <ShieldCheck size={12} />
        Verified
      </div>

      {/* Identity */}
      <div className="flex items-center gap-4 md:w-64 shrink-0">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white font-serif font-bold text-lg flex items-center justify-center ring-4 ring-primary/10">
            {getInitials(member.name)}
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-lg text-primary leading-tight">
            {member.name}
          </h4>
          <p className="text-xs text-muted-foreground tracking-wide uppercase">
            Booking Executive
          </p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            Available Today
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 md:flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-5 md:pt-0 md:pl-8">
        <div className="flex items-center gap-2.5 text-sm text-gray-600">
          <Phone size={14} className="text-accent shrink-0" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-600">
          <MessageCircle size={14} className="text-accent shrink-0" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-400">
          <Clock size={14} className="text-accent shrink-0" />
          <span>9:00 AM – 9:00 PM</span>
        </div>
        <div className="hidden md:flex items-center gap-1 bg-primary/5 text-primary text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full border border-primary/10 h-fit">
          <ShieldCheck size={12} />
          Verified
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 md:w-72 shrink-0">
        <a
          href={getCallLink(member.phone)}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <PhoneCall size={16} /> Call Now
        </a>
        <a
          href={getWhatsAppLink(member.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border border-primary/20 text-primary text-sm font-semibold py-3.5 rounded-xl hover:bg-primary/5 transition-colors"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  const activeBookingTeam = bookingTeam.filter(
    (member) => member.name && member.phone,
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Intro */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to plan your getaway? Reach out to our team for personalized
            villa recommendations.
          </p>
        </div>

        {/* Section 1: Get In Touch */}
        <section className="mb-20">
          <SectionHeader
            eyebrow="Concierge Contact"
            title="Get In Touch"
            subtitle="Reach us the way that suits you best — our concierge team is always within reach."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {contactInfoCards.map((card, index) => (
              <ContactInfoCard key={index} {...card} />
            ))}
          </div>
        </section>

        {/* Section 2: Meet Our Booking Experts (primary CTA) */}
        <section className="mb-20">
          <SectionHeader
            eyebrow="Talk To Us Directly"
            title="Meet Our Booking Experts"
            subtitle="Our dedicated booking specialists are here to help you choose the perfect villa, tailored to your dates, group size, and preferences — a personal touch, not a form."
          />
          <div className="space-y-5">
            {activeBookingTeam.map((member, index) => (
              <BookingExecutiveRow key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Section 3: Why Book With Us */}
        <section className="mb-20">
          <SectionHeader eyebrow="The Advantage" title="Why Book With Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBookFeatures.map(
              ({ icon: Icon, title, description }, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-7 text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h4 className="font-serif font-bold text-primary mb-2">
                    {title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Section 4: Google Maps */}
        <section>
          <SectionHeader eyebrow="Find Us" title="Our Location" />
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3890.879944580781!2d80.221131!3d12.786304000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDQ3JzEwLjciTiA4MMKwMTMnMTYuMSJF!5e0!3m2!1sen!2sin!4v1783747552017!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
