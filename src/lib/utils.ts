import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number, decimals: number = 2): number {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

export function detectDocumentType(filename: string): 'rent-roll' | 'offering-memo' | 'asset-report' | 'unknown' {
  const lower = filename.toLowerCase();
  
  if (lower.includes('rent') || lower.includes('roll')) {
    return 'rent-roll';
  }
  if (lower.includes('offering') || lower.includes('memo') || lower.includes('om')) {
    return 'offering-memo';
  }
  if (lower.includes('asset') || lower.includes('report') || lower.includes('performance')) {
    return 'asset-report';
  }
  
  return 'unknown';
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 90) return 'text-green-500';
  if (confidence >= 70) return 'text-yellow-500';
  return 'text-red-500';
}

export function getRiskColor(level: 'Low' | 'Medium' | 'High'): string {
  switch (level) {
    case 'Low':
      return 'text-green-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'High':
      return 'text-red-500';
  }
}

export function calculateSimilarity(value1: number, value2: number): number {
  const diff = Math.abs(value1 - value2);
  const avg = (value1 + value2) / 2;
  const similarity = Math.max(0, 100 - (diff / avg * 100));
  return Math.round(similarity);
}