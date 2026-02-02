import {
  DocumentType,
  ExtractedDataPoint,
  PropertyMetrics,
  ComparableProperty,
  MarketTrend,
  RiskAssessment,
  RevenueOpportunity,
  AIInsight,
  AnalysisResult,
  ProcessingStage,
} from '../app/types';
import { generateId, getRandomFloat, getRandomInt, shuffleArray } from './utils';

// Processing stages for animation
export function getProcessingStages(): ProcessingStage[] {
  return [
    {
      id: '1',
      label: 'Extracting document text',
      status: 'pending',
      progress: 0,
      message: 'Reading PDF structure...',
    },
    {
      id: '2',
      label: 'Identifying data points',
      status: 'pending',
      progress: 0,
      message: 'Detecting property information...',
    },
    {
      id: '3',
      label: 'Structuring information',
      status: 'pending',
      progress: 0,
      message: 'Organizing financial data...',
    },
    {
      id: '4',
      label: 'Analyzing comparables',
      status: 'pending',
      progress: 0,
      message: 'Searching institutional database...',
    },
    {
      id: '5',
      label: 'Generating insights',
      status: 'pending',
      progress: 0,
      message: 'Preparing investment analysis...',
    },
  ];
}

// Mock extracted data based on document type
function generateExtractedData(documentType: DocumentType): ExtractedDataPoint[] {
  const baseData: ExtractedDataPoint[] = [
    {
      label: 'Property Address',
      value: '1234 Market Street, San Francisco, CA',
      confidence: getRandomInt(92, 98),
      source: { page: 1, section: 'Property Overview' },
    },
    {
      label: 'Property Type',
      value: 'Multifamily',
      confidence: getRandomInt(95, 99),
      source: { page: 1, section: 'Property Overview' },
    },
    {
      label: 'Year Built',
      value: getRandomInt(1995, 2020),
      confidence: getRandomInt(90, 97),
      source: { page: 2, section: 'Building Details' },
    },
  ];

  if (documentType === 'rent-roll') {
    return [
      ...baseData,
      {
        label: 'Total Units',
        value: getRandomInt(50, 200),
        confidence: getRandomInt(96, 99),
        source: { page: 1, section: 'Unit Summary' },
      },
      {
        label: 'Occupied Units',
        value: getRandomInt(45, 190),
        confidence: getRandomInt(94, 98),
        source: { page: 3, section: 'Rent Roll' },
      },
      {
        label: 'Average Rent',
        value: `$${getRandomInt(2000, 4500)}`,
        confidence: getRandomInt(93, 97),
        source: { page: 4, section: 'Financial Summary' },
      },
    ];
  }

  if (documentType === 'offering-memo') {
    return [
      ...baseData,
      {
        label: 'Asking Price',
        value: `$${getRandomInt(15, 85)}M`,
        confidence: getRandomInt(97, 99),
        source: { page: 2, section: 'Investment Highlights' },
      },
      {
        label: 'Cap Rate',
        value: `${getRandomFloat(4.5, 7.5, 2)}%`,
        confidence: getRandomInt(91, 96),
        source: { page: 5, section: 'Financial Analysis' },
      },
      {
        label: 'Net Operating Income',
        value: `$${getRandomFloat(2.5, 8.5, 1)}M`,
        confidence: getRandomInt(89, 95),
        source: { page: 5, section: 'Pro Forma' },
      },
    ];
  }

  return baseData;
}

// Mock property metrics
function generatePropertyMetrics(documentType: DocumentType): PropertyMetrics {
  const baseValue = getRandomInt(20, 80) * 1000000;
  const capRate = getRandomFloat(4.5, 7.5, 2);
  const noi = baseValue * (capRate / 100);

  return {
    propertyValue: baseValue,
    capRate: capRate,
    occupancyRate: getRandomFloat(85, 98, 1),
    netOperatingIncome: noi,
    totalUnits: documentType === 'rent-roll' ? getRandomInt(50, 200) : undefined,
    averageRent: documentType === 'rent-roll' ? getRandomInt(2000, 4500) : undefined,
  };
}

// Mock comparable properties
function generateComparables(baseValue: number, baseCapRate: number): ComparableProperty[] {
  const cities = ['San Francisco', 'Oakland', 'San Jose', 'Berkeley', 'Palo Alto'];
  const streets = ['Market St', 'Main St', 'Broadway', 'First St', 'University Ave'];

  return shuffleArray(
    cities.map((city, index) => ({
      id: generateId(),
      address: `${getRandomInt(100, 9999)} ${streets[index % streets.length]}`,
      city: city,
      propertyValue: baseValue * getRandomFloat(0.85, 1.15, 2),
      capRate: baseCapRate + getRandomFloat(-0.8, 0.8, 2),
      distance: `${getRandomFloat(0.5, 5.0, 1)} miles`,
      similarity: getRandomInt(75, 95),
    }))
  ).slice(0, 5);
}

