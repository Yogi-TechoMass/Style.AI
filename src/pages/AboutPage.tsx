import { motion } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Zap, 
  Layers,
  Globe,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-beige/10 border border-luxury-beige/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-luxury-beige" />
              <span className="text-xs uppercase tracking-widest font-bold text-luxury-beige">The Future of Fashion</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8">
              Where Style <br />
              <span className="italic text-luxury-beige">Meets Intelligence.</span>
            </h1>
            <p className="text-lg text-luxury-white/60 mb-10 max-w-lg leading-relaxed">
              VOGUE.AI is a revolutionary personal styling platform that bridges the gap between 
              your existing wardrobe and the global fashion marketplace using advanced Computer Vision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-luxury-beige/20 p-12 relative">
              <div className="absolute inset-0 bg-luxury-beige/5 blur-[100px] rounded-full animate-pulse" />
              <div className="w-full h-full rounded-full overflow-hidden border border-white/10 relative z-10">
                <img 
                  src="https://picsum.photos/seed/about-hero/800/800" 
                  alt="About Hero" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Tech Icons */}
              <div className="absolute top-0 right-1/4 w-16 h-16 glass-card flex items-center justify-center animate-bounce">
                <Cpu className="w-8 h-8 text-luxury-beige" />
              </div>
              <div className="absolute bottom-1/4 -left-4 w-16 h-16 glass-card flex items-center justify-center animate-bounce delay-700">
                <Layers className="w-8 h-8 text-luxury-beige" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="mb-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">The Concept</h2>
          <div className="w-24 h-1 bg-luxury-beige mx-auto mb-8" />
          <p className="text-luxury-white/40 max-w-3xl mx-auto text-lg leading-relaxed">
            We believe that everyone has the potential to look their best, but the overwhelming 
            choice in modern e-commerce often leads to "decision paralysis." VOGUE.AI simplifies 
            the process by starting with what you already own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="glass-card p-10 border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 bg-luxury-beige/10 rounded-xl flex items-center justify-center mb-8">
              <Search className="w-6 h-6 text-luxury-beige" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Visual Recognition</h3>
            <p className="text-luxury-white/40 text-sm leading-relaxed">
              Our AI doesn't just see a shirt; it understands the weave of the fabric, the 
              specific shade of the dye, and the silhouette of the cut.
            </p>
          </div>
          <div className="glass-card p-10 border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 bg-luxury-beige/10 rounded-xl flex items-center justify-center mb-8">
              <Zap className="w-6 h-6 text-luxury-beige" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Real-time Matching</h3>
            <p className="text-luxury-white/40 text-sm leading-relaxed">
              We scan millions of products across Myntra, Amazon, Ajio, and Flipkart to find 
              the exact pieces that will elevate your look.
            </p>
          </div>
          <div className="glass-card p-10 border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 bg-luxury-beige/10 rounded-xl flex items-center justify-center mb-8">
              <Globe className="w-6 h-6 text-luxury-beige" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Sustainable Styling</h3>
            <p className="text-luxury-white/40 text-sm leading-relaxed">
              By helping you build outfits around items you already own, we promote a more 
              intentional and sustainable approach to fashion consumption.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="mb-32 py-24 bg-luxury-gray/30 -mx-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 glass-card p-2">
              <div className="w-full h-full bg-black flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="flex gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [20, 60, 30, 50, 20] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 bg-luxury-beige rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-beige">Neural Processing Active</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 glass-card p-8 border-luxury-beige/20 shadow-2xl">
              <p className="text-4xl font-display font-bold">10M+</p>
              <p className="text-[10px] uppercase tracking-widest text-luxury-white/40 font-bold">Data Points Analyzed</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">The Technology</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-luxury-beige" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Computer Vision</h4>
                  <p className="text-luxury-white/40 text-sm leading-relaxed">
                    Utilizing state-of-the-art convolutional neural networks to identify over 
                    500 distinct fashion attributes in milliseconds.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Sparkles className="w-6 h-6 text-luxury-beige" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Style Graph</h4>
                  <p className="text-luxury-white/40 text-sm leading-relaxed">
                    Our proprietary Style Graph maps relationships between colors, textures, 
                    and silhouettes based on decades of editorial fashion data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-12">Ready to <span className="italic text-luxury-beige">redefine</span> your style?</h2>
        <div className="flex flex-col sm:row justify-center gap-6">
          <Link to="/upload" className="btn-primary flex items-center justify-center gap-2 px-12 py-5 text-lg">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/" className="btn-outline flex items-center justify-center gap-2 px-12 py-5 text-lg">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
