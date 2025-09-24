
import React from 'react';
import { RefreshCwIcon } from './Icons';

interface ActionButtonsProps {
  onSummarize: () => void;
  onReset: () => void;
  isSummarizeDisabled: boolean;
  showReset: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSummarize, onReset, isSummarizeDisabled, showReset }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
      {!showReset && (
        <button
            onClick={onSummarize}
            disabled={isSummarizeDisabled}
            className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
        >
            Generate Summary
        </button>
      )}
      {showReset && (
        <button
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
        >
          <RefreshCwIcon className="w-5 h-5" />
          Start Over
        </button>
      )}
    </div>
  );
};
