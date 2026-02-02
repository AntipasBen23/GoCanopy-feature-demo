'use client';

import { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { AIInsight } from '@/app/types';
import { sleep } from '@/lib/utils';

interface AIInsightsProps {
  insight: AIInsight;
}

export default function AIInsights({ insight }: AIInsightsProps) {
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showFindings, setShowFindings] = useState(false);

  useEffect(() => {
    typewriterEffect();
  }, []);

  const typewriterEffect = async () => {
    const text = insight.summary;
    const speed = 20; // milliseconds per character
    
    for (let i = 0; i <= text.length; i++) {
      setDisplayedSummary(text.slice(0, i));
      await sleep(speed);
    }
    
    setIsTyping(false);
    await sleep(300);
    setShowFindings(true);
  };

  const getRecommendationConfig = () => {
    switch (insight.recommendation) {
      case 'Strong Buy':
        return {
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          icon: TrendingUp,
        };
      case 'Buy':
        return {
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/30',
          icon: CheckCircle2,
        };
      case 'Hold':
        return {
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          icon: AlertCircle,
        };
      default:
        return {
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          icon: AlertCircle,
        };
    }
  };

  const config = getRecommendationConfig();
  const Icon = config.icon;

  return (
    <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI-Generated Investment Analysis</h3>
            <p className="text-sm text-gray-400">
              Based on {insight.comparableDeals} comparable institutional deals
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Executive Summary */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Executive Summary
          </h4>
          <p className="text-gray-300 leading-relaxed">
            {displayedSummary}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-[var(--gocanopy-accent)] ml-1 animate-pulse" />
            )}
          </p>
        </div>

        {/* Key Findings */}
        {showFindings && (
          <div className="space-y-3 fade-in">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Key Findings
            </h4>
            <div className="space-y-2">
              {insight.keyFindings.map((finding, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 bg-[var(--gocanopy-dark-bg)]/50 rounded-lg fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--gocanopy-accent)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        {showFindings && (
          <div className={`p-6 ${config.bgColor} border ${config.borderColor} rounded-xl fade-in`} style={{ animationDelay: '400ms' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${config.bgColor} rounded-lg flex items-center justify-center border ${config.borderColor}`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Investment Recommendation</p>
                  <p className={`text-2xl font-bold ${config.color}`}>
                    {insight.recommendation}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Confidence</p>
                <p className="text-2xl font-bold text-white">{insight.confidence}%</p>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${
                    insight.confidence >= 90 
                      ? 'from-green-500 to-emerald-500'
                      : insight.confidence >= 75
                      ? 'from-emerald-500 to-yellow-500'
                      : 'from-yellow-500 to-orange-500'
                  }`}
                  style={{ width: `${insight.confidence}%` }}
                />
              </div>
            </div>

            {/* Reasoning */}
            <div>
              <h5 className="text-sm font-semibold text-gray-400 mb-2">Supporting Rationale</h5>
              <ul className="space-y-2">
                {insight.reasoning.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className={`${config.color} mt-1`}>•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Source Attribution */}
        {showFindings && (
          <div className="pt-4 border-t border-gray-800 fade-in" style={{ animationDelay: '600ms' }}>
            <p className="text-xs text-gray-500 text-center">
              Analysis powered by GoCanopy's institutional intelligence layer • All insights traceable to source documents
            </p>
          </div>
        )}
      </div>
    </div>
  );
}