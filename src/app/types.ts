export type DocumentType = 'rent-roll' | 'offering-memo' | 'asset-report' | 'unknown';

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  documentType: DocumentType;
}

export interface ExtractedDataPoint {
  label: string;
  value: string | number;
  confidence: number;
  source: {
    page: number;
    section: string;
  };
}

export interface PropertyMetrics {
  propertyValue: number;
  capRate: number;
  occupancyRate: number;
  netOperatingIncome: number;
  totalUnits?: number;
  averageRent?: number;
}

export interface ComparableProperty {
  id: string;
  address: string;
  city: string;
  propertyValue: number;
  capRate: number;
  distance: string;
  similarity: number;
}

export interface MarketTrend {
  period: string;
  capRate: number;
  occupancy: number;
  rentGrowth: number;
}

export interface RiskAssessment {
  category: string;
  level: 'Low' | 'Medium' | 'High';
  score: number;
  description: string;
}

export interface RevenueOpportunity {
  type: string;
  description: string;
  potentialValue: number;
  timeframe: string;
  confidence: number;
}

export interface AIInsight {
  summary: string;
  keyFindings: string[];
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Pass';
  confidence: number;
  reasoning: string[];
  comparableDeals: number;
}

export interface AnalysisResult {
  id: string;
  documentId: string;
  analyzedAt: Date;
  documentType: DocumentType;
  extractedData: ExtractedDataPoint[];
  metrics: PropertyMetrics;
  comparables: ComparableProperty[];
  marketTrends: MarketTrend[];
  riskAssessment: RiskAssessment[];
  revenueOpportunities: RevenueOpportunity[];
  aiInsight: AIInsight;
}

export interface ProcessingStage {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'complete';
  progress: number;
  message?: string;
}

export interface AnalysisHistory {
  analyses: AnalysisResult[];
  totalDeals: number;
  averageCapRate: number;
  totalValue: number;
}