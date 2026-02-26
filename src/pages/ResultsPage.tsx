import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  ExternalLink, 
  Heart, 
  Share2, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

const RecommendationCard = ({ item, index }: { item: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    className="glass-card overflow-hidden group border-white/5 hover:border-luxury-beige/30 transition-all"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img 
        src={item.imageUrl || `https://picsum.photos/seed/${item.name}/400/500`} 
        alt={item.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-beige hover:text-luxury-black transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      {/* Match Score Badge */}
      <div className="absolute bottom-4 left-4 px-3 py-1 bg-luxury-beige/90 backdrop-blur-md rounded-full flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-luxury-black" />
        <span className="text-[10px] font-bold text-luxury-black uppercase tracking-widest">{item.matchScore}% Match</span>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-luxury-beige font-bold mb-1">{item.category}</p>
          <h3 className="text-lg font-display font-bold">{item.name}</h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{item.price}</p>
          <p className="text-[10px] text-luxury-white/40 uppercase tracking-tighter">via {item.store}</p>
        </div>
      </div>
      
      <p className="text-xs text-luxury-white/40 mb-6 line-clamp-2 italic">
        "{item.whyItMatches}"
      </p>
      
      <div className="flex gap-2">
        <a 
          href={item.buyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-grow btn-primary py-2 px-4 text-xs flex items-center justify-center gap-2"
        >
          Buy Now <ExternalLink className="w-3 h-3" />
        </a>
        <button className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ResultsPage = () => {
  const location = useLocation();
  const { image, result } = location.state || {};

  if (!result) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-display mb-4">No analysis data found.</h2>
        <Link to="/upload" className="btn-primary">Go to Upload</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <Link to="/upload" className="flex items-center gap-2 text-luxury-white/40 hover:text-luxury-beige transition-colors mb-4 text-sm uppercase tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Upload
          </Link>
          <h1 className="text-5xl md:text-6xl font-display font-bold">Perfect Matches <br /><span className="italic text-luxury-beige">for Your Outfit</span></h1>
        </div>
        <div className="flex items-center gap-4 glass-card px-6 py-3 border-luxury-beige/20">
          <Sparkles className="w-5 h-5 text-luxury-beige" />
          <span className="text-sm font-medium">AI Stylist has curated 3 perfect pairings</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Uploaded Item Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card overflow-hidden border-luxury-beige/20"
            >
              <div className="aspect-[3/4] relative">
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Analysis Complete</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold">{result.detectedItem.category}</h2>
                  <p className="text-luxury-white/60 text-sm">{result.detectedItem.color} • {result.detectedItem.material}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-luxury-white/40 uppercase tracking-widest">Style Profile</span>
                  <span className="text-sm font-medium">{result.detectedItem.style}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-luxury-white/40 uppercase tracking-widest">Pattern</span>
                  <span className="text-sm font-medium">{result.detectedItem.pattern}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-luxury-white/40 uppercase tracking-widest">Occasion</span>
                  <span className="text-sm font-medium">{result.detectedItem.occasion}</span>
                </div>
              </div>
            </motion.div>
            
            <div className="glass-card p-6 bg-luxury-beige/5 border-luxury-beige/10">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-luxury-beige" />
                Stylist's Note
              </h4>
              <p className="text-sm text-luxury-white/60 leading-relaxed italic">
                "This {result.detectedItem.category.toLowerCase()} is a versatile piece. To maintain the {result.detectedItem.style.toLowerCase()} aesthetic, we've selected items that play with contrasting textures while staying within a sophisticated color story."
              </p>
            </div>
          </div>
        </div>

        {/* Right: Recommendations Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {result.recommendations.map((item: any, index: number) => (
              <RecommendationCard key={`rec-${index}-${item.name}`} item={item} index={index} />
            ))}
            
            {/* Chat CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 flex flex-col items-center justify-center text-center border-dashed border-white/20 bg-white/2"
            >
              <div className="w-16 h-16 bg-luxury-beige/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-luxury-beige" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4">Want more options?</h3>
              <p className="text-sm text-luxury-white/40 mb-8 max-w-xs">
                Ask our AI Stylist for more specific combinations or styling tips for this outfit.
              </p>
              <Link to="/chatbot" state={{ image, result }} className="btn-outline w-full text-sm">
                Chat with Stylist
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
