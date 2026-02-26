import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Sparkles, CheckCircle2, Loader2, Search, Layers, Palette } from 'lucide-react';
import { analyzeFashionItem, saveToWardrobe } from '../services/geminiService';

const ProcessingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Neural Network...');
  const [detectedAttributes, setDetectedAttributes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const image = location.state?.image;

  useEffect(() => {
    if (!image) {
      navigate('/upload');
      return;
    }

    const startAnalysis = async () => {
      // Simulate progress steps
      const steps = [
        { p: 10, s: 'Scanning Image Geometry...', a: [] },
        { p: 30, s: 'Detecting Fabric Texture...', a: ['Silk Texture'] },
        { p: 50, s: 'Analyzing Color Palette...', a: ['Silk Texture', 'Champagne Beige'] },
        { p: 70, s: 'Identifying Style Profile...', a: ['Silk Texture', 'Champagne Beige', 'Minimalist'] },
        { p: 90, s: 'Searching Global Inventory...', a: ['Silk Texture', 'Champagne Beige', 'Minimalist', 'Luxury Cut'] },
      ];

      for (const step of steps) {
        await new Promise(r => setTimeout(r, 800));
        setProgress(step.p);
        setStatus(step.s);
        setDetectedAttributes(step.a);
      }

      try {
        const result = await analyzeFashionItem(image);
        
        // Save to wardrobe automatically
        await saveToWardrobe({
          id: Date.now().toString(),
          name: `${result.detectedItem.color} ${result.detectedItem.category}`,
          category: result.detectedItem.category,
          color: result.detectedItem.color,
          material: result.detectedItem.material,
          style: result.detectedItem.style,
          occasion: result.detectedItem.occasion,
          pattern: result.detectedItem.pattern,
          imageUrl: image,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          isFavorite: false,
          analysisResult: result
        });

        // Navigate to results with the data
        navigate('/results', { state: { image, result } });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred during analysis.");
        setStatus("Analysis Failed");
      }
    };

    startAnalysis();
  }, [image, navigate]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-beige/5 blur-[150px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Image with Scanning Animation */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 glass-card p-2"
          >
            <img src={image} alt="Processing" className="w-full h-full object-cover rounded-2xl opacity-60" />
            
            {/* Scanning Line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-luxury-beige to-transparent shadow-[0_0_30px_rgba(212,201,176,1)] z-20"
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            
            {/* Detection Points */}
            <AnimatePresence>
              {progress > 20 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="absolute top-1/4 left-1/3 w-4 h-4 border-2 border-luxury-beige rounded-full animate-ping" 
                />
              )}
              {progress > 40 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="absolute bottom-1/3 right-1/4 w-4 h-4 border-2 border-luxury-beige rounded-full animate-ping delay-500" 
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right: Status and Attributes */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-beige/10 rounded-full mb-6">
              <Cpu className="w-4 h-4 text-luxury-beige animate-spin" />
              <span className="text-xs uppercase tracking-widest font-bold text-luxury-beige">AI Core Active</span>
            </div>
            <h1 className="text-5xl font-display font-bold mb-4">Analyzing Your Style...</h1>
            <p className="text-luxury-white/40 leading-relaxed">
              Our computer vision models are extracting deep features to find your perfect match.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-luxury-beige">{status}</span>
              <span className="text-2xl font-display font-bold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-luxury-beige to-luxury-gold shadow-[0_0_15px_rgba(212,201,176,0.5)]"
              />
            </div>
          </div>

          {/* Detected Attributes */}
          <div className="grid grid-cols-2 gap-4">
            {['Category', 'Color', 'Material', 'Style'].map((label, i) => (
              <div key={label} className="glass-card p-4 border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-luxury-white/30 mb-2">{label}</p>
                <div className="flex items-center gap-2">
                  {detectedAttributes[i] ? (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">{detectedAttributes[i]}</span>
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2 opacity-20">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Detecting...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Indicators */}
          <div className="flex gap-6 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${progress > 30 ? 'border-luxury-beige bg-luxury-beige/10' : 'border-white/10'}`}>
                <Layers className={`w-5 h-5 ${progress > 30 ? 'text-luxury-beige' : 'text-white/20'}`} />
              </div>
              <span className="text-[10px] uppercase tracking-tighter text-luxury-white/40">Geometry</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${progress > 60 ? 'border-luxury-beige bg-luxury-beige/10' : 'border-white/10'}`}>
                <Palette className={`w-5 h-5 ${progress > 60 ? 'text-luxury-beige' : 'text-white/20'}`} />
              </div>
              <span className="text-[10px] uppercase tracking-tighter text-luxury-white/40">Chromatic</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${progress > 80 ? 'border-luxury-beige bg-luxury-beige/10' : 'border-white/10'}`}>
                <Search className={`w-5 h-5 ${progress > 80 ? 'text-luxury-beige' : 'text-white/20'}`} />
              </div>
              <span className="text-[10px] uppercase tracking-tighter text-luxury-white/40">Inventory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
