import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Grid, 
  List, 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  Calendar,
  Tag,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWardrobe, toggleFavorite, deleteFromWardrobe } from '../services/geminiService';

const WardrobeItem = ({ item, index, onToggleFavorite, onDelete }: { item: any, index: number, onToggleFavorite: any, onDelete: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="glass-card group overflow-hidden border-white/5 hover:border-luxury-beige/30 transition-all"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          onClick={() => onToggleFavorite(item.id, !item.isFavorite)}
          className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-beige hover:text-luxury-black transition-colors"
        >
          <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-current text-red-500' : ''}`} />
        </button>
        <button 
          onClick={() => onDelete(item.id)}
          className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform">
        <Link to="/results" state={{ image: item.imageUrl, result: item.analysisResult }} className="w-full btn-primary py-2 text-xs flex items-center justify-center gap-2">
          View Styling <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-sm font-bold truncate">{item.name}</h3>
        <span className="text-[10px] text-luxury-beige font-bold uppercase tracking-tighter">{item.category}</span>
      </div>
      <div className="flex items-center gap-3 text-luxury-white/40">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-tighter">{item.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-tighter">{item.style}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const WardrobePage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    const data = await getWardrobe();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    await toggleFavorite(id, isFavorite);
    setItems(prev => prev.map(item => item.id === id ? { ...item, isFavorite } : item));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this item from your wardrobe?')) {
      await deleteFromWardrobe(id);
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.style?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl md:text-6xl font-display font-bold">Your Digital <br /><span className="italic text-luxury-beige">Wardrobe</span></h1>
          <p className="text-luxury-white/40 mt-4 max-w-md">
            Manage your collection of uploaded items and revisit your favorite AI-curated styling recommendations.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/upload" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Item
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-card p-4 mb-12 flex flex-col md:flex-row justify-between items-center gap-4 border-white/5">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-white/20" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your wardrobe..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-luxury-beige/50"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button className="p-2 bg-luxury-beige text-luxury-black rounded-lg"><Grid className="w-4 h-4" /></button>
            <button className="p-2 text-luxury-white/40 hover:text-luxury-white"><List className="w-4 h-4" /></button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card aspect-[3/4] animate-pulse bg-white/5" />
          ))
        ) : (
          filteredItems.map((item, index) => (
            <WardrobeItem 
              key={item.id} 
              item={item} 
              index={index} 
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
            />
          ))
        )}
        
        {/* Add New Placeholder */}
        {!loading && (
          <Link to="/upload" className="glass-card border-dashed border-white/20 bg-white/2 flex flex-col items-center justify-center p-8 group hover:bg-white/5 transition-all min-h-[300px]">
            <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-luxury-white/20 group-hover:text-luxury-beige" />
            </div>
            <p className="text-xs uppercase tracking-widest font-bold text-luxury-white/20 group-hover:text-luxury-beige">Add New Item</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default WardrobePage;
