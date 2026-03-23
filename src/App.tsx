import { useState, useEffect, useMemo, useRef } from 'react';
import {
  prayerData,
  eidData,
  getDateKey,
  isRamadan,
  EID_2026_DATE,
} from './data/prayerTimes';
import { quranAyats } from './data/quranAyats';
import { Moon, Sun, Clock, ChevronLeft, ChevronRight, Calendar, Utensils, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';


function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
  const [shootingStarKey, setShootingStarKey] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const quickJumpRef = useRef<HTMLDivElement>(null);

  const todayKey = useMemo(() => getDateKey(new Date()), []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timerId = 0;
    const scheduleStar = () => {
      const delay = 6000 + Math.random() * 8000;
      timerId = window.setTimeout(() => {
        setShootingStarKey((prev) => prev + 1);
        scheduleStar();
      }, delay);
    };
    scheduleStar();
    return () => window.clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const ayatTimer = setInterval(() => {
      setCurrentAyatIndex((prev) => (prev + 1) % quranAyats.length);
    }, 4000);
    return () => clearInterval(ayatTimer);
  }, []);

  // Scroll quick-jump to selected day
  useEffect(() => {
    if (quickJumpRef.current) {
      const container = quickJumpRef.current;
      const btn = container.querySelector(`[data-day="${selectedDate.getDate()}"]`) as HTMLElement;
      if (btn) {
        const containerWidth = container.offsetWidth;
        const btnLeft = btn.offsetLeft;
        const btnWidth = btn.offsetWidth;
        container.scrollTo({ left: btnLeft - containerWidth / 2 + btnWidth / 2, behavior: 'smooth' });
      }
    }
  }, [selectedDate]);

  const parseTime = (timeStr: string): number => {
    if (!timeStr) return -1;
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return -1;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const selectedKey = getDateKey(selectedDate);
  const entry = prayerData[selectedKey];
  const inRamadan = isRamadan(selectedDate);
  const isFriday = selectedDate.getDay() === 5;
  const isToday = selectedKey === todayKey;

  // Show Eid card a couple days before and on Eid
  const showEid = selectedKey >= '2026-03-18' && selectedKey <= EID_2026_DATE;

  const nextPrayerKey = useMemo(() => {
    if (!entry || !isToday) return null;
    const nowMins = currentTime.getHours() * 60 + currentTime.getMinutes();
    // Each prayer is highlighted until 15 min after its iqamah (or adhan for maghrib/tarawih).
    // The first prayer whose cutoff is still in the future is the active/next prayer.
    const prayers = [
      { key: 'fajr',    cutoff: parseTime(entry.fajrIqamah) + 15 },
      { key: 'dhuhr',   cutoff: parseTime(entry.dhuhrIqamah) + 15 },
      { key: 'asr',     cutoff: parseTime(entry.asrIqamah) + 15 },
      { key: 'maghrib', cutoff: parseTime(entry.maghribAdhan) + 15 },
      { key: 'isha',    cutoff: parseTime(entry.ishaIqamah) + 15 },
      ...(inRamadan && entry.tarawih ? [{ key: 'tarawih', cutoff: parseTime(entry.tarawih) + 30 }] : []),
    ];
    const active = prayers.find((p) => p.cutoff > nowMins);
    return active ? active.key : null;
  }, [currentTime, entry, isToday, inRamadan]);

  const navigateDay = (direction: 'prev' | 'next') => {
    setSelectedDate((d) => {
      const next = new Date(d);
      next.setDate(next.getDate() + (direction === 'next' ? 1 : -1));
      return next;
    });
  };

  const navigateAyat = (direction: 'prev' | 'next') => {
    if (direction === 'prev') setCurrentAyatIndex((prev) => (prev - 1 + quranAyats.length) % quranAyats.length);
    else setCurrentAyatIndex((prev) => (prev + 1) % quranAyats.length);
  };

  const handleSwipeStart = (clientX: number) => { swipeStartX.current = clientX; };
  const handleSwipeEnd = (clientX: number) => {
    if (swipeStartX.current === null) return;
    const deltaX = clientX - swipeStartX.current;
    if (deltaX > 50) navigateAyat('prev');
    else if (deltaX < -50) navigateAyat('next');
    swipeStartX.current = null;
  };
  const handleSwipeCancel = () => { swipeStartX.current = null; };

  const prayerRowClass = (key: string) =>
    `p-4 flex items-center justify-between transition-colors ${
      nextPrayerKey === key
        ? 'border-l-2 border-emerald-400 bg-emerald-800/30'
        : 'hover:bg-emerald-800/20'
    }`;

  // Days in the selected month for quick-jump
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white">
      {/* Header */}
      <header className="bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-emerald-100">Prayer Times</h1>
                <p className="text-xs text-emerald-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Champaign-Urbana
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-emerald-200">
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <p className="text-xs text-emerald-400">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* Quran Ayat Rotator */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-[#0b1026] h-40 group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-[#020617]" />
          <div className="absolute inset-0 opacity-70">
            <div className="absolute top-4 left-12 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_white]" />
            <div className="absolute top-10 right-24 w-0.5 h-0.5 bg-white rounded-full" />
            <div className="absolute top-6 left-1/3 w-1 h-1 bg-indigo-200 rounded-full opacity-80" />
            <div className="absolute top-14 right-10 w-0.5 h-0.5 bg-slate-300 rounded-full" />
          </div>
          <div className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none">
            <svg className="absolute bottom-0 w-full h-[85%] text-indigo-900/30" viewBox="0 0 1200 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,229.3C672,245,768,235,864,208C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            </svg>
            <svg className="absolute bottom-0 w-full h-[65%] text-slate-900/50" viewBox="0 0 1200 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,288L60,272C120,256,240,224,360,224C480,224,600,256,720,250.7C840,245,960,203,1080,197.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
            </svg>
            <svg className="absolute bottom-[-1px] w-full h-[45%] text-[#020617]" viewBox="0 0 1200 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,256L80,229.3C160,203,320,149,480,165.3C640,181,800,267,960,277.3C1120,288,1280,224,1360,192L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
            </svg>
          </div>
          <span key={shootingStarKey} className="shooting-star" aria-hidden="true" />
          <CardContent className="relative z-10 px-4 py-0 flex items-center justify-center h-full">
            <div
              className="flex flex-col items-center justify-center gap-1 text-center select-none touch-pan-y w-full max-w-2xl mx-auto"
              onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
              onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX)}
              onTouchCancel={handleSwipeCancel}
              onMouseDown={(e) => handleSwipeStart(e.clientX)}
              onMouseUp={(e) => handleSwipeEnd(e.clientX)}
              onMouseLeave={handleSwipeCancel}
            >
              <div className="min-w-0 animate-in fade-in zoom-in duration-700 space-y-1">
                <p className="text-xl font-arabic text-amber-50 text-center leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" dir="rtl">
                  {quranAyats[currentAyatIndex].arabic}
                </p>
                <div className="space-y-0.5">
                  <p className="text-sm text-indigo-100 italic leading-snug font-light drop-shadow-md line-clamp-2">
                    "{quranAyats[currentAyatIndex].english}"
                  </p>
                  <p className="text-[10px] text-indigo-300/80 uppercase tracking-widest font-medium">
                    {quranAyats[currentAyatIndex].reference}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDay('prev')}
            className="border-emerald-700/50 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 rounded-full px-4 py-2 border border-emerald-700/30">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">
                {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              {isToday && (
                <span className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDay('next')}
            className="border-emerald-700/50 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-200"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Date Display */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-emerald-100">{formattedDate}</h2>
        </div>

        {/* No data fallback */}
        {!entry ? (
          <Card className="bg-emerald-900/40 border-emerald-700/30">
            <CardContent className="p-8 text-center">
              <p className="text-emerald-400 text-sm">Schedule coming soon — check cimic.org for updates</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Sehri & Iftar Cards — Ramadan only */}
            {inRamadan && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-indigo-900/60 to-indigo-950/60 border-indigo-700/30">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Coffee className="w-4 h-4 text-indigo-300" />
                      <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Sehri Ends</span>
                    </div>
                    <p className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(165,180,252,0.5)]">
                      {entry.fajrAdhan}
                    </p>
                    <p className="text-xs text-indigo-400 mt-1">Fajr Adhan</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-900/60 to-amber-950/60 border-amber-700/30">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Utensils className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">Iftar</span>
                    </div>
                    <p className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                      {entry.maghribAdhan}
                    </p>
                    <p className="text-xs text-amber-400 mt-1">Maghrib Adhan</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Jumu'ah Card — Fridays only */}
            {isFriday && entry.jumuahTimes && (
              <Card className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border-teal-700/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <Sun className="w-5 h-5 text-teal-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-100">Jumu'ah</h3>
                      <p className="text-sm text-teal-400">Friday Prayer</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-teal-950/50 rounded-lg p-2">
                      <p className="text-xs text-teal-500">1st Prayer</p>
                      <p className="font-semibold text-teal-200">{entry.jumuahTimes[0]}</p>
                    </div>
                    <div className="bg-teal-950/50 rounded-lg p-2">
                      <p className="text-xs text-teal-500">2nd Prayer</p>
                      <p className="font-semibold text-teal-200">{entry.jumuahTimes[1]}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prayer Times */}
            <Card className="bg-emerald-900/40 border-emerald-700/30 overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y divide-emerald-800/30">
                  {/* Fajr */}
                  <div className={prayerRowClass('fajr')}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Moon className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-100">Fajr</p>
                        <p className="text-xs text-emerald-500">Dawn Prayer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-100">{entry.fajrAdhan}</p>
                      <p className="text-xs text-emerald-500">Iqamah: {entry.fajrIqamah}</p>
                    </div>
                  </div>

                  {/* Sunrise */}
                  <div className={prayerRowClass('sunrise')}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Sun className="w-4 h-4 text-orange-300" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-100">Sunrise</p>
                        <p className="text-xs text-emerald-500">Ishraq time</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-100">{entry.sunrise}</p>
                    </div>
                  </div>

                  {/* Dhuhr */}
                  <div className={prayerRowClass('dhuhr')}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Sun className="w-4 h-4 text-yellow-300" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-100">Dhuhr</p>
                        <p className="text-xs text-emerald-500">Noon Prayer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-100">{entry.dhuhrAdhan}</p>
                      <p className="text-xs text-emerald-500">Iqamah: {entry.dhuhrIqamah}</p>
                    </div>
                  </div>

                  {/* Asr */}
                  <div className={prayerRowClass('asr')}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <Sun className="w-4 h-4 text-amber-300" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-100">Asr</p>
                        <p className="text-xs text-emerald-500">Afternoon Prayer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-100">{entry.asrAdhan}</p>
                      <p className="text-xs text-emerald-500">Iqamah: {entry.asrIqamah}</p>
                    </div>
                  </div>

                  {/* Maghrib */}
                  <div className={prayerRowClass('maghrib')}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                        <Sun className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-100">Maghrib</p>
                        <p className="text-xs text-emerald-500">
                          Sunset Prayer{inRamadan ? ' • Iftar' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-100">{entry.maghribAdhan}</p>
                      <p className="text-xs text-emerald-500">At Sunset</p>
                    </div>
                  </div>

                  {/* Isha */}
                  <div className={prayerRowClass('isha')}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                        <Moon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-100">Isha</p>
                        <p className="text-xs text-emerald-500">Night Prayer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-100">{entry.ishaAdhan}</p>
                      <p className="text-xs text-emerald-500">Iqamah: {entry.ishaIqamah}</p>
                    </div>
                  </div>

                  {/* Tarawih — Ramadan only */}
                  {inRamadan && entry.tarawih && (
                    <div className={`${prayerRowClass('tarawih')} bg-emerald-800/30`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-emerald-300" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-100">Tarawih</p>
                          <p className="text-xs text-emerald-500">Ramadan Night Prayer</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-100">{entry.tarawih}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

          </>
        )}

        {/* Quick Day Selector */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-emerald-400">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <div
            ref={quickJumpRef}
            className="flex overflow-x-auto gap-1 pb-2 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const dayKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasData = !!prayerData[dayKey];
              const isSelected = day === selectedDate.getDate();
              const isTodayDay = dayKey === todayKey;
              return (
                <button
                  key={day}
                  data-day={day}
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setDate(day);
                    setSelectedDate(d);
                  }}
                  className={`flex-shrink-0 w-8 h-8 text-xs rounded-md transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : isTodayDay
                      ? 'bg-emerald-700/60 text-emerald-200 ring-1 ring-emerald-400'
                      : hasData
                      ? 'bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/50'
                      : 'bg-emerald-950/30 text-emerald-700 hover:bg-emerald-950/50'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Eid Info — shown near Eid */}
        {showEid && (
          <Card className="bg-gradient-to-r from-emerald-800/40 to-teal-800/40 border-emerald-600/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Sun className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100">Eid al-Fitr</h3>
                  <p className="text-sm text-emerald-400">
                    {eidData.hijriDate} • {eidData.dayName}, {eidData.gregorianDate}/2026
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-950/50 rounded-lg p-2">
                  <p className="text-xs text-emerald-500">1st Prayer</p>
                  <p className="font-semibold text-emerald-200">{eidData.firstEidPrayer}</p>
                </div>
                <div className="bg-emerald-950/50 rounded-lg p-2">
                  <p className="text-xs text-emerald-500">2nd Prayer</p>
                  <p className="font-semibold text-emerald-200">{eidData.secondEidPrayer}</p>
                </div>
                <div className="bg-emerald-950/50 rounded-lg p-2">
                  <p className="text-xs text-emerald-500">3rd Prayer</p>
                  <p className="font-semibold text-emerald-200">{eidData.thirdEidPrayer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center text-emerald-200 py-6 mt-2">
          <p className="text-xs">Based on CIMIC website schedules</p>
          <p className="text-[11px] mt-1">
            vibecoded by saadi, with claude & love &middot;{' '}
            <a
              href="https://github.com/sadiulchyon/ramadan_schedules_cimic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-200"
            >
              github
            </a>
          </p>
        </footer>

      </main>
    </div>
  );
}

export default App;
