
import React from 'react';

export const Loader: React.FC = () => {
    const messages = [
        "Analyzing transcript...",
        "Identifying key points...",
        "Extracting decisions...",
        "Finding action items...",
        "Building your summary..."
    ];

    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg space-y-4">
      <svg
        className="animate-spin h-10 w-10 text-indigo-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="text-lg font-semibold text-gray-300 transition-opacity duration-500">{message}</p>
    </div>
  );
};
