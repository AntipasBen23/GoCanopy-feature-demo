'use client';

import { useState } from 'react';
import { ArrowLeft, Download, Share2, ExternalLink } from 'lucide-react';
import { AnalysisResult } from '@/app/types';
import { formatDate } from '@/lib/utils';
import MetricsCards from './MetricsCards';
import ComparablesTable from './ComparablesTable';
import MarketTrendsChart from './MarketTrendsChart';
import AIInsights from './AIInsights';
import RevenueOpportunities from './RevenueOpportunities';
import RiskAssessment from './RiskAssessment';

interface ResultsDashboardProps {
  analysis: AnalysisResult;
  onStartOver: () => void;
  onShare: () => void;
}

export default function ResultsDashboard({ analysis, onStartOver, onShare }: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

  return (
    <div className="min-h-screen bg-[var(--gocanopy-dark)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gocanopy-primary)]/10 via-transparent to-[var(--gocanopy-accent)]/5" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[var(--gocanopy-accent)]/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onStartOver}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Analyze Another Document</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onShare}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--gocanopy-card-bg)] hover:bg-[var(--gocanopy-primary)]/30 border border-gray-800 hover:border-[var(--gocanopy-accent)]/50 text-white rounded-lg transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Results</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)] hover:opacity-90 text-white rounded-lg transition-opacity"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* Title Section */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--gocanopy-accent)] to-[var(--gocanopy-primary)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Investment Analysis</h1>
                  <p className="text-gray-400">Powered by GoCanopy Intelligence</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Analysis ID</p>
              <p className="text-sm font-mono text-gray-400">{analysis.id.slice(0, 12)}</p>
              <p className="text-xs text-gray-600 mt-1">{formatDate(analysis.analyzedAt)}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-800">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === 'overview'
                  ? 'text-[var(--gocanopy-accent)]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === 'details'
                  ? 'text-[var(--gocanopy-accent)]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Detailed Analysis
              {activeTab === 'details' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)]" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Key Metrics</h2>
              <MetricsCards metrics={analysis.metrics} />
            </section>

            {/* AI Insights */}
            <section>
              <AIInsights insight={analysis.aiInsight} />
            </section>

            {/* Revenue Opportunities */}
            <section>
              <RevenueOpportunities opportunities={analysis.revenueOpportunities} />
            </section>

            {/* Risk Assessment */}
            <section>
              <RiskAssessment risks={analysis.riskAssessment} />
            </section>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-8">
            {/* Comparables */}
            <section>
              <ComparablesTable 
                comparables={analysis.comparables} 
                baseCapRate={analysis.metrics.capRate}
              />
            </section>

            {/* Market Trends */}
            <section>
              <MarketTrendsChart trends={analysis.marketTrends} />
            </section>

            {/* Extracted Data */}
            <section>
              <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Extracted Data Points</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.extractedData.map((data, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-[var(--gocanopy-dark-bg)]/50 rounded-lg fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-gray-400">{data.label}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          data.confidence >= 95 
                            ? 'bg-green-500/10 text-green-500'
                            : data.confidence >= 85
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {data.confidence}%
                        </span>
                      </div>
                      <p className="text-white font-semibold mb-2">{data.value}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ExternalLink className="w-3 h-3" />
                        <span>Page {data.source.page} • {data.source.section}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[var(--gocanopy-primary)]/20 to-[var(--gocanopy-accent)]/10 border border-[var(--gocanopy-accent)]/20 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Experience This for Your Entire Portfolio
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join Brookfield, Apollo, and other leading institutional investors who use GoCanopy to transform 
            scattered data into compounding intelligence that strengthens with every deal.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)] hover:opacity-90 text-white font-semibold rounded-lg transition-opacity">
            Book a Demo with GoCanopy
          </button>
        </div>
      </div>
    </div>
  );
}