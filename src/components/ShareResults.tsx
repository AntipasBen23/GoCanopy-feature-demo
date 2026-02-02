'use client';

import { useState } from 'react';
import { X, Link2, Check, Linkedin, Twitter, Mail } from 'lucide-react';

interface ShareResultsProps {
  analysisId: string;
  onClose: () => void;
}

export default function ShareResults({ analysisId, onClose }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate shareable URL
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/results/${analysisId}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: string) => {
    const text = 'Check out this AI-powered real estate investment analysis from GoCanopy';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    let url = '';
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodedText}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Share Analysis</h3>
            <p className="text-sm text-gray-400 mt-1">Share this investment analysis</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Link */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-400 mb-2 block">
            Share Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 bg-[var(--gocanopy-dark-bg)] border border-gray-800 rounded-lg text-sm text-gray-400 truncate">
              {shareUrl}
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                copied
                  ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                  : 'bg-[var(--gocanopy-accent)] hover:bg-[var(--gocanopy-accent)]/80 text-white'
              }`}
            >
              {copied ? (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  <span>Copy</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="text-sm font-medium text-gray-400 mb-3 block">
            Share on Social Media
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleShare('linkedin')}
              className="flex flex-col items-center gap-2 p-4 bg-[var(--gocanopy-dark-bg)] hover:bg-[var(--gocanopy-primary)]/30 border border-gray-800 hover:border-[#0A66C2]/50 rounded-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#0A66C2]/10 group-hover:bg-[#0A66C2]/20 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                LinkedIn
              </span>
            </button>

            <button
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center gap-2 p-4 bg-[var(--gocanopy-dark-bg)] hover:bg-[var(--gocanopy-primary)]/30 border border-gray-800 hover:border-[#1DA1F2]/50 rounded-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#1DA1F2]/10 group-hover:bg-[#1DA1F2]/20 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                Twitter
              </span>
            </button>

            <button
              onClick={() => handleShare('email')}
              className="flex flex-col items-center gap-2 p-4 bg-[var(--gocanopy-dark-bg)] hover:bg-[var(--gocanopy-primary)]/30 border border-gray-800 hover:border-[var(--gocanopy-accent)]/50 rounded-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[var(--gocanopy-accent)]/10 group-hover:bg-[var(--gocanopy-accent)]/20 rounded-lg flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-[var(--gocanopy-accent)]" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                Email
              </span>
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-[var(--gocanopy-primary)]/10 border border-[var(--gocanopy-primary)]/20 rounded-lg">
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-[var(--gocanopy-accent)] font-medium">Note:</span>{' '}
            This is a demonstration analysis. Shared links are publicly accessible but contain no sensitive data.
          </p>
        </div>
      </div>
    </div>
  );
}