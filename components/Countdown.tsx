
import React, { useState, useEffect } from 'react';
import { PICNIC_DATE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = PICNIC_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center px-3">
      <span className="text-xl font-bold text-zinc-900 tabular-nums">{value.toString().padStart(2, '0')}</span>
      <span className="text-[8px] uppercase text-zinc-400 tracking-tighter font-black">{label}</span>
    </div>
  );

  return (
    <div className="bg-white border-y border-zinc-100 py-4 flex justify-center items-center gap-2 mb-6">
      <div className="text-zinc-300 text-[9px] font-black uppercase tracking-[0.2em] mr-4">COUNTDOWN</div>
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-zinc-200 font-light mb-2">:</span>
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <span className="text-zinc-200 font-light mb-2">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-zinc-200 font-light mb-2">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

export default Countdown;
