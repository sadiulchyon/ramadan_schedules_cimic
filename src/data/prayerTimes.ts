export interface DailyPrayerEntry {
  fajrAdhan: string;
  sunrise: string;
  dhuhrAdhan: string;
  asrAdhan: string;
  maghribAdhan: string; // Maghrib iqamah = sunset = same as adhan
  ishaAdhan: string;
  fajrIqamah: string;
  dhuhrIqamah: string;
  asrIqamah: string;
  ishaIqamah: string;
  tarawih?: string;        // only during Ramadan
  jumuahTimes?: string[];  // only on Fridays
}

export function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const RAMADAN_2026_START = '2026-02-18';
export const RAMADAN_2026_END   = '2026-03-19';
export const EID_2026_DATE      = '2026-03-20';

export function isRamadan(date: Date): boolean {
  const key = getDateKey(date);
  return key >= RAMADAN_2026_START && key <= RAMADAN_2026_END;
}

export const eidData = {
  hijriDate: "Shawwal 1",
  gregorianDate: "03/20",
  dayName: "FRI",
  firstEidPrayer: "7:15 AM",
  secondEidPrayer: "9:00 AM",
  thirdEidPrayer: "10:30 AM",
};

// ---------------------------------------------------------------------------
// Year-round prayer data, keyed by "YYYY-MM-DD"
// ---------------------------------------------------------------------------
export const prayerData: Record<string, DailyPrayerEntry> = {
  // ── Feb 18–28 (Ramadan days 1–11, from original Ramadan schedule) ────────
  "2026-02-18": { fajrAdhan:"5:11 AM", sunrise:"6:42 AM", dhuhrAdhan:"12:12 PM", asrAdhan:"3:06 PM", maghribAdhan:"5:35 PM", ishaAdhan:"6:55 PM", fajrIqamah:"5:45 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-19": { fajrAdhan:"5:10 AM", sunrise:"6:40 AM", dhuhrAdhan:"12:12 PM", asrAdhan:"3:07 PM", maghribAdhan:"5:36 PM", ishaAdhan:"6:56 PM", fajrIqamah:"5:45 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-20": { fajrAdhan:"5:09 AM", sunrise:"6:39 AM", dhuhrAdhan:"12:12 PM", asrAdhan:"3:07 PM", maghribAdhan:"5:38 PM", ishaAdhan:"6:57 PM", fajrIqamah:"5:45 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-21": { fajrAdhan:"5:07 AM", sunrise:"6:38 AM", dhuhrAdhan:"12:11 PM", asrAdhan:"3:08 PM", maghribAdhan:"5:39 PM", ishaAdhan:"6:58 PM", fajrIqamah:"5:45 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-22": { fajrAdhan:"5:06 AM", sunrise:"6:36 AM", dhuhrAdhan:"12:11 PM", asrAdhan:"3:09 PM", maghribAdhan:"5:40 PM", ishaAdhan:"6:59 PM", fajrIqamah:"5:45 AM", dhuhrIqamah:"1:15 PM",  asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-23": { fajrAdhan:"5:05 AM", sunrise:"6:35 AM", dhuhrAdhan:"12:11 PM", asrAdhan:"3:10 PM", maghribAdhan:"5:41 PM", ishaAdhan:"7:00 PM", fajrIqamah:"5:35 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-24": { fajrAdhan:"5:03 AM", sunrise:"6:34 AM", dhuhrAdhan:"12:11 PM", asrAdhan:"3:11 PM", maghribAdhan:"5:42 PM", ishaAdhan:"7:01 PM", fajrIqamah:"5:35 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-25": { fajrAdhan:"5:02 AM", sunrise:"6:32 AM", dhuhrAdhan:"12:11 PM", asrAdhan:"3:11 PM", maghribAdhan:"5:43 PM", ishaAdhan:"7:02 PM", fajrIqamah:"5:35 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-26": { fajrAdhan:"5:00 AM", sunrise:"6:31 AM", dhuhrAdhan:"12:10 PM", asrAdhan:"3:12 PM", maghribAdhan:"5:44 PM", ishaAdhan:"7:02 PM", fajrIqamah:"5:35 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-27": { fajrAdhan:"4:59 AM", sunrise:"6:29 AM", dhuhrAdhan:"12:10 PM", asrAdhan:"3:13 PM", maghribAdhan:"5:46 PM", ishaAdhan:"7:03 PM", fajrIqamah:"5:35 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-02-28": { fajrAdhan:"4:58 AM", sunrise:"6:28 AM", dhuhrAdhan:"12:10 PM", asrAdhan:"3:14 PM", maghribAdhan:"5:47 PM", ishaAdhan:"7:04 PM", fajrIqamah:"5:35 AM", dhuhrIqamah:"1:15 PM",  asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },

  // ── March 2026 ────────────────────────────────────────────────────────────
  // Iqamah effective from MAR 01: Fajr 5:35AM, Dhuhr 1:15PM, Asr 3:40PM, Isha 8:00PM
  "2026-03-01": { fajrAdhan:"4:56 AM", sunrise:"6:26 AM", dhuhrAdhan:"12:10 PM", asrAdhan:"3:14 PM", maghribAdhan:"5:48 PM", ishaAdhan:"7:05 PM", fajrIqamah:"5:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"3:40 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },

  // Iqamah effective from MAR 02: Fajr 5:25AM, Dhuhr 12:15PM, Asr 3:45PM, Isha 8:00PM
  "2026-03-02": { fajrAdhan:"4:55 AM", sunrise:"6:25 AM", dhuhrAdhan:"12:10 PM", asrAdhan:"3:15 PM", maghribAdhan:"5:49 PM", ishaAdhan:"7:06 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:45 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-03-03": { fajrAdhan:"4:53 AM", sunrise:"6:23 AM", dhuhrAdhan:"12:10 PM", asrAdhan:"3:16 PM", maghribAdhan:"5:50 PM", ishaAdhan:"7:07 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:45 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-03-04": { fajrAdhan:"4:52 AM", sunrise:"6:22 AM", dhuhrAdhan:"12:09 PM", asrAdhan:"3:17 PM", maghribAdhan:"5:51 PM", ishaAdhan:"7:08 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:45 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-03-05": { fajrAdhan:"4:50 AM", sunrise:"6:20 AM", dhuhrAdhan:"12:09 PM", asrAdhan:"3:17 PM", maghribAdhan:"5:52 PM", ishaAdhan:"7:09 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:45 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },
  "2026-03-06": { fajrAdhan:"4:49 AM", sunrise:"6:19 AM", dhuhrAdhan:"12:09 PM", asrAdhan:"3:18 PM", maghribAdhan:"5:53 PM", ishaAdhan:"7:10 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:45 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM", jumuahTimes:["12:15 PM", "1:15 PM"] },
  "2026-03-07": { fajrAdhan:"4:47 AM", sunrise:"6:17 AM", dhuhrAdhan:"12:09 PM", asrAdhan:"3:19 PM", maghribAdhan:"5:54 PM", ishaAdhan:"7:11 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"12:15 PM", asrIqamah:"3:45 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },

  // Iqamah effective from MAR 08: Fajr 6:15AM, Dhuhr 1:15PM, Asr 4:50PM, Isha 8:00PM (DST starts)
  "2026-03-08": { fajrAdhan:"5:45 AM", sunrise:"7:15 AM", dhuhrAdhan:"1:09 PM",  asrAdhan:"4:19 PM", maghribAdhan:"6:55 PM", ishaAdhan:"8:12 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"8:00 PM", tarawih:"8:00 PM" },

  // Iqamah effective from MAR 09: Fajr 6:15AM, Dhuhr 1:15PM, Asr 4:50PM, Isha 9:00PM
  "2026-03-09": { fajrAdhan:"5:44 AM", sunrise:"7:14 AM", dhuhrAdhan:"1:08 PM",  asrAdhan:"4:20 PM", maghribAdhan:"6:56 PM", ishaAdhan:"8:12 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },
  "2026-03-10": { fajrAdhan:"5:42 AM", sunrise:"7:12 AM", dhuhrAdhan:"1:08 PM",  asrAdhan:"4:20 PM", maghribAdhan:"6:58 PM", ishaAdhan:"8:13 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },
  "2026-03-11": { fajrAdhan:"5:41 AM", sunrise:"7:11 AM", dhuhrAdhan:"1:08 PM",  asrAdhan:"4:21 PM", maghribAdhan:"6:59 PM", ishaAdhan:"8:14 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },
  "2026-03-12": { fajrAdhan:"5:39 AM", sunrise:"7:09 AM", dhuhrAdhan:"1:08 PM",  asrAdhan:"4:22 PM", maghribAdhan:"7:00 PM", ishaAdhan:"8:15 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },
  "2026-03-13": { fajrAdhan:"5:38 AM", sunrise:"7:07 AM", dhuhrAdhan:"1:07 PM",  asrAdhan:"4:22 PM", maghribAdhan:"7:01 PM", ishaAdhan:"8:16 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-03-14": { fajrAdhan:"5:36 AM", sunrise:"7:06 AM", dhuhrAdhan:"1:07 PM",  asrAdhan:"4:23 PM", maghribAdhan:"7:02 PM", ishaAdhan:"8:17 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },
  "2026-03-15": { fajrAdhan:"5:35 AM", sunrise:"7:04 AM", dhuhrAdhan:"1:07 PM",  asrAdhan:"4:23 PM", maghribAdhan:"7:03 PM", ishaAdhan:"8:18 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:50 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },

  // Iqamah effective from MAR 16: Fajr 6:05AM, Dhuhr 1:15PM, Asr 4:55PM, Isha 9:00PM
  "2026-03-16": { fajrAdhan:"5:33 AM", sunrise:"7:03 AM", dhuhrAdhan:"1:06 PM",  asrAdhan:"4:24 PM", maghribAdhan:"7:04 PM", ishaAdhan:"8:19 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:55 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },
  "2026-03-17": { fajrAdhan:"5:31 AM", sunrise:"7:01 AM", dhuhrAdhan:"1:06 PM",  asrAdhan:"4:24 PM", maghribAdhan:"7:05 PM", ishaAdhan:"8:19 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:55 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },

  // Iqamah effective from MAR 18: Fajr 6:00AM, Dhuhr 1:15PM, Asr 4:55PM, Isha 9:00PM
  "2026-03-18": { fajrAdhan:"5:30 AM", sunrise:"6:59 AM", dhuhrAdhan:"1:06 PM",  asrAdhan:"4:25 PM", maghribAdhan:"7:06 PM", ishaAdhan:"8:20 PM", fajrIqamah:"6:00 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"4:55 PM", ishaIqamah:"9:00 PM", tarawih:"9:00 PM" },

  // Iqamah effective from MAR 19: Fajr 6:00AM, Dhuhr 1:15PM, Asr 5:00PM, Isha 8:30PM (last day of Ramadan)
  "2026-03-19": { fajrAdhan:"5:28 AM", sunrise:"6:58 AM", dhuhrAdhan:"1:06 PM",  asrAdhan:"4:26 PM", maghribAdhan:"7:07 PM", ishaAdhan:"8:21 PM", fajrIqamah:"6:00 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:30 PM", tarawih:"8:30 PM" },

  // ── Shawwal begins Mar 20 (Eid al-Fitr) ──────────────────────────────────
  // Iqamah effective from MAR 20: Fajr 6:15AM, Dhuhr 1:15PM, Asr 5:00PM, Isha 8:30PM
  "2026-03-20": { fajrAdhan:"5:27 AM", sunrise:"6:56 AM", dhuhrAdhan:"1:05 PM",  asrAdhan:"4:26 PM", maghribAdhan:"7:08 PM", ishaAdhan:"8:22 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:30 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-03-21": { fajrAdhan:"5:25 AM", sunrise:"6:55 AM", dhuhrAdhan:"1:05 PM",  asrAdhan:"4:27 PM", maghribAdhan:"7:09 PM", ishaAdhan:"8:23 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:30 PM" },
  "2026-03-22": { fajrAdhan:"5:24 AM", sunrise:"6:53 AM", dhuhrAdhan:"1:05 PM",  asrAdhan:"4:27 PM", maghribAdhan:"7:10 PM", ishaAdhan:"8:24 PM", fajrIqamah:"6:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:30 PM" },

  // Iqamah effective from MAR 23: Fajr 6:05AM, Dhuhr 1:15PM, Asr 5:00PM, Isha 8:35PM
  "2026-03-23": { fajrAdhan:"5:22 AM", sunrise:"6:51 AM", dhuhrAdhan:"1:04 PM",  asrAdhan:"4:27 PM", maghribAdhan:"7:11 PM", ishaAdhan:"8:24 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:35 PM" },
  "2026-03-24": { fajrAdhan:"5:20 AM", sunrise:"6:50 AM", dhuhrAdhan:"1:04 PM",  asrAdhan:"4:28 PM", maghribAdhan:"7:12 PM", ishaAdhan:"8:25 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:35 PM" },
  "2026-03-25": { fajrAdhan:"5:18 AM", sunrise:"6:48 AM", dhuhrAdhan:"1:04 PM",  asrAdhan:"4:28 PM", maghribAdhan:"7:13 PM", ishaAdhan:"8:26 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:35 PM" },
  "2026-03-26": { fajrAdhan:"5:16 AM", sunrise:"6:46 AM", dhuhrAdhan:"1:03 PM",  asrAdhan:"4:29 PM", maghribAdhan:"7:14 PM", ishaAdhan:"8:27 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:35 PM" },
  "2026-03-27": { fajrAdhan:"5:14 AM", sunrise:"6:45 AM", dhuhrAdhan:"1:03 PM",  asrAdhan:"4:29 PM", maghribAdhan:"7:15 PM", ishaAdhan:"8:28 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:35 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-03-28": { fajrAdhan:"5:13 AM", sunrise:"6:43 AM", dhuhrAdhan:"1:03 PM",  asrAdhan:"4:30 PM", maghribAdhan:"7:16 PM", ishaAdhan:"8:29 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:35 PM" },
  "2026-03-29": { fajrAdhan:"5:11 AM", sunrise:"6:41 AM", dhuhrAdhan:"1:03 PM",  asrAdhan:"4:30 PM", maghribAdhan:"7:17 PM", ishaAdhan:"8:30 PM", fajrIqamah:"6:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:00 PM", ishaIqamah:"8:35 PM" },

  // Iqamah effective from MAR 30: Fajr 5:50AM, Dhuhr 1:15PM, Asr 5:05PM, Isha 8:40PM
  "2026-03-30": { fajrAdhan:"5:09 AM", sunrise:"6:40 AM", dhuhrAdhan:"1:02 PM",  asrAdhan:"4:31 PM", maghribAdhan:"7:18 PM", ishaAdhan:"8:30 PM", fajrIqamah:"5:50 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:40 PM" },
  "2026-03-31": { fajrAdhan:"5:07 AM", sunrise:"6:38 AM", dhuhrAdhan:"1:02 PM",  asrAdhan:"4:31 PM", maghribAdhan:"7:19 PM", ishaAdhan:"8:31 PM", fajrIqamah:"5:50 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:40 PM" },

  // ── April 2026 (Shawwal & Dhul-Qadah) ────────────────────────────────────
  // Iqamah effective APR 01: Fajr 5:50AM, Dhuhr 1:15PM, Asr 5:05PM, Isha 8:40PM
  "2026-04-01": { fajrAdhan:"5:05 AM", sunrise:"6:37 AM", dhuhrAdhan:"1:02 PM",  asrAdhan:"4:31 PM", maghribAdhan:"7:20 PM", ishaAdhan:"8:32 PM", fajrIqamah:"5:50 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:40 PM" },
  "2026-04-02": { fajrAdhan:"5:04 AM", sunrise:"6:35 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:32 PM", maghribAdhan:"7:21 PM", ishaAdhan:"8:33 PM", fajrIqamah:"5:50 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:40 PM" },
  "2026-04-03": { fajrAdhan:"5:02 AM", sunrise:"6:33 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:32 PM", maghribAdhan:"7:22 PM", ishaAdhan:"8:34 PM", fajrIqamah:"5:50 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:40 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-04-04": { fajrAdhan:"5:00 AM", sunrise:"6:32 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:32 PM", maghribAdhan:"7:23 PM", ishaAdhan:"8:35 PM", fajrIqamah:"5:50 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:40 PM" },
  "2026-04-05": { fajrAdhan:"4:58 AM", sunrise:"6:30 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:33 PM", maghribAdhan:"7:24 PM", ishaAdhan:"8:35 PM", fajrIqamah:"5:50 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:40 PM" },
  // Iqamah effective APR 06: Fajr 5:40AM, Dhuhr 1:15PM, Asr 5:05PM, Isha 8:45PM
  "2026-04-06": { fajrAdhan:"4:56 AM", sunrise:"6:29 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:33 PM", maghribAdhan:"7:25 PM", ishaAdhan:"8:36 PM", fajrIqamah:"5:40 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:45 PM" },
  "2026-04-07": { fajrAdhan:"4:55 AM", sunrise:"6:27 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:34 PM", maghribAdhan:"7:26 PM", ishaAdhan:"8:37 PM", fajrIqamah:"5:40 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:45 PM" },
  "2026-04-08": { fajrAdhan:"4:53 AM", sunrise:"6:25 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:34 PM", maghribAdhan:"7:27 PM", ishaAdhan:"8:38 PM", fajrIqamah:"5:40 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:45 PM" },
  "2026-04-09": { fajrAdhan:"4:51 AM", sunrise:"6:24 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:34 PM", maghribAdhan:"7:29 PM", ishaAdhan:"8:39 PM", fajrIqamah:"5:40 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:45 PM" },
  "2026-04-10": { fajrAdhan:"4:49 AM", sunrise:"6:22 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:35 PM", maghribAdhan:"7:30 PM", ishaAdhan:"8:40 PM", fajrIqamah:"5:40 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:45 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-04-11": { fajrAdhan:"4:47 AM", sunrise:"6:21 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:35 PM", maghribAdhan:"7:31 PM", ishaAdhan:"8:40 PM", fajrIqamah:"5:40 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:45 PM" },
  "2026-04-12": { fajrAdhan:"4:46 AM", sunrise:"6:19 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:35 PM", maghribAdhan:"7:32 PM", ishaAdhan:"8:41 PM", fajrIqamah:"5:40 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:05 PM", ishaIqamah:"8:45 PM" },
  // Iqamah effective APR 13: Fajr 5:25AM, Dhuhr 1:15PM, Asr 5:10PM, Isha 8:50PM
  "2026-04-13": { fajrAdhan:"4:44 AM", sunrise:"6:18 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:36 PM", maghribAdhan:"7:33 PM", ishaAdhan:"8:42 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"8:50 PM" },
  "2026-04-14": { fajrAdhan:"4:42 AM", sunrise:"6:16 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:36 PM", maghribAdhan:"7:34 PM", ishaAdhan:"8:43 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"8:50 PM" },
  "2026-04-15": { fajrAdhan:"4:40 AM", sunrise:"6:15 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:36 PM", maghribAdhan:"7:35 PM", ishaAdhan:"8:44 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"8:50 PM" },
  "2026-04-16": { fajrAdhan:"4:39 AM", sunrise:"6:13 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:36 PM", maghribAdhan:"7:36 PM", ishaAdhan:"8:45 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"8:50 PM" },
  "2026-04-17": { fajrAdhan:"4:37 AM", sunrise:"6:12 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:37 PM", maghribAdhan:"7:37 PM", ishaAdhan:"8:46 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"8:50 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-04-18": { fajrAdhan:"4:35 AM", sunrise:"6:10 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:37 PM", maghribAdhan:"7:38 PM", ishaAdhan:"8:46 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"8:50 PM" },
  "2026-04-19": { fajrAdhan:"4:34 AM", sunrise:"6:09 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:37 PM", maghribAdhan:"7:39 PM", ishaAdhan:"8:47 PM", fajrIqamah:"5:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"8:50 PM" },
  // Iqamah effective APR 20: Fajr 5:15AM, Dhuhr 1:15PM, Asr 5:10PM, Isha 9:00PM
  "2026-04-20": { fajrAdhan:"4:32 AM", sunrise:"6:07 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:38 PM", maghribAdhan:"7:40 PM", ishaAdhan:"8:48 PM", fajrIqamah:"5:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:00 PM" },
  "2026-04-21": { fajrAdhan:"4:30 AM", sunrise:"6:06 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:38 PM", maghribAdhan:"7:41 PM", ishaAdhan:"8:49 PM", fajrIqamah:"5:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:00 PM" },
  "2026-04-22": { fajrAdhan:"4:29 AM", sunrise:"6:05 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:38 PM", maghribAdhan:"7:42 PM", ishaAdhan:"8:50 PM", fajrIqamah:"5:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:00 PM" },
  "2026-04-23": { fajrAdhan:"4:27 AM", sunrise:"6:03 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:38 PM", maghribAdhan:"7:43 PM", ishaAdhan:"8:51 PM", fajrIqamah:"5:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:00 PM" },
  "2026-04-24": { fajrAdhan:"4:26 AM", sunrise:"6:02 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:39 PM", maghribAdhan:"7:44 PM", ishaAdhan:"8:51 PM", fajrIqamah:"5:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:00 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-04-25": { fajrAdhan:"4:24 AM", sunrise:"6:00 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:39 PM", maghribAdhan:"7:45 PM", ishaAdhan:"8:52 PM", fajrIqamah:"5:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:00 PM" },
  "2026-04-26": { fajrAdhan:"4:22 AM", sunrise:"5:59 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:39 PM", maghribAdhan:"7:46 PM", ishaAdhan:"8:53 PM", fajrIqamah:"5:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:00 PM" },
  // Iqamah effective APR 27: Fajr 5:05AM, Dhuhr 1:15PM, Asr 5:10PM, Isha 9:05PM
  "2026-04-27": { fajrAdhan:"4:21 AM", sunrise:"5:58 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:40 PM", maghribAdhan:"7:47 PM", ishaAdhan:"8:54 PM", fajrIqamah:"5:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:05 PM" },
  "2026-04-28": { fajrAdhan:"4:19 AM", sunrise:"5:56 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:40 PM", maghribAdhan:"7:48 PM", ishaAdhan:"8:55 PM", fajrIqamah:"5:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:05 PM" },
  "2026-04-29": { fajrAdhan:"4:18 AM", sunrise:"5:55 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:40 PM", maghribAdhan:"7:49 PM", ishaAdhan:"8:56 PM", fajrIqamah:"5:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:05 PM" },
  "2026-04-30": { fajrAdhan:"4:16 AM", sunrise:"5:54 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:40 PM", maghribAdhan:"7:50 PM", ishaAdhan:"8:56 PM", fajrIqamah:"5:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:05 PM" },

  // ── May 2026 (Dhul-Qadah & Dhul-Hijjah) ──────────────────────────────────
  // Iqamah effective MAY 01: Fajr 5:05AM, Dhuhr 1:15PM, Asr 5:10PM, Isha 9:05PM
  "2026-05-01": { fajrAdhan:"4:15 AM", sunrise:"5:53 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:41 PM", maghribAdhan:"7:51 PM", ishaAdhan:"8:57 PM", fajrIqamah:"5:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:05 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-05-02": { fajrAdhan:"4:13 AM", sunrise:"5:51 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:41 PM", maghribAdhan:"7:52 PM", ishaAdhan:"8:58 PM", fajrIqamah:"5:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:05 PM" },
  "2026-05-03": { fajrAdhan:"4:12 AM", sunrise:"5:50 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:41 PM", maghribAdhan:"7:53 PM", ishaAdhan:"8:59 PM", fajrIqamah:"5:05 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:10 PM", ishaIqamah:"9:05 PM" },
  // Iqamah effective MAY 04: Fajr 4:55AM, Dhuhr 1:15PM, Asr 5:15PM, Isha 9:10PM
  "2026-05-04": { fajrAdhan:"4:11 AM", sunrise:"5:49 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:41 PM", maghribAdhan:"7:54 PM", ishaAdhan:"9:00 PM", fajrIqamah:"4:55 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:10 PM" },
  "2026-05-05": { fajrAdhan:"4:09 AM", sunrise:"5:48 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:42 PM", maghribAdhan:"7:55 PM", ishaAdhan:"9:01 PM", fajrIqamah:"4:55 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:10 PM" },
  "2026-05-06": { fajrAdhan:"4:08 AM", sunrise:"5:47 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:42 PM", maghribAdhan:"7:56 PM", ishaAdhan:"9:01 PM", fajrIqamah:"4:55 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:10 PM" },
  "2026-05-07": { fajrAdhan:"4:07 AM", sunrise:"5:45 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:42 PM", maghribAdhan:"7:57 PM", ishaAdhan:"9:02 PM", fajrIqamah:"4:55 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:10 PM" },
  "2026-05-08": { fajrAdhan:"4:05 AM", sunrise:"5:44 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:42 PM", maghribAdhan:"7:58 PM", ishaAdhan:"9:03 PM", fajrIqamah:"4:55 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:10 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-05-09": { fajrAdhan:"4:04 AM", sunrise:"5:43 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:43 PM", maghribAdhan:"7:59 PM", ishaAdhan:"9:05 PM", fajrIqamah:"4:55 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:10 PM" },
  "2026-05-10": { fajrAdhan:"4:03 AM", sunrise:"5:42 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:43 PM", maghribAdhan:"8:00 PM", ishaAdhan:"9:06 PM", fajrIqamah:"4:55 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:10 PM" },
  // Iqamah effective MAY 11: Fajr 4:45AM, Dhuhr 1:15PM, Asr 5:15PM, Isha 9:20PM
  "2026-05-11": { fajrAdhan:"4:01 AM", sunrise:"5:41 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:43 PM", maghribAdhan:"8:01 PM", ishaAdhan:"9:07 PM", fajrIqamah:"4:45 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:20 PM" },
  "2026-05-12": { fajrAdhan:"4:00 AM", sunrise:"5:40 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:43 PM", maghribAdhan:"8:02 PM", ishaAdhan:"9:08 PM", fajrIqamah:"4:45 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:20 PM" },
  "2026-05-13": { fajrAdhan:"3:59 AM", sunrise:"5:39 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:44 PM", maghribAdhan:"8:03 PM", ishaAdhan:"9:10 PM", fajrIqamah:"4:45 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:20 PM" },
  "2026-05-14": { fajrAdhan:"3:58 AM", sunrise:"5:38 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:44 PM", maghribAdhan:"8:04 PM", ishaAdhan:"9:11 PM", fajrIqamah:"4:45 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:20 PM" },
  "2026-05-15": { fajrAdhan:"3:56 AM", sunrise:"5:37 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:44 PM", maghribAdhan:"8:05 PM", ishaAdhan:"9:12 PM", fajrIqamah:"4:45 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:20 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-05-16": { fajrAdhan:"3:55 AM", sunrise:"5:36 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:44 PM", maghribAdhan:"8:06 PM", ishaAdhan:"9:13 PM", fajrIqamah:"4:45 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:20 PM" },
  "2026-05-17": { fajrAdhan:"3:54 AM", sunrise:"5:35 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:45 PM", maghribAdhan:"8:07 PM", ishaAdhan:"9:14 PM", fajrIqamah:"4:45 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:20 PM" },
  // Iqamah effective MAY 18: Fajr 4:35AM, Dhuhr 1:15PM, Asr 5:15PM, Isha 9:25PM
  "2026-05-18": { fajrAdhan:"3:53 AM", sunrise:"5:35 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:45 PM", maghribAdhan:"8:08 PM", ishaAdhan:"9:15 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-19": { fajrAdhan:"3:52 AM", sunrise:"5:34 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:45 PM", maghribAdhan:"8:08 PM", ishaAdhan:"9:17 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-20": { fajrAdhan:"3:51 AM", sunrise:"5:33 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:45 PM", maghribAdhan:"8:09 PM", ishaAdhan:"9:18 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-21": { fajrAdhan:"3:50 AM", sunrise:"5:32 AM", dhuhrAdhan:"12:54 PM", asrAdhan:"4:46 PM", maghribAdhan:"8:10 PM", ishaAdhan:"9:19 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-22": { fajrAdhan:"3:49 AM", sunrise:"5:31 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:46 PM", maghribAdhan:"8:11 PM", ishaAdhan:"9:20 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-05-23": { fajrAdhan:"3:48 AM", sunrise:"5:31 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:46 PM", maghribAdhan:"8:12 PM", ishaAdhan:"9:21 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-24": { fajrAdhan:"3:47 AM", sunrise:"5:30 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:47 PM", maghribAdhan:"8:13 PM", ishaAdhan:"9:22 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-25": { fajrAdhan:"3:46 AM", sunrise:"5:29 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:47 PM", maghribAdhan:"8:14 PM", ishaAdhan:"9:23 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-26": { fajrAdhan:"3:45 AM", sunrise:"5:29 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:47 PM", maghribAdhan:"8:14 PM", ishaAdhan:"9:24 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-27": { fajrAdhan:"3:44 AM", sunrise:"5:28 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:47 PM", maghribAdhan:"8:15 PM", ishaAdhan:"9:25 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-28": { fajrAdhan:"3:44 AM", sunrise:"5:28 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:48 PM", maghribAdhan:"8:16 PM", ishaAdhan:"9:26 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-29": { fajrAdhan:"3:43 AM", sunrise:"5:27 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:48 PM", maghribAdhan:"8:17 PM", ishaAdhan:"9:28 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-05-30": { fajrAdhan:"3:42 AM", sunrise:"5:27 AM", dhuhrAdhan:"12:55 PM", asrAdhan:"4:48 PM", maghribAdhan:"8:18 PM", ishaAdhan:"9:29 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },
  "2026-05-31": { fajrAdhan:"3:41 AM", sunrise:"5:26 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:48 PM", maghribAdhan:"8:18 PM", ishaAdhan:"9:30 PM", fajrIqamah:"4:35 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:15 PM", ishaIqamah:"9:25 PM" },

  // ── June 2026 (Dhul-Hijjah & Muharram) ───────────────────────────────────
  // Iqamah effective JUN 01: Fajr 4:25AM, Dhuhr 1:15PM, Asr 5:20PM, Isha 9:40PM
  "2026-06-01": { fajrAdhan:"3:41 AM", sunrise:"5:26 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:49 PM", maghribAdhan:"8:19 PM", ishaAdhan:"9:30 PM", fajrIqamah:"4:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:20 PM", ishaIqamah:"9:40 PM" },
  "2026-06-02": { fajrAdhan:"3:40 AM", sunrise:"5:25 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:49 PM", maghribAdhan:"8:20 PM", ishaAdhan:"9:31 PM", fajrIqamah:"4:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:20 PM", ishaIqamah:"9:40 PM" },
  "2026-06-03": { fajrAdhan:"3:40 AM", sunrise:"5:25 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:49 PM", maghribAdhan:"8:20 PM", ishaAdhan:"9:32 PM", fajrIqamah:"4:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:20 PM", ishaIqamah:"9:40 PM" },
  "2026-06-04": { fajrAdhan:"3:39 AM", sunrise:"5:25 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:49 PM", maghribAdhan:"8:21 PM", ishaAdhan:"9:33 PM", fajrIqamah:"4:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:20 PM", ishaIqamah:"9:40 PM" },
  "2026-06-05": { fajrAdhan:"3:38 AM", sunrise:"5:24 AM", dhuhrAdhan:"12:56 PM", asrAdhan:"4:50 PM", maghribAdhan:"8:22 PM", ishaAdhan:"9:34 PM", fajrIqamah:"4:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:20 PM", ishaIqamah:"9:40 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-06-06": { fajrAdhan:"3:38 AM", sunrise:"5:24 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:50 PM", maghribAdhan:"8:22 PM", ishaAdhan:"9:35 PM", fajrIqamah:"4:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:20 PM", ishaIqamah:"9:40 PM" },
  "2026-06-07": { fajrAdhan:"3:37 AM", sunrise:"5:24 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:50 PM", maghribAdhan:"8:23 PM", ishaAdhan:"9:36 PM", fajrIqamah:"4:25 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:20 PM", ishaIqamah:"9:40 PM" },
  // Iqamah effective JUN 08: Fajr 4:20AM, Dhuhr 1:15PM, Asr 5:25PM, Isha 9:45PM
  "2026-06-08": { fajrAdhan:"3:37 AM", sunrise:"5:24 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:51 PM", maghribAdhan:"8:24 PM", ishaAdhan:"9:37 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:45 PM" },
  "2026-06-09": { fajrAdhan:"3:37 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:51 PM", maghribAdhan:"8:24 PM", ishaAdhan:"9:37 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:45 PM" },
  "2026-06-10": { fajrAdhan:"3:36 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:57 PM", asrAdhan:"4:51 PM", maghribAdhan:"8:25 PM", ishaAdhan:"9:38 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:45 PM" },
  "2026-06-11": { fajrAdhan:"3:36 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:51 PM", maghribAdhan:"8:25 PM", ishaAdhan:"9:39 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:45 PM" },
  "2026-06-12": { fajrAdhan:"3:35 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:52 PM", maghribAdhan:"8:26 PM", ishaAdhan:"9:40 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:45 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-06-13": { fajrAdhan:"3:35 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:52 PM", maghribAdhan:"8:26 PM", ishaAdhan:"9:40 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:45 PM" },
  "2026-06-14": { fajrAdhan:"3:35 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:52 PM", maghribAdhan:"8:26 PM", ishaAdhan:"9:41 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:45 PM" },
  // Iqamah effective JUN 15: Fajr 4:15AM, Dhuhr 1:15PM, Asr 5:25PM, Isha 9:50PM
  "2026-06-15": { fajrAdhan:"3:35 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:58 PM", asrAdhan:"4:52 PM", maghribAdhan:"8:27 PM", ishaAdhan:"9:42 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-16": { fajrAdhan:"3:35 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:53 PM", maghribAdhan:"8:27 PM", ishaAdhan:"9:42 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-17": { fajrAdhan:"3:34 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:53 PM", maghribAdhan:"8:28 PM", ishaAdhan:"9:43 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-18": { fajrAdhan:"3:34 AM", sunrise:"5:23 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:53 PM", maghribAdhan:"8:28 PM", ishaAdhan:"9:43 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-19": { fajrAdhan:"3:34 AM", sunrise:"5:24 AM", dhuhrAdhan:"12:59 PM", asrAdhan:"4:53 PM", maghribAdhan:"8:28 PM", ishaAdhan:"9:44 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-06-20": { fajrAdhan:"3:34 AM", sunrise:"5:24 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:54 PM", maghribAdhan:"8:28 PM", ishaAdhan:"9:44 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-21": { fajrAdhan:"3:34 AM", sunrise:"5:24 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:54 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:45 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-22": { fajrAdhan:"3:34 AM", sunrise:"5:24 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:54 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:45 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-23": { fajrAdhan:"3:35 AM", sunrise:"5:24 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:54 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:45 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-24": { fajrAdhan:"3:35 AM", sunrise:"5:25 AM", dhuhrAdhan:"1:00 PM",  asrAdhan:"4:54 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:45 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-25": { fajrAdhan:"3:36 AM", sunrise:"5:25 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:55 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:45 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-26": { fajrAdhan:"3:36 AM", sunrise:"5:25 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:55 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:45 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM", jumuahTimes:["1:15 PM", "2:15 PM"] },
  "2026-06-27": { fajrAdhan:"3:37 AM", sunrise:"5:26 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:55 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:44 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-28": { fajrAdhan:"3:38 AM", sunrise:"5:26 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:55 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:44 PM", fajrIqamah:"4:15 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  // Iqamah effective JUN 29: Fajr 4:20AM, Dhuhr 1:15PM, Asr 5:25PM, Isha 9:50PM
  "2026-06-29": { fajrAdhan:"3:38 AM", sunrise:"5:27 AM", dhuhrAdhan:"1:01 PM",  asrAdhan:"4:55 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:44 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
  "2026-06-30": { fajrAdhan:"3:39 AM", sunrise:"5:27 AM", dhuhrAdhan:"1:02 PM",  asrAdhan:"4:55 PM", maghribAdhan:"8:29 PM", ishaAdhan:"9:44 PM", fajrIqamah:"4:20 AM", dhuhrIqamah:"1:15 PM", asrIqamah:"5:25 PM", ishaIqamah:"9:50 PM" },
};
