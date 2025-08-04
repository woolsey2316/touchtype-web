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
    const width = 25;
    const result = validCursorIndices(words, width);
    let previousRow = -1;
    let prevCol = -1;
    for (const [row, col] of result) {
      expect(row !== previousRow || col !== prevCol).toBe(true);
      previousRow = row;
      prevCol = col;
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
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
  });

  it("should delete cursor for space at end of line", () => {
    const words = "ab cd ";
    const width = 42;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ]);
  });

  it("should skip over tabs", () => {
    const words = "\tp";
    const width = 500;
    const result = validCursorIndices(words, width);

    expect(result).toEqual([
      [0, 2],
      [0, 3],
    ]);
  });

  it("should skip over tabs (multiline)", () => {
    const words = "<div\n\t\tp";
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
