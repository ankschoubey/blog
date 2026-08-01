import { useMemo, useState } from 'react';
import { type PowerOfNEntry } from '../../data/latency-entries';

interface PowerQuizProps {
  entries: PowerOfNEntry[];
}

type QuestionType = 'to-power2' | 'to-power10' | 'to-approximate' | 'to-fullname' | 'from-power2' | 'from-power10' | 'from-approximate';

interface Question {
  entry: PowerOfNEntry;
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

const superscripts: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };

function toSuperscript(n: number): string {
  return n.toString().split('').map((c) => superscripts[c] ?? c).join('');
}

function power2Label(n: number): string {
  return `2${toSuperscript(n)}`;
}

function power10Label(n: number): string {
  return `10${toSuperscript(n)}`;
}

const types: QuestionType[] = ['to-power2', 'to-power10', 'to-approximate', 'to-fullname', 'from-power2', 'from-power10', 'from-approximate'];

function buildQuestions(entries: PowerOfNEntry[]): Question[] {
  return entries.map((entry) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const others = entries.filter((e) => e !== entry);
    const distractorValues = (get: (e: PowerOfNEntry) => string) => unique(others.map(get)).slice(0, 3);

    let prompt: string;
    let answer: string;
    let options: string[];

    if (type === 'to-power2') {
      prompt = entry.shortName;
      answer = power2Label(entry.power2);
      options = shuffle([answer, ...distractorValues((e) => power2Label(e.power2))]);
    } else if (type === 'to-power10') {
      prompt = entry.shortName;
      answer = power10Label(entry.power10);
      options = shuffle([answer, ...distractorValues((e) => power10Label(e.power10))]);
    } else if (type === 'to-approximate') {
      prompt = entry.shortName;
      answer = entry.approximate;
      options = shuffle([answer, ...distractorValues((e) => e.approximate)]);
    } else if (type === 'to-fullname') {
      prompt = entry.shortName;
      answer = entry.fullName;
      options = shuffle([answer, ...distractorValues((e) => e.fullName)]);
    } else if (type === 'from-power2') {
      prompt = power2Label(entry.power2);
      answer = entry.shortName;
      options = shuffle([answer, ...distractorValues((e) => e.shortName)]);
    } else if (type === 'from-power10') {
      prompt = power10Label(entry.power10);
      answer = entry.shortName;
      options = shuffle([answer, ...distractorValues((e) => e.shortName)]);
    } else {
      prompt = entry.approximate;
      answer = entry.shortName;
      options = shuffle([answer, ...distractorValues((e) => e.shortName)]);
    }

    return { entry, type, prompt, answer, options };
  });
}

const promptLabel: Record<QuestionType, string> = {
  'to-power2': 'What is the binary power?',
  'to-power10': 'What is the decimal power?',
  'to-approximate': 'What is the approximate value?',
  'to-fullname': 'What is the full name?',
  'from-power2': 'Which unit is this?',
  'from-power10': 'Which unit is this?',
  'from-approximate': 'Which unit is this?',
};

export const PowerQuiz = ({ entries }: PowerQuizProps) => {
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
      <div className="border-[2px] border-white/25 p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Quiz Complete</h3>
        <p className="text-lg mb-1">
          Score: <span className="font-bold">{score}</span> / {questions.length}
        </p>
        <p className="text-sm text-gray-400 mb-6">
          {score === questions.length ? 'Perfect!' : score >= questions.length * 0.7 ? 'Nice work!' : 'Keep practicing!'}
        </p>
        <button
          onClick={handleRestart}
          className="border-[2px] border-white/25 px-4 py-2 text-sm font-bold hover:bg-white/10 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="border-[2px] border-white/25 p-6">
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
        <span>{current + 1} / {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="text-center mb-6">
        <p className="text-xs text-gray-500 mb-2">{promptLabel[q.type]}</p>
        <p className="text-3xl font-bold">{q.prompt}</p>
      </div>

      <div className="max-w-md mx-auto mb-6 flex flex-col gap-2">
        {q.options.map((option) => {
          let cls = 'border-white/25 hover:bg-white/10';
          if (picked) {
            if (option === q.answer) {
              cls = 'border-green-500 text-green-300';
            } else if (option === picked) {
              cls = 'border-red-500 text-red-300';
            } else {
              cls = 'border-white/10 opacity-40';
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
          <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          {!isCorrect && (
            <p className="text-sm text-gray-300 mb-2">Answer: {q.answer}</p>
          )}
          <p className="text-sm text-gray-400">
            {q.entry.shortName} → {q.entry.fullName} · {power2Label(q.entry.power2)} · {power10Label(q.entry.power10)} · {q.entry.approximate}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        {picked && (
          <button
            onClick={handleNext}
            className="border-[2px] border-white/25 px-4 py-2 text-sm font-bold hover:bg-white/10 transition-colors"
          >
            {current + 1 >= questions.length ? 'See Results' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};
