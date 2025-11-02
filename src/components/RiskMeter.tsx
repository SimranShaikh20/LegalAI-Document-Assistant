import { RiskLevel } from "@/types";

interface RiskMeterProps {
  score: number;
  level: RiskLevel;
}

export const RiskMeter = ({ score, level }: RiskMeterProps) => {
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (level === 'low') return 'hsl(var(--success))';
    if (level === 'medium') return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getGradient = () => {
    if (level === 'low') return 'var(--gradient-success)';
    if (level === 'medium') return 'var(--gradient-warning)';
    return 'var(--gradient-danger)';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-48 w-48">
        {/* Background circle */}
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke={getColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold" style={{ color: getColor() }}>
            {score}
          </div>
          <div className="text-sm font-medium text-muted-foreground">Risk Score</div>
        </div>
      </div>

      {/* Risk level badge */}
      <div
        className="mt-4 rounded-full px-6 py-2 text-sm font-semibold text-white"
        style={{ background: getGradient() }}
      >
        {level === 'low' && '✓ Low Risk'}
        {level === 'medium' && '⚠ Medium Risk'}
        {level === 'high' && '⚠ High Risk'}
      </div>
    </div>
  );
};
