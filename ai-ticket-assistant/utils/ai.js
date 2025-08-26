import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets.
Your job is to analyze tickets and return JSON only.`
  });

  const prompt = `
    Analyze this support ticket:
    Title: ${ticket.title}
    Description: ${ticket.description}

    Return a JSON object with these exact fields:
    {
      "summary": "Brief summary of the issue",
      "priority": "high/medium/low",
      "skills": ["required", "technical", "skills"],
      "notes": "Helpful notes for moderators"
    }`;

  try {
    const response = await supportAgent.run(prompt);
    const result = JSON.parse(response);
    console.log('AI Analysis result:', result);
    return result;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return {
      summary: ticket.title,
      priority: "medium",
      skills: ["general-support"],
      notes: "Failed to analyze ticket automatically. Please review manually."
    };
  }
};

export default analyzeTicket;
