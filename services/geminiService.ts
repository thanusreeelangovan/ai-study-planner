
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, StudyPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStudyPlan = async (input: UserInput): Promise<StudyPlan> => {
  const prompt = `
    Generate a personalized and realistic study plan for a university student.
    
    Student Context:
    - Subjects and Deadlines: ${JSON.stringify(input.subjects)}
    - Available Study Time: ${input.dailyHours} hours per day
    - Timeframe: From ${input.startDate} to ${input.endDate}

    The goal is to reduce stress, prioritize effectively, and ensure high-impact study sessions. 
    Be supportive and realistic. Use simple language. Avoid burnout.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are an expert AI Study Planner specialized in university-level workload management. You provide realistic, flexible, and supportive schedules that prioritize well-being alongside academic success.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { 
            type: Type.STRING, 
            description: "A high-level overview of the study strategy and goals." 
          },
          schedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING, description: "Day of the week or date." },
                sessions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING, description: "E.g., Morning, 2:00 PM, or Session 1" },
                      subject: { type: Type.STRING },
                      focus: { type: Type.STRING, description: "Specific topic or activity (e.g., Active Recall, Practice Problems)" }
                    },
                    required: ["time", "subject", "focus"]
                  }
                }
              },
              required: ["day", "sessions"]
            }
          },
          priorities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                reason: { type: Type.STRING },
                strategy: { type: Type.STRING, description: "Recommended study method for this specific subject." }
              },
              required: ["subject", "reason", "strategy"]
            }
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Practical productivity tips like Pomodoro, hydration, or sleep."
          }
        },
        required: ["summary", "schedule", "priorities", "tips"]
      }
    }
  });

  return JSON.parse(response.text) as StudyPlan;
};
