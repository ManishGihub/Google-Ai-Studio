
import React, { useState, useEffect, useRef } from 'react';
import { MicIcon } from './Icons';

interface AudioRecorderProps {
  setTranscript: (transcript: string) => void;
}

// Check for SpeechRecognition API
// Fix: Cast window to 'any' to access non-standard browser APIs for speech recognition.
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ setTranscript }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const finalTranscriptRef = useRef<string>('');
  
  useEffect(() => {
    if (!recognition) {
        setError("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
        return;
    }
    
    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += event.results[i][0].transcript + '. ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
    };
    
    recognition.onend = () => {
      if (isRecording) {
        // If it ends unexpectedly, try to restart it
        recognition.start();
      }
    };

    // Cleanup on unmount
    return () => {
      if(recognition){
        recognition.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRecording = () => {
    if (!recognition) return;
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      finalTranscriptRef.current = '';
      setTranscript('');
      recognition.start();
      setIsRecording(true);
      setError(null);
    }
  };

  if (!recognition) {
    return (
        <div className="text-center p-4 bg-yellow-900/50 border border-yellow-700 rounded-lg">
            <p className="font-semibold text-yellow-300">Browser Not Supported</p>
            <p className="text-sm text-yellow-400">{error}</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 bg-gray-700/50 rounded-lg">
      <button
        onClick={toggleRecording}
        className={`relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500
        ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        <MicIcon className="w-8 h-8 text-white" />
        {isRecording && <div className="absolute inset-0 rounded-full bg-red-500/50 animate-ping"></div>}
      </button>
      <p className={`text-lg font-medium ${isRecording ? 'text-red-400 animate-pulse' : 'text-gray-300'}`}>
        {isRecording ? 'Recording...' : 'Click to Record'}
      </p>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};
