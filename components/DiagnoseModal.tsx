import React, { useState } from 'react';
import { diagnoseProblem } from '../services/geminiService';
import { GeminiDiagnosisResponse } from '../types';

interface DiagnoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
}

const DiagnoseModal: React.FC<DiagnoseModalProps> = ({ isOpen, onClose, onCategorySelect }) => {
  const [problem, setProblem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeminiDiagnosisResponse | null>(null);

  if (!isOpen) return null;

  const handleDiagnose = async () => {
    if (!problem.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const diagnosis = await diagnoseProblem(problem);
      setResult(diagnosis);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (result) {
      onCategorySelect(result.category);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <i className="fas fa-robot"></i> AI Helper Assistant
            </h2>
            <button onClick={onClose} className="text-white/80 hover:text-white transition">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <p className="text-sm opacity-90">Describe your home issue, and I'll find the right expert and give you safety tips.</p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {!result ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                What's happening?
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g., My kitchen sink is leaking water everywhere..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none h-32 resize-none"
              />
              
              <button 
                onClick={handleDiagnose}
                disabled={isLoading || !problem.trim()}
                className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2
                  ${isLoading || !problem.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30'}`}
              >
                {isLoading ? (
                  <><i className="fas fa-circle-notch fa-spin"></i> Analyzing...</>
                ) : (
                  <><i className="fas fa-magic"></i> Find Help</>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 text-lg mb-1">
                  You need a <span className="underline">{result.category}</span>
                </h3>
                <p className="text-sm text-green-700">{result.reasoning}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Safety First</h4>
                    <p className="text-sm text-gray-600">{result.safetyTip}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                    <i className="fas fa-tools"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Immediate Action</h4>
                    <p className="text-sm text-gray-600">{result.suggestedAction}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {result && (
          <div className="p-4 bg-gray-50 border-t flex gap-3">
            <button 
              onClick={() => setResult(null)}
              className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition"
            >
              Ask Again
            </button>
            <button 
              onClick={handleApply}
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition shadow-md"
            >
              View {result.category}s
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnoseModal;
