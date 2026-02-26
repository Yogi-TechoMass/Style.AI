import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Upload, X, Camera, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const handleStartAnalysis = () => {
    if (preview) {
      // In a real app, we'd upload the file here
      // For now, we'll pass the preview URL to the processing page via state
      navigate('/processing', { state: { image: preview } });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Upload Your Clothing Item</h1>
          <p className="text-luxury-white/40 max-w-xl mx-auto">
            Our AI works best with clear, well-lit photos of individual clothing items 
            against a neutral background.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 cursor-pointer ${
                isDragging 
                  ? 'border-luxury-beige bg-luxury-beige/5' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
              
              <div className="w-20 h-20 bg-luxury-beige/10 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-luxury-beige" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drag & Drop</h3>
              <p className="text-luxury-white/40 text-sm mb-6">or click to browse your files</p>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs">
                  <ImageIcon className="w-3 h-3" /> JPG, PNG
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs">
                  <Camera className="w-3 h-3" /> Take Photo
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="aspect-square rounded-3xl bg-luxury-gray border border-white/10 overflow-hidden relative group">
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreview(null);
                        setFile(null);
                      }}
                      className="w-12 h-12 bg-red-500/80 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-luxury-white/20 p-12 text-center">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-10" />
                  <p className="text-sm italic">Your image preview will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <button
            disabled={!preview}
            onClick={handleStartAnalysis}
            className={`btn-primary flex items-center gap-3 px-12 py-4 text-lg ${
              !preview ? 'opacity-50 cursor-not-allowed grayscale' : ''
            }`}
          >
            <Sparkles className="w-6 h-6" />
            Start AI Analysis
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Tips Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6">
            <h4 className="text-luxury-beige font-bold mb-2 text-sm uppercase tracking-widest">Tip 1</h4>
            <p className="text-xs text-luxury-white/40 leading-relaxed">Use natural lighting to ensure the AI correctly identifies colors and textures.</p>
          </div>
          <div className="glass-card p-6">
            <h4 className="text-luxury-beige font-bold mb-2 text-sm uppercase tracking-widest">Tip 2</h4>
            <p className="text-xs text-luxury-white/40 leading-relaxed">Lay the item flat or use a mannequin for the best shape detection.</p>
          </div>
          <div className="glass-card p-6">
            <h4 className="text-luxury-beige font-bold mb-2 text-sm uppercase tracking-widest">Tip 3</h4>
            <p className="text-xs text-luxury-white/40 leading-relaxed">Avoid busy backgrounds; a plain wall or floor works best for our computer vision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
