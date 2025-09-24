
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputTabs } from './components/InputTabs';
import { TranscriptDisplay } from './components/TranscriptDisplay';
import { SummaryDisplay } from './components/SummaryDisplay';
import { ActionButtons } from './components/ActionButtons';
import { Loader } from './components/Loader';
import { summarizeTranscript } from './services/geminiService';
import type { Summary } from './types';
import { InputMode } from './types';

const App: React.FC = () => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.Record);
  const [transcript, setTranscript] = useState<string>('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = useCallback(async () => {
    if (!transcript.trim()) {
      setError('Transcript is empty. Please provide a transcript to summarize.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeTranscript(transcript);
      setSummary(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during summarization.');
    } finally {
      setIsLoading(false);
    }
  }, [transcript]);

  const handleReset = () => {
    setTranscript('');
    setSummary(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8 space-y-8">
          {!summary && !isLoading && (
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 space-y-6">
              <InputTabs inputMode={inputMode} setInputMode={setInputMode} />
              <TranscriptDisplay
                inputMode={inputMode}
                transcript={transcript}
                setTranscript={setTranscript}
              />
              <ActionButtons
                onSummarize={handleSummarize}
                onReset={handleReset}
                isSummarizeDisabled={!transcript.trim() || isLoading}
                showReset={false}
              />
            </div>
          )}
          
          {isLoading && <Loader />}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {summary && (
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 animate-fade-in">
              <SummaryDisplay summary={summary} />
              <div className="mt-6">
                <ActionButtons
                    onSummarize={handleSummarize}
                    onReset={handleReset}
                    isSummarizeDisabled={true}
                    showReset={true}
                 />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