// Mock market trends
function generateMarketTrends(): MarketTrend[] {
  const baseCapRate = getRandomFloat(5.5, 6.5, 2);
  const baseOccupancy = getRandomFloat(92, 96, 1);

  return [
    { period: 'Q1 2024', capRate: baseCapRate + 0.3, occupancy: baseOccupancy - 1.2, rentGrowth: 2.1 },
    { period: 'Q2 2024', capRate: baseCapRate + 0.2, occupancy: baseOccupancy - 0.8, rentGrowth: 2.4 },
    { period: 'Q3 2024', capRate: baseCapRate + 0.1, occupancy: baseOccupancy - 0.4, rentGrowth: 2.8 },
    { period: 'Q4 2024', capRate: baseCapRate, occupancy: baseOccupancy, rentGrowth: 3.2 },
    { period: 'Q1 2025', capRate: baseCapRate - 0.1, occupancy: baseOccupancy + 0.3, rentGrowth: 3.5 },
  ];
}

// Mock risk assessment
function generateRiskAssessment(): RiskAssessment[] {
  return [
    {
      category: 'Market Risk',
      level: 'Low',
      score: 25,
      description: 'Strong market fundamentals with consistent demand',
    },
    {
      category: 'Tenant Risk',
      level: 'Medium',
      score: 45,
      description: '3 major leases expiring within 18 months',
    },
    {
      category: 'Financial Risk',
      level: 'Low',
      score: 30,
      description: 'Conservative leverage and stable cash flows',
    },
    {
      category: 'Location Risk',
      level: 'Low',
      score: 20,
      description: 'Prime location with strong demographic trends',
    },
  ];
}

// Mock revenue opportunities
function generateRevenueOpportunities(): RevenueOpportunity[] {
  return [
    {
      type: 'Rent Optimization',
      description: '12 units currently 8-12% below market rent',
      potentialValue: getRandomInt(150000, 350000),
      timeframe: '6-12 months',
      confidence: getRandomInt(85, 95),
    },
    {
      type: 'Lease Renewal',
      description: 'Upcoming lease expirations present repositioning opportunity',
      potentialValue: getRandomInt(200000, 500000),
      timeframe: '12-18 months',
      confidence: getRandomInt(75, 88),
    },
    {
      type: 'Operating Efficiency',
      description: 'Utility expense optimization through energy-efficient upgrades',
      potentialValue: getRandomInt(80000, 180000),
      timeframe: '18-24 months',
      confidence: getRandomInt(70, 85),
    },
  ];
}

// Mock AI insight
function generateAIInsight(metrics: PropertyMetrics): AIInsight {
  const recommendations: Array<'Strong Buy' | 'Buy' | 'Hold' | 'Pass'> = ['Strong Buy', 'Buy', 'Hold'];
  const recommendation = recommendations[getRandomInt(0, 2)];

  return {
    summary: `This ${metrics.totalUnits ? `${metrics.totalUnits}-unit` : ''} multifamily property presents a compelling investment opportunity with strong fundamentals and multiple value-add pathways.`,
    keyFindings: [
      `Cap rate of ${metrics.capRate.toFixed(2)}% is ${getRandomFloat(0.3, 0.8, 1)}% above market average`,
      `Occupancy rate of ${metrics.occupancyRate.toFixed(1)}% indicates strong tenant demand`,
      `NOI of $${(metrics.netOperatingIncome / 1000000).toFixed(2)}M provides stable cash flow foundation`,
      'Multiple revenue optimization opportunities identified worth $430K-$1.03M',
    ],
    recommendation: recommendation,
    confidence: getRandomInt(82, 94),
    reasoning: [
      'Property located in high-growth submarket with strong demographic tailwinds',
      'Conservative underwriting assumptions provide downside protection',
      'Comparable transactions support valuation at current pricing',
      'Management team has proven track record in similar assets',
    ],
    comparableDeals: getRandomInt(115, 145),
  };
}

// Main function to generate complete analysis
export function generateMockAnalysis(
  documentId: string,
  documentType: DocumentType
): AnalysisResult {
  const metrics = generatePropertyMetrics(documentType);

  return {
    id: generateId(),
    documentId: documentId,
    analyzedAt: new Date(),
    documentType: documentType,
    extractedData: generateExtractedData(documentType),
    metrics: metrics,
    comparables: generateComparables(metrics.propertyValue, metrics.capRate),
    marketTrends: generateMarketTrends(),
    riskAssessment: generateRiskAssessment(),
    revenueOpportunities: generateRevenueOpportunities(),
    aiInsight: generateAIInsight(metrics),
  };
}

// Update processing stage
export function updateProcessingStage(
  stages: ProcessingStage[],
  stageIndex: number,
  status: 'pending' | 'processing' | 'complete',
  progress: number,
  message?: string
): ProcessingStage[] {
  return stages.map((stage, index) => {
    if (index === stageIndex) {
      return { ...stage, status, progress, message: message || stage.message };
    }
    return stage;
  });
}