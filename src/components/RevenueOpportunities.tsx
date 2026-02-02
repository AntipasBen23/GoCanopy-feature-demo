'use client';

import { DollarSign, Clock, TrendingUp } from 'lucide-react';
import { RevenueOpportunity } from '@/app/types';
import { formatCurrency } from '@/lib/utils';

interface RevenueOpportunitiesProps {
  opportunities: RevenueOpportunity[];
}

export default function RevenueOpportunities({ opportunities }: RevenueOpportunitiesProps) {
  const totalPotential = opportunities.reduce((sum, opp) => sum + opp.potentialValue, 0);

  return (
    <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Revenue Opportunities</h3>
              <p className="text-sm text-gray-400">
                Identified value-add pathways
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Potential</p>
            <p className="text-2xl font-bold text-green-500">
              {formatCurrency(totalPotential)}
            </p>
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="p-6 space-y-4">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className="p-5 bg-[var(--gocanopy-dark-bg)]/50 border border-gray-800 rounded-xl hover:border-[var(--gocanopy-accent)]/30 transition-all duration-300 fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-white">{opportunity.type}</h4>
                  <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                    High Impact
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {opportunity.description}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {/* Potential Value */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Potential Value</span>
                </div>
                <p className="text-lg font-bold text-green-500">
                  {formatCurrency(opportunity.potentialValue)}
                </p>
              </div>

              {/* Timeframe */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timeframe</span>
                </div>
                <p className="text-lg font-bold text-gray-300">
                  {opportunity.timeframe}
                </p>
              </div>

              {/* Confidence */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Confidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        opportunity.confidence >= 85 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : opportunity.confidence >= 70
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                          : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}
                      style={{ width: `${opportunity.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-300">
                    {opportunity.confidence}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-6 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-t border-gray-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-2">Value-Add Summary</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our analysis identified <span className="text-white font-medium">{formatCurrency(totalPotential)}</span> in 
              potential revenue opportunities across <span className="text-white font-medium">{opportunities.length} strategic initiatives</span>. 
              These represent actionable pathways to enhance property performance and unlock institutional value 
              that spreadsheets typically miss.
            </p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="p-4 bg-[var(--gocanopy-dark-bg)]/30 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Opportunities identified through GoCanopy's comparative analysis engine
        </p>
      </div>
    </div>
  );
}