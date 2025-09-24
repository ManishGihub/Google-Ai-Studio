
import React from 'react';
import type { Summary } from '../types';
import { jsPDF } from 'jspdf';
import { DownloadIcon, FileTextIcon } from './Icons';

interface SummaryDisplayProps {
  summary: Summary;
}

const SummarySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 border-b-2 border-gray-700 pb-2">
            {title}
        </h3>
        <div className="space-y-3">{children}</div>
    </div>
);

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
    const { keyPoints, decisions, actionItems } = summary;

    const generateTextFile = () => {
        let content = "Meeting Summary\n\n";
        content += "Key Points:\n";
        keyPoints.forEach(p => content += `- ${p}\n`);
        content += "\nDecisions:\n";
        decisions.forEach(d => content += `- ${d}\n`);
        content += "\nAction Items:\n";
        actionItems.forEach(a => content += `- ${a.task} (Owner: ${a.owner || 'N/A'}, Deadline: ${a.deadline || 'N/A'})\n`);
        return content;
    };

    const downloadTxt = () => {
        const text = generateTextFile();
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meeting-summary.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadPdf = () => {
        const doc = new jsPDF();
        let yPos = 20;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('Meeting Summary', 105, yPos, { align: 'center' });
        yPos += 20;

        const addSection = (title: string, items: string[]) => {
            if (items.length === 0) return;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text(title, 14, yPos);
            yPos += 10;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            items.forEach(item => {
                const lines = doc.splitTextToSize(`- ${item}`, 180);
                if (yPos + lines.length * 7 > 280) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(lines, 20, yPos);
                yPos += lines.length * 7;
            });
            yPos += 5;
        };

        addSection('Key Points', keyPoints);
        addSection('Decisions', decisions);
        addSection('Action Items', actionItems.map(a => `${a.task} (Owner: ${a.owner || 'N/A'}, Deadline: ${a.deadline || 'N/A'})`));
        
        doc.save('meeting-summary.pdf');
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <h2 className="text-3xl font-extrabold text-gray-100">Generated Summary</h2>
                 <div className="flex items-center gap-2">
                     <button onClick={downloadTxt} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-300 bg-indigo-900/50 border border-indigo-700 rounded-md hover:bg-indigo-900 transition-colors">
                         <FileTextIcon className="w-4 h-4" />
                         Export .txt
                     </button>
                     <button onClick={downloadPdf} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-300 bg-indigo-900/50 border border-indigo-700 rounded-md hover:bg-indigo-900 transition-colors">
                         <DownloadIcon className="w-4 h-4" />
                         Export .pdf
                     </button>
                 </div>
            </div>

            <div className="space-y-8">
                {keyPoints.length > 0 && (
                    <SummarySection title="Key Points">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                        </ul>
                    </SummarySection>
                )}
                {decisions.length > 0 && (
                     <SummarySection title="Decisions Made">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {decisions.map((decision, index) => <li key={index}>{decision}</li>)}
                        </ul>
                    </SummarySection>
                )}
                {actionItems.length > 0 && (
                    <SummarySection title="Action Items">
                        <div className="overflow-x-auto">
                           <table className="w-full text-left table-auto">
                                <thead className="border-b border-gray-600 text-sm text-gray-400">
                                    <tr>
                                        <th className="p-3">Task</th>
                                        <th className="p-3">Owner</th>
                                        <th className="p-3">Deadline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actionItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-700/50">
                                            <td className="p-3 text-gray-200">{item.task}</td>
                                            <td className="p-3 text-gray-300">{item.owner || 'N/A'}</td>
                                            <td className="p-3 text-gray-300">{item.deadline || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                           </table>
                        </div>
                    </SummarySection>
                )}
            </div>
        </div>
    );
};
