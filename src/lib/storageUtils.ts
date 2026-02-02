import { AnalysisResult, AnalysisHistory } from '@/app/types';

const STORAGE_KEY = 'gocanopy_analysis_history';
const MAX_STORED_ANALYSES = 10;

// Save analysis to localStorage
export function saveAnalysis(analysis: AnalysisResult): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getAnalysisHistory();
    const updatedHistory: AnalysisResult[] = [analysis, ...history.analyses];

    // Keep only the most recent analyses
    const trimmedHistory = updatedHistory.slice(0, MAX_STORED_ANALYSES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save analysis:', error);
  }
}

// Get all stored analyses
export function getAnalysisHistory(): AnalysisHistory {
  if (typeof window === 'undefined') {
    return { analyses: [], totalDeals: 0, averageCapRate: 0, totalValue: 0 };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { analyses: [], totalDeals: 0, averageCapRate: 0, totalValue: 0 };
    }

    const analyses: AnalysisResult[] = JSON.parse(stored);

    // Calculate aggregates
    const totalDeals = analyses.length;
    const averageCapRate = totalDeals > 0
      ? analyses.reduce((sum, a) => sum + a.metrics.capRate, 0) / totalDeals
      : 0;
    const totalValue = analyses.reduce((sum, a) => sum + a.metrics.propertyValue, 0);

    return {
      analyses,
      totalDeals,
      averageCapRate,
      totalValue,
    };
  } catch (error) {
    console.error('Failed to load analysis history:', error);
    return { analyses: [], totalDeals: 0, averageCapRate: 0, totalValue: 0 };
  }
}

// Get a specific analysis by ID
export function getAnalysisById(id: string): AnalysisResult | null {
  if (typeof window === 'undefined') return null;

  try {
    const history = getAnalysisHistory();
    return history.analyses.find(a => a.id === id) || null;
  } catch (error) {
    console.error('Failed to get analysis:', error);
    return null;
  }
}

// Clear all stored analyses
export function clearAnalysisHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

// Check if this is a returning user
export function isReturningUser(): boolean {
  if (typeof window === 'undefined') return false;

  const history = getAnalysisHistory();
  return history.totalDeals > 0;
}

// Get portfolio insights for returning users
export function getPortfolioInsights(): {
  message: string;
  hasHistory: boolean;
} {
  const history = getAnalysisHistory();

  if (history.totalDeals === 0) {
    return {
      message: 'Building your institutional memory...',
      hasHistory: false,
    };
  }

  if (history.totalDeals === 1) {
    return {
      message: 'Your institutional intelligence is beginning to compound',
      hasHistory: true,
    };
  }

  return {
    message: `Analyzing against ${history.totalDeals} previous deals in your portfolio`,
    hasHistory: true,
  };
}

// Format history for display
export function formatHistorySummary(): string {
  const history = getAnalysisHistory();

  if (history.totalDeals === 0) {
    return 'No previous analyses';
  }

  return `${history.totalDeals} deal${history.totalDeals === 1 ? '' : 's'} analyzed • Avg Cap Rate: ${history.averageCapRate.toFixed(2)}%`;
}