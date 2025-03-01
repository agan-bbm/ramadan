'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ramadanSchedule } from './data/ramadanSchedule';
import { useLanguage } from './context/LanguageContext';

function getNextMealTime(currentTime: string) {
  // Find today's schedule based on March 2025
  const today = new Date();
  const dayOfMonth = today.getDate();
  const scheduleIndex = Math.min(dayOfMonth - 1, ramadanSchedule.length - 1);
  const todaySchedule = ramadanSchedule[scheduleIndex];
  
  // If after Aksham or before Imsak, next meal is Imsak (Suhoor)
  if (currentTime > todaySchedule.aksham || currentTime < todaySchedule.imsak) {
    const nextDaySchedule = ramadanSchedule[scheduleIndex + 1] || ramadanSchedule[0];
    return {
      name: 'Suhoor',
      time: currentTime > todaySchedule.aksham ? nextDaySchedule.imsak : todaySchedule.imsak
    };
  }
  
  // Otherwise, next meal is Iftar (Aksham)
  return {
    name: 'Iftar',
    time: todaySchedule.aksham
  };
}

function calculateTimeDifference(targetTime: string): string {
  const [targetHours, targetMinutes] = targetTime.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(targetHours, targetMinutes, 0);

  // If target time is earlier than now, it's for tomorrow
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function Home() {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [nextMealTime, setNextMealTime] = useState('');
  const [nextMealType, setNextMealType] = useState('Suhoor');
  const [currentTime, setCurrentTime] = useState('');
  const [todaySchedule, setTodaySchedule] = useState(ramadanSchedule[0]);
  
  const { t } = useLanguage();

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const currentTimeStr = format(now, 'HH:mm');
      setCurrentTime(format(now, 'HH:mm:ss'));

      // Get next meal time
      const next = getNextMealTime(currentTimeStr);
      setNextMealType(next.name);
      setNextMealTime(next.time);

      // Calculate countdown
      const timeLeft = calculateTimeDifference(next.time);
      const [timeHours, timeMinutes, timeSeconds] = timeLeft.split(':');
      setHours(timeHours);
      setMinutes(timeMinutes);
      setSeconds(timeSeconds);

      // Update today's schedule
      const dayIndex = Math.min(now.getDate() - 1, ramadanSchedule.length - 1);
      setTodaySchedule(ramadanSchedule[dayIndex]);
    };

    const interval = setInterval(updateTimes, 1000);
    updateTimes();

    return () => clearInterval(interval);
  }, []);

  const getMealTranslation = (meal: string) => {
    if (meal === 'Suhoor') return t.meals.Suhoor;
    return t.meals.Iftar;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-12">
      <div className="location-badge">
        <p>{t.location}</p>
        <p className="current-time">{currentTime}</p>
      </div>

      <div className="w-full max-w-7xl px-4 text-center space-y-12">
        <div className="countdown-section">
          <h1 className="countdown-title">
            {t.timeUntil} {getMealTranslation(nextMealType)}
          </h1>
          
          <div className="countdown-display">
            <div className="time-block">
              <span className="time-number">{hours}</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-block">
              <span className="time-number">{minutes}</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-block">
              <span className="time-number">{seconds}</span>
            </div>
          </div>

          <div className="next-prayer">
            {getMealTranslation(nextMealType)} {t.startsAt}
            <div className={`next-prayer-time ${
              nextMealType === 'Suhoor' ? 'prayer-time-imsak' : 'prayer-time-aksham'
            }`}>
              {nextMealTime}
            </div>
          </div>
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="prayer-card">
            <h3 className="text-xl font-semibold mb-6 text-blue-400">{t.prayerTimes}</h3>
            <div className="space-y-2">
              {[
                { name: 'Imsak', time: todaySchedule.imsak, className: 'prayer-time-imsak' },
                { name: 'Fajr', time: todaySchedule.sabah },
                { name: 'Sunrise', time: todaySchedule.lindjaDiellit },
                { name: 'Dhuhr', time: todaySchedule.dreka },
                { name: 'Asr', time: todaySchedule.ikindia },
                { name: 'Maghrib', time: todaySchedule.aksham, className: 'prayer-time-aksham' },
                { name: 'Isha', time: todaySchedule.jacia }
              ].map(({ name, time, className }) => (
                <div key={name} className="prayer-time">
                  <span className="text-white/80 mr-4">{t.prayers[name as keyof typeof t.prayers]}</span>
                  <span className={className || "font-mono text-blue-300"}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="prayer-card">
            <h3 className="text-xl font-semibold mb-6 text-blue-400">{t.today}, {todaySchedule.date}</h3>
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/5">
                <div className="text-lg mb-2">{t.startOfFast}</div>
                <div className="prayer-time-imsak">
                  {todaySchedule.imsak}
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5">
                <div className="text-lg mb-2">{t.endOfFast}</div>
                <div className="prayer-time-aksham">
                  {todaySchedule.aksham}
                </div>
              </div>

              {todaySchedule.notes && (
                <div className="p-4 rounded-xl bg-blue-500/10">
                  <p className="text-blue-300">{todaySchedule.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 