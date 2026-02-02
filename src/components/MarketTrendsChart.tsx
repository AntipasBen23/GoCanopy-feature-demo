'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { MarketTrend } from '@/app/types';

interface MarketTrendsChartProps {
  trends: MarketTrend[];
}

export default function MarketTrendsChart({ trends }: MarketTrendsChartProps) {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--gocanopy-card-bg)] border border-gray-700 rounded-lg p-4 shadow-xl">
          <p className="text-sm font-semibold text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-gray-400">{entry.name}:</span>
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name.includes('Rate') || entry.name.includes('Occupancy')
                  ? `${entry.value.toFixed(2)}%`
                  : `${entry.value.toFixed(1)}%`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--gocanopy-primary)]/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[var(--gocanopy-accent)]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Market Trends</h3>
            <p className="text-sm text-gray-400">
              Historical performance and trajectory analysis
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="period" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
              formatter={(value) => <span style={{ color: '#D1D5DB', fontSize: '12px' }}>{value}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="capRate" 
              stroke="#14B8A6" 
              strokeWidth={2}
              name="Cap Rate"
              dot={{ fill: '#14B8A6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="occupancy" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="Occupancy"
              dot={{ fill: '#F59E0B', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="rentGrowth" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              name="Rent Growth"
              dot={{ fill: '#8B5CF6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[var(--gocanopy-dark-bg)]/50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Cap Rate Trend</p>
            <p className="text-lg font-semibold text-[#14B8A6]">
              {trends[trends.length - 1].capRate > trends[0].capRate ? '↗' : '↘'} 
              {' '}
              {Math.abs(trends[trends.length - 1].capRate - trends[0].capRate).toFixed(2)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {trends[trends.length - 1].capRate > trends[0].capRate ? 'Increasing' : 'Decreasing'} compression
            </p>
          </div>

          <div className="p-4 bg-[var(--gocanopy-dark-bg)]/50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Occupancy Trend</p>
            <p className="text-lg font-semibold text-[#F59E0B]">
              {trends[trends.length - 1].occupancy > trends[0].occupancy ? '↗' : '↘'} 
              {' '}
              {Math.abs(trends[trends.length - 1].occupancy - trends[0].occupancy).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {trends[trends.length - 1].occupancy > trends[0].occupancy ? 'Strengthening' : 'Softening'} demand
            </p>
          </div>

          <div className="p-4 bg-[var(--gocanopy-dark-bg)]/50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Rent Growth</p>
            <p className="text-lg font-semibold text-[#8B5CF6]">
              ↗ {(trends[trends.length - 1].rentGrowth).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Accelerating growth trajectory
            </p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="p-4 bg-[var(--gocanopy-dark-bg)]/30 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Market data aggregated from institutional transactions and public sources
        </p>
      </div>
    </div>
  );
}