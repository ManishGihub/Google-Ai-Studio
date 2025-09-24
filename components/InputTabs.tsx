
import React from 'react';
import { InputMode } from '../types';
import { MicIcon, UploadIcon, ClipboardIcon } from './Icons';

interface InputTabsProps {
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
}

const TabButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500";
  const activeClasses = "bg-indigo-600 text-white shadow-md";
  const inactiveClasses = "bg-gray-700/50 text-gray-300 hover:bg-gray-700";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export const InputTabs: React.FC<InputTabsProps> = ({ inputMode, setInputMode }) => {
  return (
    <div className="flex space-x-2 bg-gray-900 p-1.5 rounded-xl">
      <TabButton
        label="Record Audio"
        icon={<MicIcon className="w-5 h-5" />}
        isActive={inputMode === InputMode.Record}
        onClick={() => setInputMode(InputMode.Record)}
      />
      <TabButton
        label="Upload File"
        icon={<UploadIcon className="w-5 h-5" />}
        isActive={inputMode === InputMode.Upload}
        onClick={() => setInputMode(InputMode.Upload)}
      />
      <TabButton
        label="Paste Transcript"
        icon={<ClipboardIcon className="w-5 h-5" />}
        isActive={inputMode === InputMode.Paste}
        onClick={() => setInputMode(InputMode.Paste)}
      />
    </div>
  );
};
