'use client';

import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';
import { ProcessingStage } from '@/app/types';
import { getProcessingStages, updateProcessingStage } from '@/lib/mockData';
import { sleep } from '@/lib/utils';

interface ProcessingAnimationProps {
  documentName: string;
  onComplete: () => void;
}

export default function ProcessingAnimation({ documentName, onComplete }: ProcessingAnimationProps) {
  const [stages, setStages] = useState<ProcessingStage[]>(getProcessingStages());
  const [currentStage, setCurrentStage] = useState(0);
  const [dataPointsFound, setDataPointsFound] = useState(0);

  useEffect(() => {
    processDocument();
  }, []);

  const processDocument = async () => {
    // Stage 1: Extracting text
    await processStage(0, 2000, 'Reading document structure...');
    
    // Stage 2: Identifying data points
    await processStage(1, 2500, 'Found 47 data points...');
    
    // Stage 3: Structuring information
    await processStage(2, 2000, 'Organizing financial data...');
    
    // Stage 4: Analyzing comparables
    await processStage(3, 3000, 'Comparing against 127 institutional deals...');
    
    // Stage 5: Generating insights
    await processStage(4, 2000, 'Finalizing investment analysis...');
    
    // Wait a bit before completing
    await sleep(500);
    onComplete();
  };

  const processStage = async (stageIndex: number, duration: number, finalMessage: string) => {
    setCurrentStage(stageIndex);
    
    // Set stage to processing
    setStages(prev => updateProcessingStage(prev, stageIndex, 'processing', 0));
    
    // Animate progress
    const steps = 20;
    const stepDuration = duration / steps;
    
    for (let i = 0; i <= steps; i++) {
      const progress = (i / steps) * 100;
      setStages(prev => updateProcessingStage(prev, stageIndex, 'processing', progress));
      
      // Update data points counter for stage 2
      if (stageIndex === 1 && i > 0) {
        setDataPointsFound(Math.floor((i / steps) * 47));
      }
      
      await sleep(stepDuration);
    }
    
    // Complete stage
    setStages(prev => updateProcessingStage(prev, stageIndex, 'complete', 100, finalMessage));
    
    // Small pause between stages
    await sleep(300);
  };

  return (
    <div className="bg-[var(--gocanopy-dark-bg)] border border-gray-800 rounded-2xl p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[var(--gocanopy-accent)]/20 rounded-lg flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-[var(--gocanopy-accent)] animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Analyzing Document</h3>
            <p className="text-sm text-gray-400">{documentName}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="relative">
            {/* Connector line */}
            {index < stages.length - 1 && (
              <div 
                className={`absolute left-4 top-10 w-0.5 h-6 transition-colors duration-300 ${
                  stage.status === 'complete' 
                    ? 'bg-[var(--gocanopy-accent)]' 
                    : 'bg-gray-800'
                }`}
              />
            )}
            
            <div className="flex items-start gap-4">
              {/* Status icon */}
              <div className="relative flex-shrink-0">
                {stage.status === 'complete' ? (
                  <CheckCircle2 className="w-8 h-8 text-[var(--gocanopy-accent)]" />
                ) : stage.status === 'processing' ? (
                  <Loader2 className="w-8 h-8 text-[var(--gocanopy-accent)] animate-spin" />
                ) : (
                  <Circle className="w-8 h-8 text-gray-700" />
                )}
              </div>

              {/* Stage content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${
                    stage.status === 'complete' 
                      ? 'text-white' 
                      : stage.status === 'processing'
                      ? 'text-[var(--gocanopy-accent)]'
                      : 'text-gray-500'
                  }`}>
                    {stage.label}
                  </h4>
                  {stage.status === 'processing' && (
                    <span className="text-sm text-[var(--gocanopy-accent)] font-medium">
                      {Math.round(stage.progress)}%
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {stage.status === 'processing' && (
                  <div className="mb-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)] transition-all duration-300 ease-out"
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                )}

                {/* Message */}
                {(stage.status === 'processing' || stage.status === 'complete') && (
                  <p className="text-sm text-gray-400">
                    {stage.message}
                  </p>
                )}

                {/* Data points counter (for stage 2) */}
                {stage.status === 'processing' && index === 1 && dataPointsFound > 0 && (
                  <p className="text-xs text-[var(--gocanopy-accent)] mt-1">
                    {dataPointsFound} data points identified
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Overall Progress</span>
          <span className="text-[var(--gocanopy-accent)] font-medium">
            {Math.round(((currentStage + 1) / stages.length) * 100)}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--gocanopy-accent)] to-[var(--gocanopy-gold)] transition-all duration-500"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Fun fact during processing */}
      <div className="mt-6 p-4 bg-[var(--gocanopy-primary)]/10 border border-[var(--gocanopy-primary)]/20 rounded-lg">
        <p className="text-sm text-gray-400">
          <span className="text-[var(--gocanopy-accent)] font-medium">Did you know?</span>{' '}
          GoCanopy analyzes documents 70% faster than manual review, freeing up teams to focus on strategic analysis rather than data entry.
        </p>
      </div>
    </div>
  );
}