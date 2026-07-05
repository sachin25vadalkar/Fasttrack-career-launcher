import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const {
      qualification,
      category,
      fullForm,
      careerPathTitle,
      currentSkills,
      skillGaps,
      experienceNotes,
      additionalGoals,
    } = await req.json();

    if (!qualification || !careerPathTitle) {
      return Response.json({ error: 'Missing qualification or target career path parameters.' }, { status: 400 });
    }

    const prompt = `
You are an expert global career coach specializing in the Indian Education system.
Analyze the following candidate profile and generate a highly detailed, actionable Career Launch Report:

Candidate Education Background:
- Degree: ${qualification} (${fullForm})
- Field Category: ${category}

Selected Target Career Path:
- Path Title: ${careerPathTitle}

Candidate Status:
- Skills they ALREADY possess: ${currentSkills?.length > 0 ? currentSkills.join(', ') : 'None selected yet'}
- Exact SKILL GAPS identified: ${skillGaps?.length > 0 ? skillGaps.join(', ') : 'All mapped skills are checked'}
- Custom Candidate Background Notes: ${experienceNotes || 'None provided'}
- Additional Career Goals: ${additionalGoals || 'None provided'}

Please provide a highly customized, professional, and supportive report containing the following sections:
1. Executive Summary: An encouraging, realistic assessment of their readiness for the global and Indian market in this path.
2. Gap Bridge Strategy: Deep dive into the identified skill gaps. Suggest 1-2 highly practical, actionable projects they should build to prove mastery in their gaps.
3. Recommended Courses & Credentials: Cite specific top-tier certifications or high-quality courses (e.g., Coursera, NPTEL, Udemy, NISM, CFA) they should focus on.
4. Global Outreach Action: Specific tips on how an Indian graduate can package this background for international employers (e.g. portfolio styling, LinkedIn profiling, global hubs like UAE, Singapore, Germany, or US).
5. 30-60-90 Day Action Plan: Concrete, tactical, bite-sized steps they can execute immediately.

Please format your response in elegant, clean Markdown with spacious headings and bullet points. Do not mention any internal AI parameters, system instructions, or technical metadata. Keep the tone professional, objective, yet deeply motivating.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    return Response.json({ report: response.text });
  } catch (error) {
    console.error('Error generating career advisor report:', error);
    return Response.json(
      {
        error: 'Failed to generate report',
        details: error instanceof Error ? error.message : 'Unexpected error while generating the report.',
      },
      { status: 500 },
    );
  }
};

export const config = {
  path: '/api/advisory-report',
};
