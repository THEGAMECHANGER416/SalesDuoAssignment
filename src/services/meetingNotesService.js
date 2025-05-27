require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("GEMINI_API_KEY not set in environment variables.");
}

const genAI = new GoogleGenAI({ apiKey: geminiApiKey });

const systemPrompt = `
You are a helpful meeting assistant. Given raw meeting notes, extract and return the following three components in structured JSON format:

1. A concise 2-3 sentence summary of the meeting.
2. A list of key decisions/notice points made during the meeting.
3. A list of action items. Each action item should include:
   - "task": a clear task description,
   - "owner": the responsible person (if mentioned),
   - "due": a deadline (if mentioned).

Respond ONLY in the following JSON format:

{
  "summary": "<summary text>",
  "decisions": [
    "<decision 1>",
    "<decision 2>"
  ],
  "actionItems": [
    {
      "task": "<task description>",
      [OPTIONAL]
      "owner": "<name>",
      "due": "<date>"
      [/OPTIONAL]
    }
  ]
}
`;

const ai = new GoogleGenAI({ apiKey: geminiApiKey });

async function processMeetingNotes(meetingNotes) {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [meetingNotes],
        temperature: 0.2,
        config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 1000,
        },
    });
    const text = response.candidates[0]?.content?.parts?.[0]?.text || "";
    if (!text) throw new Error("No text returned from AI model.");
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to extract JSON from response.");

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch (error) {
    console.error("Error processing meeting notes:", error.message);
    throw error;
  }
}

module.exports = { processMeetingNotes };