'use client';

import { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ResultsDashboard from '@/components/ResultsDashboard';
import ShareResults from '@/components/ShareResults';
import { UploadedDocument, AnalysisResult } from './types';
import { generateMockAnalysis } from '@/lib/mockData';
import { saveAnalysis, getPortfolioInsights, formatHistorySummary } from '@/lib/storageUtils';
import { simulateFileRead } from '@/lib/sampleDocuments';

type AppState = 'upload' | 'processing' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [currentDocument, setCurrentDocument] = useState<UploadedDocument | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const portfolioInsights = getPortfolioInsights();
  const historySummary = formatHistorySummary();

  const handleFileProcessed = (document: UploadedDocument) => {
    setCurrentDocument(document);
    setAppState('processing');
  };

  const handleProcessingComplete = () => {
    if (!currentDocument) return;

    // Generate mock analysis
    const analysis = generateMockAnalysis(
      currentDocument.id,
      currentDocument.documentType
    );

    // Save to localStorage
    saveAnalysis(analysis);

    setAnalysisResult(analysis);
    setAppState('results');
  };

  const handleStartOver = () => {
    setCurrentDocument(null);
    setAnalysisResult(null);
    setAppState('upload');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleSampleClick = async (sampleId: string) => {
    const document = await simulateFileRead(sampleId);
    if (document) {
      handleFileProcessed(document);
    }
  };

  // Render based on state
  if (appState === 'results' && analysisResult) {
    return (
      <>
        <ResultsDashboard
          analysis={analysisResult}
          onStartOver={handleStartOver}
          onShare={handleShare}
        />
        {showShareModal && (
          <ShareResults
            analysisId={analysisResult.id}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </>
    );
  }

  if (appState === 'processing' && currentDocument) {
    return (
      <main className="min-h-screen bg-[var(--gocanopy-dark)] flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <ProcessingAnimation
            documentName={currentDocument.name}
            onComplete={handleProcessingComplete}
          />
        </div>
      </main>
    );
  }

  // Default: Upload state
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

          {/* Portfolio History Badge (if returning user) */}
          {portfolioInsights.hasHistory && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gocanopy-accent)]/10 border border-[var(--gocanopy-accent)]/30 rounded-full fade-in">
              <div className="w-2 h-2 bg-[var(--gocanopy-accent)] rounded-full animate-pulse" />
              <span className="text-sm text-[var(--gocanopy-accent)] font-medium">
                {portfolioInsights.message}
              </span>
            </div>
          )}
        </div>

        {/* Upload Zone */}
        <div className="mb-12">
          <FileUpload onFileProcessed={handleFileProcessed} />
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
                sampleId: 'sample-rent-roll',
              },
              {
                icon: BarChart3,
                title: 'Sample Offering Memo',
                description: 'Office building acquisition opportunity',
                sampleId: 'sample-offering-memo',
              },
              {
                icon: TrendingUp,
                title: 'Sample Asset Report',
                description: 'Quarterly performance analysis',
                sampleId: 'sample-asset-report',
              },
            ].map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(sample.sampleId)}
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

        {/* History Summary (if available) */}
        {portfolioInsights.hasHistory && (
          <div className="mb-12 p-4 bg-[var(--gocanopy-card-bg)]/50 border border-gray-800 rounded-xl text-center">
            <p className="text-sm text-gray-400">
              Your Portfolio: <span className="text-white font-medium">{historySummary}</span>
            </p>
          </div>
        )}

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