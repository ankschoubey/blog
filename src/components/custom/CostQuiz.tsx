import { useMemo, useState } from 'react';
import { type CostEntry } from '../../data/latency-entries';

interface CostQuizProps {
  entries: CostEntry[];
  totalQuestions?: number;
}

type QuestionType = 'name-to-price' | 'price-to-name';

interface Question {
  entry: CostEntry;
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

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function buildOptions(correct: string, distractors: string[]): string[] {
  const others = unique(distractors.filter((d) => d !== correct)).slice(0, 3);
  return shuffle([correct, ...others]);
}

function buildQuestions(entries: CostEntry[], totalQuestions: number): Question[] {
  const priced = entries.filter((e) => e.pricePerMonth !== '');
  const picked = shuffle(priced).slice(0, totalQuestions);

  return picked.map((entry) => {
    const others = priced.filter((e) => e !== entry);
    const type: QuestionType = Math.random() < 0.5 ? 'name-to-price' : 'price-to-name';

    if (type === 'name-to-price') {
      return {
        entry,
        type,
        prompt: entry.name,
        answer: entry.pricePerMonth,
        options: buildOptions(entry.pricePerMonth, others.map((o) => o.pricePerMonth)),
      };
    }
    return {
      entry,
      type,
      prompt: entry.pricePerMonth,
      answer: entry.name,
      options: buildOptions(entry.name, others.map((o) => o.name)),
    };
  });
}

const promptLabel: Record<QuestionType, string> = {
  'name-to-price': 'What is the monthly cost?',
  'price-to-name': 'What costs this per month?',
};

const border = 'border-gray-300 dark:border-white/25';
const hover = 'hover:bg-black/5 dark:hover:bg-white/10';

export const CostQuiz = ({ entries, totalQuestions = 10 }: CostQuizProps) => {
  const questions = useMemo(() => shuffle(buildQuestions(entries, totalQuestions)), [entries, totalQuestions]);

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
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {q.entry.name} ({q.entry.category}) · {q.entry.amount || '-'} · {q.entry.pricePerMonth} / month
          </p>
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
