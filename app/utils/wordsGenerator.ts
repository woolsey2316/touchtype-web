import { numbersData } from "../data/numbers";
import { punctuationData } from "../data/punctuation";
import { words } from "../data/words";
export const WordsGenerator = ({
  count,
  numbers,
  punctuation,
}: {
  count: number;
  numbers?: boolean;
  punctuation?: boolean;
}) => {
  let output = "";
  for (let i = 0; i < count; i++) {
    const wordIndex = Math.round(Math.random() * 3000);
    output = output + words[wordIndex];
    if (numbers && Math.random() > 0.5) {
      output =
        output + numbersData[Math.floor(Math.random() * numbersData.length)];
    }
    if (punctuation && Math.random() > 0.5) {
      output =
        output +
        punctuationData[Math.floor(Math.random() * punctuationData.length)];
    }
    output = `${output} `;
  }
  return output;
};
