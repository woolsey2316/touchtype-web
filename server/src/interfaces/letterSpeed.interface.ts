export interface LetterSpeed {
  // userId may be null for global/anonymous aggregates
  userId: string;

  // single ASCII letter (a-z)
  letter: string;

  // number of samples recorded for this letter
  samples: number;

  // total time in milliseconds (sum of all sample deltaMs)
  totalTimeMs: number;

  // arithmetic average in ms (optional; can be computed from totalTimeMs / samples)
  avgTimeMs?: number | null;

  // exponential moving average in ms (optional; recent-weighted)
  emaMs?: number | null;

  // last time this letter was seen/updated
  lastSeen?: Date | null;

  // mongoose timestamps (optional)
  createdAt?: Date;
  updatedAt?: Date;

  // Legacy fields (optional) kept for backward compatibility while migrating:
  // - totalTime and average were used previously; keep them optional so existing code doesn't break.
  totalTime?: number;
  average?: number;
}
