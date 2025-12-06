import { ShieldCheck, Users, Clock, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Our guides are born and raised in Belize, ready to share their culture and hidden gems with you.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Clock,
    title: 'Cruise Time Guarantee',
    description: 'Never worry about missing your ship. We guarantee to get you back to port at least 1 hour before departure.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Secure',
    description: 'Fully licensed and insured. We prioritize your safety with top-quality equipment and trained staff.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Heart,
    title: 'Personalized Service',
    description: 'Small groups and private options mean you get the attention you deserve, not just a seat on a bus.',
    color: 'bg-red-100 text-red-600'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-100 rounded-full opacity-50 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1534567059665-3f9e2269501c?q=80&w=1974&auto=format&fit=crop" 
              alt="Happy travelers in Belize" 
              className="relative rounded-3xl shadow-2xl w-full object-cover h-[600px]"
            />
            <div className="absolute bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  ))}
                </div>
                <span className="font-bold text-gray-900">10k+ Happy Guests</span>
              </div>
              <p className="text-gray-600 text-sm italic">
                "The best tour we've ever taken! The guide was amazing."
              </p>
            </div>
          </div>

          <div>
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Why Choose PBA</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">Experience Belize Like a Local, Not Just a Tourist</h2>
            <p className="text-gray-600 text-lg mb-10">
              We don't just show you the sights; we immerse you in the experience. From the moment you book until we drop you off, we handle every detail.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
