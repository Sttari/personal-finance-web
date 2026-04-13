interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const percent = Math.min(100, (value / max) * 100);
  const over = value > max;

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className={`h-full transition-all ${
          over ? "bg-red-500" : percent > 80 ? "bg-yellow-500" : "bg-green-500"
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}