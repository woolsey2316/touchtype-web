/**
 * Lightweight hook to persist a setting in localStorage with a TypeScript-friendly API.
 * - key: localStorage key
 * - initial: default value used when no stored value exists
 *
 * It returns [value, setValue, reset].
 */
import { useCallback, useState } from "react";

export function useLocalSetting<T>(key: string, initial: T) {
  const read = () => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initial;
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  };

  const [value, setValueState] = useState<T>(read);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValueState((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // ignore
        }
        return resolved;
      });
    },
    [key],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setValueState(initial);
  }, [initial, key]);

  return [value, setValue, reset] as const;
}
