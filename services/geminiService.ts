
import { GoogleGenAI, Type } from "@google/genai";
import type { Summary } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = "gemini-2.5-flash";

const summarySchema = {
    type: Type.OBJECT,
    properties: {
        keyPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of the most important points and topics discussed in the meeting."
        },
        decisions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of all final decisions made during the meeting."
        },
        actionItems: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    task: { type: Type.STRING, description: "The specific action or task to be completed." },
                    owner: { type: Type.STRING, description: "The person or team responsible for the task. Default to 'N/A' if not mentioned." },
                    deadline: { type: Type.STRING, description: "The deadline for the task. Default to 'N/A' if not mentioned." }
                },
                required: ["task"],
            },
            description: "A list of actionable tasks, including who is responsible and the deadline."
        }
    },
    required: ["keyPoints", "decisions", "actionItems"]
};


export const summarizeTranscript = async (transcript: string): Promise<Summary> => {
    try {
        const prompt = `
            You are an expert meeting summarizer. Analyze the following meeting transcript and generate a structured summary.
            Identify the key discussion points, any decisions that were made, and all action items with their assigned owners and deadlines if mentioned.
            If an owner or deadline is not explicitly mentioned for an action item, use 'N/A'.
            
            Transcript:
            ---
            ${transcript}
            ---
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: summarySchema,
            }
        });

        const jsonText = response.text.trim();
        const summaryData: Summary = JSON.parse(jsonText);
        
        return summaryData;

    } catch (error) {
        console.error("Error summarizing transcript:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate summary: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the AI model.");
    }
};
