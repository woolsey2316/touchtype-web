export interface LetterSpeed {
  userId: string;

  letter: string;

  // number of samples recorded for this letter
  samples: number;

  // total time in milliseconds (sum of all sample deltaMs)
  totalTimeMs: number;

  // arithmetic average in ms (optional; can be computed from totalTimeMs / samples)
  avgTimeMs?: number | null;

  // exponential moving average in ms (optional; recent-weighted)
  emaMs?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}
