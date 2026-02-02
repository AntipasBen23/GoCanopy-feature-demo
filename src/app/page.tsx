'use client';

import { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp } from 'lucide-react';

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    // We'll handle this in the next component
  };

  return (
    <main className="min-h-screen bg-[var(--gocanopy-dark)] relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gocanopy-primary)]/10 via-transparent to-[var(--gocanopy-accent)]/5" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[var(--gocanopy-accent)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[var(--gocanopy-primary)]/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--gocanopy-accent)] to-[var(--gocanopy-primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              GoCanopy Intelligence Playground
            </h1>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience <span className="gocanopy-text-gradient font-semibold">compounding institutional intelligence</span>
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a real estate document and watch our AI extract, structure, and analyze it in real-time—just like institutional investors using GoCanopy every day.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="mb-12">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300
              ${isDragging 
                ? 'border-[var(--gocanopy-accent)] bg-[var(--gocanopy-accent)]/10 scale-[1.02]' 
                : 'border-gray-700 bg-[var(--gocanopy-card-bg)]/50 hover:border-[var(--gocanopy-accent)]/50 hover:bg-[var(--gocanopy-card-bg)]'
              }
            `}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-[var(--gocanopy-primary)]/20 rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-[var(--gocanopy-accent)]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  Drop your document here
                </h3>
                <p className="text-gray-400">
                  or{' '}
                  <label className="text-[var(--gocanopy-accent)] hover:text-[var(--gocanopy-gold)] cursor-pointer underline">
                    browse files
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.xlsx,.xls,.doc,.docx"
                      onChange={handleFileSelect}
                    />
                  </label>
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Supports: PDF, Excel, Word • Max 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Sample Documents */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">
            Or try a sample document
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: FileText,
                title: 'Sample Rent Roll',
                description: 'Multi-family property with 120 units',
                type: 'rent-roll',
              },
              {
                icon: BarChart3,
                title: 'Sample Offering Memo',
                description: 'Office building acquisition opportunity',
                type: 'offering-memo',
              },
              {
                icon: TrendingUp,
                title: 'Sample Asset Report',
                description: 'Quarterly performance analysis',
                type: 'asset-report',
              },
            ].map((sample, index) => (
              <button
                key={index}
                onClick={() => console.log('Load sample:', sample.type)}
                className="group bg-[var(--gocanopy-card-bg)] hover:bg-[var(--gocanopy-primary)]/30 border border-gray-800 hover:border-[var(--gocanopy-accent)]/50 rounded-xl p-6 text-left transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--gocanopy-primary)]/20 group-hover:bg-[var(--gocanopy-accent)]/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                    <sample.icon className="w-6 h-6 text-[var(--gocanopy-accent)]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white group-hover:text-[var(--gocanopy-accent)] transition-colors">
                      {sample.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {sample.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-4 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            Trusted by leading institutional investors
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-600">
            <span className="font-semibold">Brookfield</span>
            <span className="font-semibold">Apollo</span>
            <span className="text-[var(--gocanopy-accent)]">+ others</span>
          </div>
        </div>
      </div>
    </main>
  );
}