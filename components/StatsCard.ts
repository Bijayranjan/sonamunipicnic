
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, subValue, icon, color = "text-zinc-900", onClick }) => {
  return React.createElement(
    'div',
    { 
      onClick: onClick,
      className: `cred-card p-4 rounded-2xl flex flex-col justify-between min-h-[120px] transition-all active:scale-95 ${onClick ? 'cursor-pointer hover:border-zinc-300' : ''}` 
    },
    React.createElement(
      'div',
      { className: "flex justify-between items-start" },
      React.createElement('span', { className: "text-zinc-400 text-[10px] font-bold uppercase tracking-wider" }, label),
      icon && React.createElement('div', { className: "text-zinc-300" }, icon)
    ),
    React.createElement(
      'div',
      null,
      React.createElement('div', { className: `text-2xl font-bold tracking-tight ${color}` }, value),
      subValue && React.createElement('div', { className: "text-[10px] text-zinc-400 mt-1 font-medium" }, subValue)
    )
  );
};

export default StatsCard;
