'use client';

import { useState } from 'react';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { UploadedDocument, DocumentType } from '@/app/types';
import { generateId, detectDocumentType, formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  onFileProcessed: (document: UploadedDocument) => void;
  onCancel?: () => void;
}

export default function FileUpload({ onFileProcessed, onCancel }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = async (file: File) => {
    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, Excel, or Word document');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setIsValidating(true);

    // Simulate quick validation
    await new Promise(resolve => setTimeout(resolve, 800));

    const documentType = detectDocumentType(file.name);
    
    const uploadedDoc: UploadedDocument = {
      id: generateId(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      documentType: documentType,
    };

    setIsValidating(false);
    onFileProcessed(uploadedDoc);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (onCancel) onCancel();
  };

  if (selectedFile && !isValidating) {
    return (
      <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--gocanopy-primary)]/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-[var(--gocanopy-accent)]" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{selectedFile.name}</h4>
              <p className="text-sm text-gray-400">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (isValidating) {
    return (
      <div className="bg-[var(--gocanopy-card-bg)] border border-gray-800 rounded-xl p-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[var(--gocanopy-accent)] animate-spin" />
          <div className="text-center">
            <h4 className="font-semibold text-white mb-1">Validating document...</h4>
            <p className="text-sm text-gray-400">Checking file format and size</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300
        ${isDragging 
          ? 'border-[var(--gocanopy-accent)] bg-[var(--gocanopy-accent)]/10 scale-[1.02]' 
          : 'border-gray-700 bg-[var(--gocanopy-card-bg)]/50 hover:border-[var(--gocanopy-accent)]/50 hover:bg-[var(--gocanopy-card-bg)]'
        }
      `}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-[var(--gocanopy-primary)]/20 rounded-full flex items-center justify-center">
          <Upload className="w-10 h-10 text-[var(--gocanopy-accent)]" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">
            Drop your document here
          </h3>
          <p className="text-gray-400">
            or{' '}
            <label className="text-[var(--gocanopy-accent)] hover:text-[var(--gocanopy-gold)] cursor-pointer underline">
              browse files
              <input
                type="file"
                className="hidden"
                accept=".pdf,.xlsx,.xls,.doc,.docx"
                onChange={handleFileSelect}
              />
            </label>
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Supports: PDF, Excel, Word • Max 10MB
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Secure processing
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              No data stored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}