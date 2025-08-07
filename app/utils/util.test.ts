import { validCursorIndices } from "./util";
import { describe, it, expect } from "vitest";

describe("validCursorIndices", () => {
  it("'hello' on first line, 'world' on second line", () => {
    const words = "Hello world";
    const width = 100;
    const expectedIndices = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ];

    const result = validCursorIndices(words, width);
    expect(result).toEqual(expectedIndices);
  });

  it("should not contain duplicate, consecutive indices", () => {
    const words = "This is a very long word that should wrap";
    const width = 42;
    const result = validCursorIndices(words, width);
    let previousRow = -1;
    let prevCol = -1;
    for (const [row, col] of result) {
      expect(row !== previousRow || col !== prevCol).toBe(true);
      expect(col > prevCol || row > previousRow);
      previousRow = row;
      prevCol = col;
    }
  });

  it("each cursor index should be non-decreasing", () => {
    const words = "mention ghost contact funeral more poll regular";
    const width = 522;
    const result = validCursorIndices(words, width);
    let previousRow = -1;
    let prevCol = -1;
    for (const [row, col] of result) {
      expect(row !== previousRow || col !== prevCol).toBe(true);
      expect(col > prevCol || row > previousRow);
      previousRow = row;
      prevCol = col;
    }
  });

  it("test cursor", () => {
    const words = "emplyoee movie operator muscle cup group";
    const width = 532;
    const result = validCursorIndices(words, width);
    for (const [, col] of result) {
      expect(col * 14).toBeLessThanOrEqual(width);
    }
  });
  it("should handle empty strings", () => {
    const words = "";
    const width = 100;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([]);
  });

  it("should recognise space at end of line", () => {
    const words = "ab cd";
    const width = 29;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
  });

  it("ab cd , width = 42", () => {
    const words = "ab cd ";
    const width = 42;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ]);
  });

  it("ab cd , width = 41", () => {
    const words = "ab cd ";
    const width = 41;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
    ]);
  });

  it("→p", () => {
    const words = "→p";
    const width = 500;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 2],
      [0, 3],
    ]);
  });

  it("a↵→b", () => {
    const words = "a↵→b";
    const width = 500;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [1, 2],
      [1, 3],
    ]);
  });

  it("<div↵→→p", () => {
    const words = "<div↵→→p";
    const width = 500;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 4],
      [1, 5],
    ]);
  });

  it("single char", () => {
    const words = "a";
    const width = 500;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 0],
      [0, 1],
    ]);
  });
});
