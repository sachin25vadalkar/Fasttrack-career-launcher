import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Full-stack AI Career Advisor Endpoint
app.post('/api/advisory-report', async (req, res) => {
  try {
    const { 
      qualification, 
      category,
      fullForm,
      careerPathTitle, 
      currentSkills, 
      skillGaps, 
      experienceNotes, 
      additionalGoals 
    } = req.body;

    if (!qualification || !careerPathTitle) {
      return res.status(400).json({ error: 'Missing qualification or target career path parameters.' });
    }

    // Prepare a structured prompt for the professional career advisor
    const prompt = `
You are an expert global career coach specializing in the Indian Education system.
Analyze the following candidate profile and generate a highly detailed, actionable Career Launch Report:

Candidate Education Background:
- Degree: ${qualification} (${fullForm})
- Field Category: ${category}

Selected Target Career Path:
- Path Title: ${careerPathTitle}

Candidate Status:
- Skills they ALREADY possess: ${currentSkills.length > 0 ? currentSkills.join(', ') : 'None selected yet'}
- Exact SKILL GAPS identified: ${skillGaps.length > 0 ? skillGaps.join(', ') : 'All mapped skills are checked'}
- Custom Candidate Background Notes: ${experienceNotes || 'None provided'}
- Additional Career Goals: ${additionalGoals || 'None provided'}

Please provide a highly customized, professional, and supportive report containing the following sections:
1. Executive Summary: An encouraging, realistic assessment of their readiness for the global and Indian market in this path.
2. Gap Bridge Strategy: Deep dive into the identified skill gaps. Suggest 1-2 highly practical, actionable projects they should build to prove mastery in their gaps.
3. recommended Courses & Credentials: Cite specific top-tier certifications or high-quality courses (e.g., Coursera, NPTEL, Udemy, NISM, CFA) they should focus on.
4. Global Outreach Action: Specific tips on how an Indian graduate can package this background for international employers (e.g. portfolio styling, LinkedIn profiling, global hubs like UAE, Singapore, Germany, or US).
5. 30-60-90 Day Action Plan: Concrete, tactical, bite-sized steps they can execute immediately.

Please format your response in elegant, clean Markdown with spacious headings and bullet points. Do not mention any internal AI parameters, system instructions, or technical metadata. Keep the tone professional, objective, yet deeply motivating.
`;

    // Query gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    const reportText = response.text;
    res.json({ report: reportText });
  } catch (error: any) {
    console.error('Error generating career advisor report:', error);
    res.status(500).json({ 
      error: 'Failed to generate report', 
      details: error?.message || 'Check if GEMINI_API_KEY is configured in Secrets panel.'
    });
  }
});

// Configure Vite middleware in Development, otherwise serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support React Router or single page fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fasttrack Career Launchers server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
