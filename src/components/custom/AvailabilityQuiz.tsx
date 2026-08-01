import { useMemo, useState } from 'react';
import { type AvailabilityMnemonicEntry } from '../../data/latency-entries';

interface AvailabilityQuizProps {
  entries: AvailabilityMnemonicEntry[];
}

type QuestionType = 'level-to-mnemonic' | 'level-to-downtime' | 'to-level' | 'meaning-to-level';

interface Question {
  entry: AvailabilityMnemonicEntry;
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

const types: QuestionType[] = ['level-to-mnemonic', 'level-to-downtime', 'to-level', 'meaning-to-level'];

function buildQuestions(entries: AvailabilityMnemonicEntry[]): Question[] {
  return entries.map((entry) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const others = entries.filter((e) => e.level !== entry.level);
    const distractors = shuffle(others).slice(0, 3);

    let prompt: string;
    let answer: string;
    let pool: string[];

    if (type === 'level-to-mnemonic') {
      prompt = entry.level;
      answer = entry.mnemonic;
      pool = [entry.mnemonic, ...distractors.map((d) => d.mnemonic)];
    } else if (type === 'level-to-downtime') {
      prompt = entry.level;
      answer = entry.downtimePerYear;
      pool = [entry.downtimePerYear, ...distractors.map((d) => d.downtimePerYear)];
    } else if (type === 'meaning-to-level') {
      prompt = entry.meaning;
      answer = entry.level;
      pool = [entry.level, ...distractors.map((d) => d.level)];
    } else {
      const useMnemonic = Math.random() < 0.5;
      prompt = useMnemonic ? entry.mnemonic : entry.downtimePerYear;
      answer = entry.level;
      pool = [entry.level, ...distractors.map((d) => d.level)];
    }

    return { entry, type, prompt, answer, options: shuffle(pool) };
  });
}

const promptLabel: Record<QuestionType, string> = {
  'level-to-mnemonic': 'What is the mnemonic?',
  'level-to-downtime': 'What is the downtime per year (approx.)?',
  'to-level': 'What availability level?',
  'meaning-to-level': 'Which availability level does this describe?',
};

export const AvailabilityQuiz = ({ entries }: AvailabilityQuizProps) => {
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
          <p className="text-sm text-gray-400 mb-2">
            {q.entry.level} → {q.entry.mnemonic} ({q.entry.downtimePerYear} per year)
          </p>
          <button
            onClick={() => document.getElementById('AvailabilityTable')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-[2px] border-white/25 px-3 py-1 text-xs hover:bg-white/10 transition-colors"
          >
            Jump to Mnemonics Table
          </button>
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
