'use client';

import { TrendingUp, Building2, DollarSign, Percent, Users } from 'lucide-react';
import { PropertyMetrics } from '@/app/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface MetricsCardsProps {
  metrics: PropertyMetrics;
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      icon: DollarSign,
      label: 'Property Value',
      value: formatCurrency(metrics.propertyValue),
      change: '+12.3% vs. comps',
      changeType: 'positive' as const,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      icon: Percent,
      label: 'Cap Rate',
      value: formatPercentage(metrics.capRate, 2),
      change: '+0.4% above market',
      changeType: 'positive' as const,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: TrendingUp,
      label: 'Occupancy Rate',
      value: formatPercentage(metrics.occupancyRate, 1),
      change: 'Strong demand',
      changeType: 'neutral' as const,
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
    {
      icon: Building2,
      label: 'Net Operating Income',
      value: formatCurrency(metrics.netOperatingIncome),
      change: 'Annual',
      changeType: 'neutral' as const,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
    },
  ];

  // Add total units card if available
  if (metrics.totalUnits) {
    cards.push({
      icon: Users,
      label: 'Total Units',
      value: metrics.totalUnits.toString(),
      change: `Avg. rent ${formatCurrency(metrics.averageRent || 0)}`,
      changeType: 'neutral' as const,
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-500',
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div
            key={index}
            className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl p-6 hover:border-[var(--gocanopy-accent)]/30 transition-all duration-300 fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${
                  card.changeType === 'positive' 
                    ? 'text-green-500' 
                    : card.changeType === 'negative'
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}>
                  {card.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}