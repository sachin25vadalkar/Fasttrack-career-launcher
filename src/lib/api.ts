export interface AdvisoryRequest {
  qualification: string;
  category: string;
  fullForm: string;
  careerPathTitle: string;
  currentSkills: string[];
  skillGaps: string[];
  experienceNotes: string;
  additionalGoals: string;
}

export interface AdvisoryResponse {
  report: string;
}

export async function requestAdvisoryReport(payload: AdvisoryRequest): Promise<string> {
  const res = await fetch('/api/advisory-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.details || body.error || `Request failed with status ${res.status}`);
  }

  const data: AdvisoryResponse = await res.json();
  return data.report;
}
