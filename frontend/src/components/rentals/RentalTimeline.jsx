import React from 'react';
import { CheckCircle2, Clock, PackageCheck, ShieldCheck } from 'lucide-react';

export const RentalTimeline = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="w-full py-4">
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-hairline-mist z-0" />

        {timeline.map((step, idx) => {
          const isCompleted = step.completed;
          const isCurrent = !isCompleted && (idx === 0 || timeline[idx - 1]?.completed);

          return (
            <div key={idx} className="relative z-10 flex md:flex-col items-center gap-3 md:gap-2 text-left md:text-center group">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-fresh-grass text-ink-black ring-4 ring-fresh-grass/20'
                    : isCurrent
                    ? 'bg-sunshine-pop text-ink-black ring-4 ring-sunshine-pop/30 animate-pulse'
                    : 'bg-pure-white border-2 border-hairline-mist text-stone-gray'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div>
                <h4 className={`text-xs font-bold ${isCompleted ? 'text-ink-black' : isCurrent ? 'text-ink-black font-extrabold' : 'text-stone-gray'}`}>
                  {step.step}
                </h4>
                <p className="text-[11px] text-stone-gray mt-0.5">
                  {step.date || (isCompleted ? 'Done' : 'Pending')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
