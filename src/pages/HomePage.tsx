import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  MessageSquare
} from 'lucide-react';

const StepCard = ({ icon, title, description, index }: { icon: React.ReactNode, title: string, description: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="glass-card p-8 flex flex-col items-center text-center group hover:bg-white/10 transition-all"
  >
    <div className="w-16 h-16 bg-luxury-beige/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <div className="text-luxury-beige">{icon}</div>
    </div>
    <h3 className="text-xl font-display font-bold mb-4">{title}</h3>
    <p className="text-luxury-white/40 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-beige/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-luxury-beige" />
              <span className="text-xs uppercase tracking-widest font-bold text-luxury-beige">AI-Powered Fashion Stylist</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8">
              Upload Your Outfit. <br />
              <span className="italic text-luxury-beige">Let AI Style You.</span>
            </h1>
            <p className="text-lg text-luxury-white/60 mb-10 max-w-lg leading-relaxed">
              Experience the next generation of personal styling. Our advanced computer vision 
              analyzes your clothing and suggests the perfect matching pieces from top global brands.
            </p>
            <div className="flex flex-col sm:row gap-4">
              <Link to="/upload" className="btn-primary flex items-center justify-center gap-2">
                Upload Outfit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-outline flex items-center justify-center gap-2">
                How It Works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 glass-card p-4">
              <img 
                src="https://picsum.photos/seed/fashion-hero/800/1000" 
                alt="Fashion Hero" 
                className="w-full h-full object-cover rounded-2xl opacity-80"
                referrerPolicy="no-referrer"
              />
              {/* AI Scanning Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-luxury-beige to-transparent shadow-[0_0_20px_rgba(212,201,176,0.8)] z-20"
                />
                <div className="absolute top-1/4 left-1/4 p-4 glass-card border-luxury-beige/30 animate-bounce">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-luxury-beige rounded-full animate-ping" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Detecting: Silk Shirt</span>
                  </div>
                </div>
                <div className="absolute bottom-1/3 right-1/4 p-4 glass-card border-luxury-beige/30 animate-bounce delay-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-luxury-beige rounded-full animate-ping" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Color: Champagne</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 glass-card p-6 border-luxury-beige/20 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-luxury-black" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">98%</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-white/40">Match Accuracy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-luxury-gray/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Science of Style</h2>
            <p className="text-luxury-white/40 max-w-2xl mx-auto">
              Our proprietary AI engine uses deep learning to understand fabric, cut, and color harmony, 
              delivering professional-grade styling advice in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              index={0}
              icon={<Upload className="w-8 h-8" />}
              title="Upload Clothing"
              description="Simply snap a photo or upload an image of any clothing item from your wardrobe."
            />
            <StepCard 
              index={1}
              icon={<Cpu className="w-8 h-8" />}
              title="AI Analysis"
              description="Our neural network identifies the item's category, material, color, and style profile."
            />
            <StepCard 
              index={2}
              icon={<Sparkles className="w-8 h-8" />}
              title="Smart Matching"
              description="AI searches millions of products to find pieces that perfectly complement your item."
            />
            <StepCard 
              index={3}
              icon={<ShoppingBag className="w-8 h-8" />}
              title="Direct Purchase"
              description="Get direct links to buy matching items from Myntra, Amazon, Ajio, and more."
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://picsum.photos/seed/style1/400/500" alt="Style 1" className="rounded-2xl border border-white/5" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/style2/400/300" alt="Style 2" className="rounded-2xl border border-white/5" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4 pt-12">
                <img src="https://picsum.photos/seed/style3/400/300" alt="Style 3" className="rounded-2xl border border-white/5" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/style4/400/500" alt="Style 4" className="rounded-2xl border border-white/5" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Your Personal Stylist, <br />
              <span className="italic text-luxury-beige">Available 24/7.</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-luxury-beige" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Curated Selection</h4>
                  <p className="text-luxury-white/40 text-sm">We only recommend items that meet our high standards for quality and style compatibility.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Search className="w-6 h-6 text-luxury-beige" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Global Search</h4>
                  <p className="text-luxury-white/40 text-sm">Access the latest collections from Amazon, Ajio, Myntra, and Flipkart in one place.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <MessageSquare className="w-6 h-6 text-luxury-beige" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Interactive Chat</h4>
                  <p className="text-luxury-white/40 text-sm">Ask our AI stylist for specific advice on how to wear your new combinations.</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <Link to="/upload" className="btn-primary">Start Your Transformation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
