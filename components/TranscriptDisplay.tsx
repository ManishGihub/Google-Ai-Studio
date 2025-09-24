
import React from 'react';
import { InputMode } from '../types';
import { AudioRecorder } from './AudioRecorder';

interface TranscriptDisplayProps {
  inputMode: InputMode;
  transcript: string;
  setTranscript: (transcript: string) => void;
}

const FileUploadPlaceholder: React.FC = () => (
    <div className="text-center p-8 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-200">File Transcription Notice</h3>
        <p className="mt-2 text-sm text-gray-400">
            For this demonstration, direct audio file transcription is not available as it requires a backend server. 
            Please use the "Record Audio" feature for live transcription or paste an existing transcript in the "Paste Transcript" tab.
        </p>
    </div>
);

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  inputMode,
  transcript,
  setTranscript,
}) => {
  return (
    <div className="mt-4">
      {inputMode === InputMode.Record && <AudioRecorder setTranscript={setTranscript} />}
      {inputMode === InputMode.Upload && <FileUploadPlaceholder />}
      {inputMode === InputMode.Paste && (
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your meeting transcript here..."
          className="w-full h-48 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      )}
    </div>
  );
};
