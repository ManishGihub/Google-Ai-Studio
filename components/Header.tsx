
import React from 'react';
import { MicIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center bg-indigo-500/20 text-indigo-400 p-4 rounded-full mb-4 border border-indigo-500/30">
        <MicIcon className="w-8 h-8" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
        Smart Meeting Summarizer
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Record audio, upload a file, or paste a transcript to instantly generate structured summaries with key points, decisions, and action items.
      </p>
    </header>
  );
};
