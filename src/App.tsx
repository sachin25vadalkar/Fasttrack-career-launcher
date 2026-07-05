import { useState } from 'react';
import { PlaneTakeoff } from 'lucide-react';
import ProgressRail from './components/ProgressRail';
import QualificationStep from './components/QualificationStep';
import CareerPathStep from './components/CareerPathStep';
import SkillsStep from './components/SkillsStep';
import DetailsStep from './components/DetailsStep';
import ReportBoard from './components/ReportBoard';
import { requestAdvisoryReport } from './lib/api';
import type { CareerPath, Qualification } from './data/careerData';

type ReportStatus = 'loading' | 'error' | 'success';

export default function App() {
  const [step, setStep] = useState(0);
  const [qualification, setQualification] = useState<Qualification | null>(null);
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [skillGaps, setSkillGaps] = useState<string[]>([]);
  const [experienceNotes, setExperienceNotes] = useState('');
  const [additionalGoals, setAdditionalGoals] = useState('');

  const [reportStatus, setReportStatus] = useState<ReportStatus>('loading');
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runReport = async (notes: string, goals: string) => {
    if (!qualification || !careerPath) return;
    setStep(4);
    setReportStatus('loading');
    setError(null);
    try {
      const result = await requestAdvisoryReport({
        qualification: qualification.label,
        category: qualification.category,
        fullForm: qualification.fullForm,
        careerPathTitle: careerPath.title,
        currentSkills,
        skillGaps,
        experienceNotes: notes,
        additionalGoals: goals,
      });
      setReport(result);
      setReportStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong generating your report.');
      setReportStatus('error');
    }
  };

  const restart = () => {
    setStep(0);
    setQualification(null);
    setCareerPath(null);
    setCurrentSkills([]);
    setSkillGaps([]);
    setExperienceNotes('');
    setAdditionalGoals('');
    setReport(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="noise-overlay" />
      <div className="drift-slow pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-beacon-500/10 blur-3xl" />
      <div className="drift-slow pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-signal-500/10 blur-3xl" style={{ animationDelay: '-6s' }} />

      <header className="relative border-b border-tarmac-800/80 px-5 py-5 sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center gap-2.5">
          <PlaneTakeoff size={20} className="text-beacon-400" />
          <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-runway-50">
            Fasttrack Career Launcher
          </span>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14">
        <ProgressRail current={step} />

        <div className="mt-10">
          {step === 0 && (
            <QualificationStep
              onSelect={(q) => {
                setQualification(q);
                setStep(1);
              }}
            />
          )}

          {step === 1 && qualification && (
            <CareerPathStep
              qualification={qualification}
              onBack={() => setStep(0)}
              onSelect={(p) => {
                setCareerPath(p);
                setStep(2);
              }}
            />
          )}

          {step === 2 && careerPath && (
            <SkillsStep
              path={careerPath}
              onBack={() => setStep(1)}
              onContinue={(have, gaps) => {
                setCurrentSkills(have);
                setSkillGaps(gaps);
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <DetailsStep
              onBack={() => setStep(2)}
              submitting={false}
              onSubmit={(notes, goals) => {
                setExperienceNotes(notes);
                setAdditionalGoals(goals);
                runReport(notes, goals);
              }}
            />
          )}

          {step === 4 && careerPath && (
            <ReportBoard
              status={reportStatus}
              report={report}
              error={error}
              careerPathTitle={careerPath.title}
              onRestart={restart}
              onRetry={() => runReport(experienceNotes, additionalGoals)}
            />
          )}
        </div>
      </main>

      <footer className="relative px-5 pb-10 sm:px-10">
        <p className="mx-auto max-w-3xl font-mono text-[10px] uppercase tracking-widest text-tarmac-600">
          Fasttrack Career Launcher · mapping Indian degrees to global careers
        </p>
      </footer>
    </div>
  );
}
