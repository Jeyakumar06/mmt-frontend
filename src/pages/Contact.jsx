import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Our sales team will contact you shortly.");
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to plan your getaway? Reach out to our team for personalized villa recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
          {/* Info Side */}
          <div className="bg-primary text-white p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -mr-24 -mt-24" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-bold mb-8">Get in Touch</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-gray-300">+91 8940294931</p>
                    <p className="text-gray-400 text-sm">Mon-Sun 9am to 9pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-gray-300">bookings@mmtresorts.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Office</h4>
                    <p className="text-gray-300">
                      123, East Coast Road (ECR),<br />
                      Uthandi, Chennai - 600119
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10">
              <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-accent" /> Quick Response
                </h4>
                <p className="text-sm text-gray-300">
                  We typically reply to WhatsApp inquiries within 15 minutes during business hours.
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12">
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input required type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="+91 98765..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input required type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea required rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="I'm looking for a 4BHK villa..."></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Map Embed */}
        <div className="mt-12 h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62229.30025865386!2d80.22601215493627!3d12.884647367228363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c665066b237%3A0x63003808e9313573!2sEast%20Coast%20Rd%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
