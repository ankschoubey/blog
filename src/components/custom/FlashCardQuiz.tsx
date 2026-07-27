import { useState, useMemo, type KeyboardEvent } from 'react';
import { type LatencyEntry, LocationColors, Unit } from '../../data/latency-entries';

const gridIdMap: Record<Unit, string> = {
  [Unit.ns]: 'grid-ns',
  [Unit.microS]: 'grid-us',
  [Unit.mS]: 'grid-ms',
};

interface FlashCardQuizProps {
  entries: LatencyEntry[];
  totalQuestions?: number;
}

type QuestionType = 'guess-operation' | 'guess-latency';

interface Question {
  entry: LatencyEntry;
  type: QuestionType;
  useScientific: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function matchesAnswer(input: string, target: string): boolean {
  const normInput = normalize(input);
  const normTarget = normalize(target);
  if (normInput === normTarget) return true;
  const stripped = target.replace(/\s*\(.*?\)\s*/g, '');
  const normStripped = normalize(stripped);
  if (normInput === normStripped) return true;
  return normStripped.includes(normInput) || normInput.includes(normStripped);
}

const superscripts: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };

function toSuperscript(n: string): string {
  return n.split('').map((c) => superscripts[c] ?? c).join('');
}

function toScientific(actualLatency: string): string {
  const match = actualLatency.match(/^([\d.]+)\s*(ns|μs|ms)$/);
  if (!match) return actualLatency;
  const [, numStr, unit] = match;
  const num = parseFloat(numStr);
  const unitExp: Record<string, number> = { ns: -9, μs: -6, ms: -3 };
  const totalExp = unitExp[unit] + Math.floor(Math.log10(num));
  const mantissa = num / Math.pow(10, Math.floor(Math.log10(num)));
  const mantissaStr = mantissa % 1 === 0 ? mantissa.toString() : mantissa.toFixed(1);
  return `${mantissaStr} × 10${toSuperscript(String(totalExp))} s`;
}

const unitLabels: { unit: Unit; label: string; sci: string }[] = [
  { unit: Unit.ns, label: 'ns', sci: '10⁻⁹' },
  { unit: Unit.microS, label: 'μs', sci: '10⁻⁶' },
  { unit: Unit.mS, label: 'ms', sci: '10⁻³' },
];

