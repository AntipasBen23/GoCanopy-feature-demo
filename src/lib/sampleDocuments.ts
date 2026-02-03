import { DocumentType, UploadedDocument } from '@/app/types';
import { generateId } from './utils';

export interface SampleDocument {
  id: string;
  name: string;
  description: string;
  type: DocumentType;
  size: number; // in bytes
  fileType: string;
}

export const sampleDocuments: SampleDocument[] = [
  {
    id: 'sample-rent-roll',
    name: 'Parkside_Apartments_Rent_Roll_Q4_2024.xlsx',
    description: 'Multi-family property with 120 units',
    type: 'rent-roll',
    size: 245760, // ~240 KB
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    id: 'sample-offering-memo',
    name: 'Downtown_Office_Tower_Offering_Memorandum.pdf',
    description: 'Office building acquisition opportunity',
    type: 'offering-memo',
    size: 3145728, // ~3 MB
    fileType: 'application/pdf',
  },
  {
    id: 'sample-asset-report',
    name: 'Portfolio_Asset_Performance_Report_Q4.pdf',
    description: 'Quarterly performance analysis',
    type: 'asset-report',
    size: 1572864, // ~1.5 MB
    fileType: 'application/pdf',
  },
];

export function getSampleDocument(type: DocumentType): SampleDocument | undefined {
  return sampleDocuments.find(doc => doc.type === type);
}

export function loadSampleDocument(sampleId: string): UploadedDocument | null {
  const sample = sampleDocuments.find(doc => doc.id === sampleId);
  
  if (!sample) {
    return null;
  }

  return {
    id: generateId(),
    name: sample.name,
    size: sample.size,
    type: sample.fileType,
    uploadedAt: new Date(),
    documentType: sample.type,
  };
}

// Enhanced mock data for each sample type
export const sampleEnhancements: Record<DocumentType, any> = {
  'rent-roll': {
    propertyName: 'Parkside Apartments',
    location: 'San Francisco, CA',
    totalUnits: 120,
    occupiedUnits: 114,
    averageRent: 3850,
    specialNotes: [
      'Recent renovation completed in 2023',
      'Premium amenities including rooftop deck and fitness center',
      'Strong tenant retention rate of 87%',
    ],
  },
  'offering-memo': {
    propertyName: 'Downtown Office Tower',
    location: 'Oakland, CA',
    floors: 15,
    totalSqFt: 185000,
    askingPrice: 48500000,
    specialNotes: [
      'Class A office space in prime downtown location',
      'Recent tenant upgrades and HVAC modernization',
      'Long-term anchor tenant committed through 2028',
    ],
  },
  'asset-report': {
    propertyName: 'Bay Area Portfolio',
    location: 'Multiple locations',
    assetCount: 12,
    totalValue: 342000000,
    specialNotes: [
      'Portfolio-wide occupancy improvement of 4.2% YoY',
      'NOI growth of 6.8% across all properties',
      'Strategic disposition of 2 non-core assets completed',
    ],
  },
  'unknown': null,
};

export function getSampleEnhancements(documentType: DocumentType) {
  return sampleEnhancements[documentType];
}

// Simulate file reading delay
export async function simulateFileRead(sampleId: string): Promise<UploadedDocument | null> {
  // Simulate network/file read delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return loadSampleDocument(sampleId);
}