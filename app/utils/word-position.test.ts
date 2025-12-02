import { getNextCharIndex, getPreviousCharIndex } from "./word-position";
import { expect, describe, it } from "vitest";

describe("getNextCharIndex", () => {
  it("skips tabs after current index", () => {
    expect(
      getNextCharIndex({ charIndex: 0, words: "a→→b", skipOverTabs: true }),
    ).toBe(3);
    expect(
      getNextCharIndex({ charIndex: 1, words: "a→b", skipOverTabs: true }),
    ).toBe(2);
    expect(
      getNextCharIndex({ charIndex: 0, words: "abc", skipOverTabs: true }),
    ).toBe(1);
    expect(
      getNextCharIndex({ charIndex: 1, words: "abc", skipOverTabs: true }),
    ).toBe(2);
  });
});

describe("getPreviousCharIndex", () => {
  it("skips tabs before current index", () => {
    expect(
      getPreviousCharIndex({ charIndex: 3, words: "a→→b", skipOverTabs: true }),
    ).toBe(0);
    expect(
      getPreviousCharIndex({ charIndex: 2, words: "a→b", skipOverTabs: true }),
    ).toBe(0);
    expect(
      getPreviousCharIndex({ charIndex: 2, words: "abc", skipOverTabs: true }),
    ).toBe(1);
    expect(
      getPreviousCharIndex({ charIndex: 1, words: "abc", skipOverTabs: true }),
    ).toBe(0);
  });
});
