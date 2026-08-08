import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend, // { value: '+12%', positive: true }
  accentColor = 'fresh-grass', // fresh-grass | sunshine-pop | coral-pop | sky-pop
  onClick,
  className = ''
}) => {
  const accentBorder = {
    'fresh-grass': 'border-l-4 border-l-fresh-grass',
    'sunshine-pop': 'border-l-4 border-l-sunshine-pop',
    'coral-pop': 'border-l-4 border-l-coral-pop',
    'sky-pop': 'border-l-4 border-l-sky-pop'
  }[accentColor] || '';

  return (
    <Card 
      onClick={onClick}
      className={`relative overflow-hidden ${accentBorder} ${onClick ? 'cursor-pointer hover:border-fresh-grass/50 hover:shadow-md transition-all' : ''} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-stone-gray uppercase tracking-wider block">{title}</span>
          <span className="text-3xl font-black text-ink-black tracking-tight block">{value}</span>
          {subtext && <p className="text-xs text-stone-gray font-medium mt-1">{subtext}</p>}
        </div>

        {Icon && (
          <div className="w-10 h-10 rounded-2xl bg-sandstone/30 flex items-center justify-center text-ink-black border border-hairline-mist">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-hairline-mist/60 flex items-center gap-1.5 text-xs font-bold">
          {trend.positive ? (
            <span className="text-[#2a6809] flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {trend.value}
            </span>
          ) : (
            <span className="text-coral-pop flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" />
              {trend.value}
            </span>
          )}
          <span className="text-stone-gray font-normal">vs previous period</span>
        </div>
      )}
    </Card>
  );
};
