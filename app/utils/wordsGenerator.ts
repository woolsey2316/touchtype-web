import { numbers } from "../data/numbers";
import { punctuation } from "../data/punctuation";
import { words } from "../data/words";

export const WordsGenerator = ({ count }: { count: number }) => {
  let output = "";
  for (let i = 0; i < count; i++) {
    const wordIndex = Math.round(Math.random() * 3000);
    output = output + words[wordIndex];
    if (numbers && Math.random() > 0.5) {
      output = output + numbers[Math.round(Math.random() * numbers.length)];
    }
    if (punctuation && Math.random() > 0.5) {
      output =
        output + punctuation[Math.round(Math.random() * punctuation.length)];
    }
    output = `${output} `;
  }
  return output;
};
