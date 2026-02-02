'use client';

import { Shield, AlertTriangle, TrendingDown, Info } from 'lucide-react';
import { RiskAssessment as RiskAssessmentType } from '@/app/types';
import { getRiskColor } from '@/lib/utils';

interface RiskAssessmentProps {
  risks: RiskAssessmentType[];
}

export default function RiskAssessment({ risks }: RiskAssessmentProps) {
  const averageRisk = Math.round(risks.reduce((sum, risk) => sum + risk.score, 0) / risks.length);
  
  const getOverallRiskLevel = (score: number): { level: string; color: string; icon: any } => {
    if (score <= 30) {
      return { level: 'Low Risk', color: 'text-green-500', icon: Shield };
    } else if (score <= 50) {
      return { level: 'Moderate Risk', color: 'text-yellow-500', icon: Info };
    } else {
      return { level: 'High Risk', color: 'text-red-500', icon: AlertTriangle };
    }
  };

  const overall = getOverallRiskLevel(averageRisk);
  const OverallIcon = overall.icon;

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low':
        return Shield;
      case 'Medium':
        return Info;
      case 'High':
        return AlertTriangle;
      default:
        return TrendingDown;
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-500/10';
      case 'Medium':
        return 'bg-yellow-500/10';
      case 'High':
        return 'bg-red-500/10';
      default:
        return 'bg-gray-500/10';
    }
  };

  const getRiskBorderColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'border-green-500/30';
      case 'Medium':
        return 'border-yellow-500/30';
      case 'High':
        return 'border-red-500/30';
      default:
        return 'border-gray-500/30';
    }
  };

  const getRiskBarColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'from-green-500 to-emerald-500';
      case 'Medium':
        return 'from-yellow-500 to-amber-500';
      case 'High':
        return 'from-red-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${overall.level === 'Low Risk' ? 'bg-green-500/20' : overall.level === 'Moderate Risk' ? 'bg-yellow-500/20' : 'bg-red-500/20'} rounded-lg flex items-center justify-center`}>
              <OverallIcon className={`w-5 h-5 ${overall.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Risk Assessment</h3>
              <p className="text-sm text-gray-400">
                Comprehensive risk analysis across key factors
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Overall Risk</p>
            <p className={`text-2xl font-bold ${overall.color}`}>
              {overall.level}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="p-6 space-y-4">
        {risks.map((risk, index) => {
          const RiskIcon = getRiskIcon(risk.level);
          const riskColor = getRiskColor(risk.level);

          return (
            <div
              key={index}
              className={`p-5 ${getRiskBgColor(risk.level)} border ${getRiskBorderColor(risk.level)} rounded-xl fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${getRiskBgColor(risk.level)} border ${getRiskBorderColor(risk.level)} rounded-lg flex items-center justify-center`}>
                    <RiskIcon className={`w-5 h-5 ${riskColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{risk.category}</h4>
                    <p className={`text-sm font-medium ${riskColor}`}>
                      {risk.level} Risk
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{risk.score}</p>
                  <p className="text-xs text-gray-500">Risk Score</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getRiskBarColor(risk.level)}`}
                    style={{ width: `${risk.score}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {risk.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Overall Risk Summary */}
      <div className="p-6 bg-[var(--gocanopy-dark-bg)]/30 border-t border-gray-800">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 ${overall.level === 'Low Risk' ? 'bg-green-500/10' : overall.level === 'Moderate Risk' ? 'bg-yellow-500/10' : 'bg-red-500/10'} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <OverallIcon className={`w-5 h-5 ${overall.color}`} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-2">Risk Profile Summary</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {averageRisk <= 30 && (
                <>
                  This investment presents a <span className="text-green-500 font-medium">low-risk profile</span> with 
                  strong fundamentals across all key risk factors. Conservative underwriting assumptions and 
                  favorable market conditions provide downside protection.
                </>
              )}
              {averageRisk > 30 && averageRisk <= 50 && (
                <>
                  This investment presents a <span className="text-yellow-500 font-medium">moderate-risk profile</span> with 
                  manageable exposure across key risk factors. Some areas require active management and monitoring, 
                  but overall risk is within acceptable institutional parameters.
                </>
              )}
              {averageRisk > 50 && (
                <>
                  This investment presents a <span className="text-red-500 font-medium">elevated-risk profile</span> with 
                  several factors requiring careful consideration. Enhanced due diligence and risk mitigation strategies 
                  are recommended before proceeding.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="p-4 bg-[var(--gocanopy-dark-bg)]/30 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Risk assessment based on institutional underwriting standards and market benchmarks
        </p>
      </div>
    </div>
  );
}