import { useState, useEffect, useMemo, useRef } from 'react';
import { ramadan2026Data, eidData, type PrayerDay } from './data/prayerTimes';
import { quranAyats } from './data/quranAyats';
import { Moon, Sun, Clock, ChevronLeft, ChevronRight, Calendar, Utensils, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

function App() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
  const [shootingStarKey, setShootingStarKey] = useState(0);
  const swipeStartX = useRef<number | null>(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Trigger a shooting star after a random delay (> 6s)
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

  // Rotate Quran ayats every 4 seconds
  useEffect(() => {
    const ayatTimer = setInterval(() => {
      setCurrentAyatIndex((prev) => (prev + 1) % quranAyats.length);
    }, 4000);
    return () => clearInterval(ayatTimer);
  }, []);

  // Determine today's Ramadan day based on date
  // Ramadan 1 = Wednesday Feb 18 (Tuesday Feb 17 was Tarawih only, no fasting)
  const todayRamadanDay = useMemo(() => {
    const today = new Date();
    const ramadanStart = new Date('2026-02-18');
    const ramadanEnd = new Date('2026-03-19');
    
    if (today < ramadanStart) return 1;
    if (today > ramadanEnd) return 30;
    
    const diffTime = today.getTime() - ramadanStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(diffDays + 1, 1), 30);
  }, []);

  // Set initial selected day to today
  useEffect(() => {
    setSelectedDay(todayRamadanDay);
  }, [todayRamadanDay]);

  const currentDayData: PrayerDay = ramadan2026Data[selectedDay - 1];

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    } else if (direction === 'next' && selectedDay < 30) {
      setSelectedDay(selectedDay + 1);
    }
  };

  const navigateAyat = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentAyatIndex((prev) => (prev - 1 + quranAyats.length) % quranAyats.length);
    } else {
      setCurrentAyatIndex((prev) => (prev + 1) % quranAyats.length);
    }
  };

  const handleSwipeStart = (clientX: number) => {
    swipeStartX.current = clientX;
  };

  const handleSwipeEnd = (clientX: number) => {
    if (swipeStartX.current === null) return;
    const deltaX = clientX - swipeStartX.current;
    const swipeThreshold = 50;
    if (deltaX > swipeThreshold) {
      navigateAyat('prev');
    } else if (deltaX < -swipeThreshold) {
      navigateAyat('next');
    }
    swipeStartX.current = null;
  };

  const handleSwipeCancel = () => {
    swipeStartX.current = null;
  };

  const isToday = selectedDay === todayRamadanDay;

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
                <h1 className="text-lg font-bold text-emerald-100">Ramadan 2026</h1>
                <p className="text-xs text-emerald-400">1447 AH Prayer Times</p>
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
        <Card className="bg-black/90 border-white/10 shadow-lg">
          <CardContent className="px-4 py-2 relative overflow-hidden">
            <span key={shootingStarKey} className="shooting-star" aria-hidden="true" />
            <div
              className="flex flex-col items-center gap-1 text-center select-none touch-pan-y"
              onTouchStart={(event) => handleSwipeStart(event.touches[0].clientX)}
              onTouchEnd={(event) => handleSwipeEnd(event.changedTouches[0].clientX)}
              onTouchCancel={handleSwipeCancel}
              onMouseDown={(event) => handleSwipeStart(event.clientX)}
              onMouseUp={(event) => handleSwipeEnd(event.clientX)}
              onMouseLeave={handleSwipeCancel}
            >
              <div className="min-w-0">
                <p className="text-lg font-arabic text-amber-100 text-center leading-relaxed" dir="rtl">
                  {quranAyats[currentAyatIndex].arabic}
                </p>
                <p className="text-sm text-slate-100/90 italic leading-relaxed">
                  "{quranAyats[currentAyatIndex].english}" -{' '}
                  <span className="text-xs text-slate-300 not-italic">
                    {quranAyats[currentAyatIndex].reference}
                  </span>
                </p>
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
            disabled={selectedDay === 1}
            className="border-emerald-700/50 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-200 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 rounded-full px-4 py-2 border border-emerald-700/30">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">
                Day {selectedDay} of 30
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
            disabled={selectedDay === 30}
            className="border-emerald-700/50 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-200 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Date Display */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-emerald-100">
            {currentDayData.hijriDate}
          </h2>
          <p className="text-emerald-400">
            {currentDayData.dayName}, {currentDayData.gregorianDate}/2026
          </p>
        </div>

        {/* Sehri & Iftar Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-indigo-900/60 to-indigo-950/60 border-indigo-700/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Sehri Ends</span>
              </div>
              <p className="text-2xl font-bold text-white">{currentDayData.fajrAdhan}</p>
              <p className="text-xs text-indigo-400 mt-1">Fajr Adhan</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-900/60 to-amber-950/60 border-amber-700/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Utensils className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">Iftar</span>
              </div>
              <p className="text-2xl font-bold text-white">{currentDayData.maghribAdhan}</p>
              <p className="text-xs text-amber-400 mt-1">Maghrib Adhan</p>
            </CardContent>
          </Card>
        </div>

        {/* Prayer Times */}
        <Card className="bg-emerald-900/40 border-emerald-700/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-emerald-800/30">
              {/* Fajr */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
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
                  <p className="font-semibold text-emerald-100">{currentDayData.fajrAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.fajrIqamah}</p>
                </div>
              </div>

              {/* Sunrise */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
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
                  <p className="font-semibold text-emerald-100">{currentDayData.sunrise}</p>
                </div>
              </div>

              {/* Dhuhr */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
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
                  <p className="font-semibold text-emerald-100">{currentDayData.dhuhrAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.dhuhrIqamah}</p>
                </div>
              </div>

              {/* Asr */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
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
                  <p className="font-semibold text-emerald-100">{currentDayData.asrAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.asrIqamah}</p>
                </div>
              </div>

              {/* Maghrib */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors bg-amber-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-100">Maghrib</p>
                    <p className="text-xs text-amber-500">Sunset Prayer • Iftar</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-100">{currentDayData.maghribAdhan}</p>
                  <p className="text-xs text-amber-500">Iqamah: {currentDayData.maghribIqamah}</p>
                </div>
              </div>

              {/* Isha */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
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
                  <p className="font-semibold text-emerald-100">{currentDayData.ishaAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.ishaIqamah}</p>
                </div>
              </div>

              {/* Tarawih */}
              <div className="p-4 flex items-center justify-between bg-emerald-800/30">
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
                  <p className="font-semibold text-emerald-100">{currentDayData.tarawih}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Day Selector */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-emerald-400">Quick Jump</p>
          <Tabs value={selectedDay.toString()} onValueChange={(v) => setSelectedDay(parseInt(v))}>
            <TabsList className="flex flex-wrap h-auto gap-1 bg-emerald-950/50 p-1">
              {ramadan2026Data.map((day) => (
                <TabsTrigger
                  key={day.hijriDay}
                  value={day.hijriDay.toString()}
                  className="w-8 h-8 p-0 text-xs data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-emerald-400 hover:bg-emerald-900/50"
                >
                  {day.hijriDay}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Eid Info */}
        <Card className="bg-gradient-to-r from-emerald-800/40 to-teal-800/40 border-emerald-600/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Sun className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-100">Eid al-Fitr</h3>
                <p className="text-sm text-emerald-400">{eidData.hijriDate} • {eidData.dayName}, {eidData.gregorianDate}/2026</p>
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

        {/* Footer */}
        <footer className="text-center text-xs text-emerald-600 py-4">
          <p>Based on CIMIC website schedules</p>
          <p className="mt-1">vibecoded by saadi, with love</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