export const FlashCardQuiz = ({ entries, totalQuestions = 10 }: FlashCardQuizProps) => {
  const questions = useMemo(() => {
    const picked = shuffle(entries).slice(0, totalQuestions);
    return picked.map<Question>((entry) => ({
      entry,
      type: Math.random() < 0.5 ? 'guess-operation' : 'guess-latency',
      useScientific: Math.random() < 0.5,
    }));
  }, [entries, totalQuestions]);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [numInput, setNumInput] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<Unit>(Unit.ns);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showLocationHint, setShowLocationHint] = useState(false);
  const [showUnitHint, setShowUnitHint] = useState(false);
  const [showBucketHint, setShowBucketHint] = useState(false);
  const [showMultiplierHint, setShowMultiplierHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const entry = q?.entry;
  const colors = entry ? LocationColors[entry.location] : undefined;

  const isGuessOp = q?.type === 'guess-operation';
  const answer = isGuessOp ? entry.name : entry.actualLatency;

  const canSubmit = isGuessOp ? !!textInput.trim() : !!numInput.trim();

  const handleSubmit = () => {
    if (!canSubmit || result) return;
    let correct: boolean;
    if (isGuessOp) {
      correct = matchesAnswer(textInput, answer);
    } else {
      const guess = `${numInput} ${selectedUnit}`;
      correct = matchesAnswer(guess, answer);
    }
    setResult(correct ? 'correct' : 'incorrect');
    if (correct) setScore((s) => s + 1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (result) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setTextInput('');
      setNumInput('');
      setSelectedUnit(Unit.ns);
      setResult(null);
      setShowLocationHint(false);
      setShowUnitHint(false);
      setShowBucketHint(false);
      setShowMultiplierHint(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setTextInput('');
    setNumInput('');
    setSelectedUnit(Unit.ns);
    setResult(null);
    setShowLocationHint(false);
    setShowUnitHint(false);
    setShowBucketHint(false);
    setShowMultiplierHint(false);
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
      {/* progress */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
        <span>{current + 1} / {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      {/* question */}
      <div className="text-center mb-6">
        <p className="text-xs text-gray-500 mb-2">
          {isGuessOp ? 'What operation has this latency?' : `What latency is ${entry.name}?`}
        </p>
        <p className="text-3xl font-bold">
          {isGuessOp ? (q.useScientific ? toScientific(entry.actualLatency) : entry.actualLatency) : entry.name}
        </p>
      </div>

      {/* hints */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {!showLocationHint && (
          <button
            onClick={() => setShowLocationHint(true)}
            className="border-[2px] border-white/25 px-3 py-1 text-xs hover:bg-white/10 transition-colors"
          >
            Show Location
          </button>
        )}
        {!showUnitHint && (
          <button
            onClick={() => setShowUnitHint(true)}
            className="border-[2px] border-white/25 px-3 py-1 text-xs hover:bg-white/10 transition-colors"
          >
            Show Unit
          </button>
        )}
        {!showBucketHint && (
          <button
            onClick={() => setShowBucketHint(true)}
            className="border-[2px] border-white/25 px-3 py-1 text-xs hover:bg-white/10 transition-colors"
          >
            Show Group
          </button>
        )}
        {!showMultiplierHint && (
          <button
            onClick={() => setShowMultiplierHint(true)}
            className="border-[2px] border-white/25 px-3 py-1 text-xs hover:bg-white/10 transition-colors"
          >
            Show Multiplier
          </button>
        )}
      </div>

      {/* hint reveals */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[28px]">
        {showLocationHint && (
          <span className={`${colors?.bg} ${colors?.text} border-[2px] border-white/25 px-2 py-0.5 text-xs`}>
            {entry.location}
          </span>
        )}
        {showUnitHint && (
          <span className="border-[2px] border-white/25 px-2 py-0.5 text-xs text-gray-300">
            {q.useScientific ? unitLabels.find((u) => u.unit === entry.unit)?.sci : entry.unit}
          </span>
        )}
        {showBucketHint && (
          <span className="border-[2px] border-white/25 px-2 py-0.5 text-xs text-gray-300">
            Group: {entry.bucket}
          </span>
        )}
        {showMultiplierHint && (
          <span className="border-[2px] border-white/25 px-2 py-0.5 text-xs text-gray-300">
            Multiplier: {entry.multiplier}
          </span>
        )}
      </div>

      {/* input */}
      <div className="max-w-md mx-auto mb-4">
        {isGuessOp ? (
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!!result}
            placeholder="Type the operation name..."
            className={`w-full bg-transparent border-[2px] px-3 py-2 text-sm outline-none transition-colors ${
              result === 'correct'
                ? 'border-green-500 text-green-300'
                : result === 'incorrect'
                ? 'border-red-500 text-red-300'
                : 'border-white/25 focus:border-white/50'
            }`}
          />
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              value={numInput}
              onChange={(e) => setNumInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!!result}
              placeholder="Number"
              className={`flex-1 bg-transparent border-[2px] px-3 py-2 text-sm outline-none transition-colors ${
                result === 'correct'
                  ? 'border-green-500 text-green-300'
                  : result === 'incorrect'
                  ? 'border-red-500 text-red-300'
                  : 'border-white/25 focus:border-white/50'
              }`}
            />
            <div className="flex">
              {unitLabels.map(({ unit, label, sci }) => (
                <button
                  key={unit}
                  onClick={() => !result && setSelectedUnit(unit)}
                  disabled={!!result}
                  className={`px-3 py-2 text-sm border-[2px] transition-colors ${
                    selectedUnit === unit
                      ? 'border-white/50 bg-white/10 font-bold'
                      : 'border-white/25 hover:bg-white/10'
                  } first:border-r-0`}
                >
                  {q.useScientific ? sci : label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* result + answer */}
      {result && (
        <div className="text-center mb-4">
          <p className={`text-sm font-bold mb-1 ${result === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
            {result === 'correct' ? 'Correct!' : 'Incorrect'}
          </p>
          {result === 'incorrect' && (
            <p className="text-sm text-gray-300 mb-2">{answer}</p>
          )}
          <button
            onClick={() => document.getElementById(gridIdMap[entry.unit])?.scrollIntoView({ behavior: 'smooth' })}
            className="border-[2px] border-white/25 px-3 py-1 text-xs hover:bg-white/10 transition-colors"
          >
            Jump to {entry.unit} Grid
          </button>
        </div>
      )}

      {/* actions */}
      <div className="flex justify-center">
        {!result ? (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="border-[2px] border-white/25 px-4 py-2 text-sm font-bold hover:bg-white/10 transition-colors disabled:opacity-30"
          >
            Submit
          </button>
        ) : (
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
