import { useMemo, useState } from 'react';
import { type BandwidthEntry } from '../../data/latency-entries';

interface BandwidthQuizProps {
  entries: BandwidthEntry[];
}

type QuestionType = 'speed-to-throughput' | 'speed-to-transfer' | 'throughput-to-speed' | 'transfer-to-speed';

interface Question {
  entry: BandwidthEntry;
  type: QuestionType;
  prompt: string;
  answer: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const types: QuestionType[] = ['speed-to-throughput', 'speed-to-transfer', 'throughput-to-speed', 'transfer-to-speed'];

function buildQuestions(entries: BandwidthEntry[]): Question[] {
  return entries.map((entry) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const others = entries.filter((e) => e.linkSpeed !== entry.linkSpeed);
    const distractors = shuffle(others).slice(0, 3);

    let prompt: string;
    let answer: string;
    let pool: string[];

    if (type === 'speed-to-throughput') {
      prompt = entry.linkSpeed;
      answer = entry.throughput;
      pool = [entry.throughput, ...distractors.map((d) => d.throughput)];
    } else if (type === 'speed-to-transfer') {
      prompt = entry.linkSpeed;
      answer = entry.transferTime;
      pool = [entry.transferTime, ...distractors.map((d) => d.transferTime)];
    } else if (type === 'throughput-to-speed') {
      prompt = entry.throughput;
      answer = entry.linkSpeed;
      pool = [entry.linkSpeed, ...distractors.map((d) => d.linkSpeed)];
    } else {
      prompt = entry.transferTime;
      answer = entry.linkSpeed;
      pool = [entry.linkSpeed, ...distractors.map((d) => d.linkSpeed)];
    }

    return { entry, type, prompt, answer, options: shuffle(pool) };
  });
}

const promptLabel: Record<QuestionType, string> = {
  'speed-to-throughput': 'What is the throughput? (÷8)',
  'speed-to-transfer': 'How long to transfer 1 GB?',
  'throughput-to-speed': 'What link speed gives this throughput?',
  'transfer-to-speed': 'What link speed transfers 1 GB in this time?',
};

const border = 'border-gray-300 dark:border-white/25';
const hover = 'hover:bg-black/5 dark:hover:bg-white/10';

export const BandwidthQuiz = ({ entries }: BandwidthQuizProps) => {
  const questions = useMemo(() => shuffle(buildQuestions(entries)), [entries]);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const isCorrect = picked === q?.answer;

  const handlePick = (option: string) => {
    if (picked) return;
    setPicked(option);
    if (option === q.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setPicked(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setPicked(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className={`border-[2px] ${border} p-8 text-center`}>
        <h3 className="text-2xl font-bold mb-2">Quiz Complete</h3>
        <p className="text-lg mb-1">
          Score: <span className="font-bold">{score}</span> / {questions.length}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {score === questions.length ? 'Perfect!' : score >= questions.length * 0.7 ? 'Nice work!' : 'Keep practicing!'}
        </p>
        <button
          onClick={handleRestart}
          className={`border-[2px] ${border} px-4 py-2 text-sm font-bold ${hover} transition-colors`}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`border-[2px] ${border} p-6`}>
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{current + 1} / {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="text-center mb-6">
        <p className="text-xs text-gray-600 dark:text-gray-500 mb-2">{promptLabel[q.type]}</p>
        <p className="text-3xl font-bold">{q.prompt}</p>
      </div>

      <div className="max-w-md mx-auto mb-6 flex flex-col gap-2">
        {q.options.map((option) => {
          let cls = `${border} ${hover}`;
          if (picked) {
            if (option === q.answer) {
              cls = 'border-green-600 text-green-700 dark:border-green-500 dark:text-green-300';
            } else if (option === picked) {
              cls = 'border-red-600 text-red-700 dark:border-red-500 dark:text-red-300';
            } else {
              cls = 'border-black/10 opacity-40 dark:border-white/10';
            }
          }
          return (
            <button
              key={option}
              onClick={() => handlePick(option)}
              disabled={!!picked}
              className={`border-[2px] px-3 py-2 text-sm font-bold transition-colors ${cls}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="text-center mb-4">
          <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          {!isCorrect && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Answer: {q.answer}</p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {q.entry.linkSpeed} → {q.entry.throughput}, 1 GB in {q.entry.transferTime}
          </p>
          <button
            onClick={() => document.getElementById('BandwidthTable')?.scrollIntoView({ behavior: 'smooth' })}
            className={`border-[2px] ${border} px-3 py-1 text-xs ${hover} transition-colors`}
          >
            Jump to Bandwidth Table
          </button>
        </div>
      )}

      <div className="flex justify-center">
        {picked && (
          <button
            onClick={handleNext}
            className={`border-[2px] ${border} px-4 py-2 text-sm font-bold ${hover} transition-colors`}
          >
            {current + 1 >= questions.length ? 'See Results' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};
