import {
  getNextWordLength,
  getNextCharIndex,
  getPreviousCharIndex,
} from "./word-position";
import { expect, describe, it } from "vitest";

describe("getNextWordLength", () => {
  it("returns length of next word times 14.41", () => {
    expect(getNextWordLength(0, "hello world")).toBe(5 * 14.41);
    expect(getNextWordLength(6, "hello world")).toBe(5 * 14.41);
    expect(getNextWordLength(0, "a b c")).toBe(1 * 14.41);
    expect(getNextWordLength(2, "a b c")).toBe(1 * 14.41);
  });
});

describe("getNextCharIndex", () => {
  it("skips tabs after current index", () => {
    expect(getNextCharIndex(0, "a\t\tb")).toBe(3);
    expect(getNextCharIndex(1, "a\tb")).toBe(2);
    expect(getNextCharIndex(0, "abc")).toBe(1);
    expect(getNextCharIndex(1, "abc")).toBe(2);
  });
});

describe("getPreviousCharIndex", () => {
  it("skips tabs before current index", () => {
    expect(getPreviousCharIndex(3, "a\t\tb")).toBe(0);
    expect(getPreviousCharIndex(2, "a\tb")).toBe(0);
    expect(getPreviousCharIndex(2, "abc")).toBe(1);
    expect(getPreviousCharIndex(1, "abc")).toBe(0);
  });
});
