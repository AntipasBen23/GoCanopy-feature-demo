'use client';

import { MapPin, TrendingUp } from 'lucide-react';
import { ComparableProperty } from '@/app/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface ComparablesTableProps {
  comparables: ComparableProperty[];
  baseCapRate: number;
}

export default function ComparablesTable({ comparables, baseCapRate }: ComparablesTableProps) {
  return (
    <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[var(--gocanopy-primary)]/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[var(--gocanopy-accent)]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Comparable Properties</h3>
            <p className="text-sm text-gray-400">
              Analyzed against {comparables.length} similar institutional deals
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--gocanopy-dark-bg)]/50 border-b border-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cap Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Similarity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {comparables.map((comp, index) => {
              const capRateDiff = comp.capRate - baseCapRate;
              const isHigher = capRateDiff > 0;

              return (
                <tr 
                  key={comp.id} 
                  className="hover:bg-[var(--gocanopy-primary)]/5 transition-colors fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Property */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--gocanopy-primary)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[var(--gocanopy-accent)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{comp.address}</p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-300">{comp.city}</p>
                  </td>

                  {/* Value */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">
                      {formatCurrency(comp.propertyValue)}
                    </p>
                  </td>

                  {/* Cap Rate */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">
                        {formatPercentage(comp.capRate, 2)}
                      </p>
                      <span className={`text-xs ${
                        isHigher ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {isHigher ? '+' : ''}{formatPercentage(capRateDiff, 2)}
                      </span>
                    </div>
                  </td>

                  {/* Distance */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-400">{comp.distance}</p>
                  </td>

                  {/* Similarity */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden max-w-[80px]">
                        <div 
                          className="h-full bg-gradient-to-r from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)]"
                          style={{ width: `${comp.similarity}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[var(--gocanopy-accent)]">
                        {comp.similarity}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div className="p-4 bg-[var(--gocanopy-dark-bg)]/30 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Comparables sourced from GoCanopy's institutional database of 127+ recent transactions
        </p>
      </div>
    </div>
  );
}