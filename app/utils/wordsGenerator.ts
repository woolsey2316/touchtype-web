import { numbersData } from "../data/numbers";
import { punctuationData } from "../data/punctuation";
import { ENGLISH_WORDS } from "../data/english-words";
import { REACT_WORDS } from "../data/react-words";
import { VIM_WORDS } from "../data/vim-words";
import { ANGULAR_WORDS } from "../data/angular-words";
import { JAVASCRIPT_WORDS } from "../data/javaScript-words";
import { C_WORDS } from "../data/c-words";
import { CPLUSPLUS_WORDS } from "../data/cplusplus-words";
import { JAVA_WORDS } from "../data/java-words";
import { Language } from "../types/words.type";
export const WordsGenerator = ({
  count,
  numbers,
  punctuation,
  language,
  programmingLanguage,
}: {
  count: number;
  numbers?: boolean;
  punctuation?: boolean;
  language?: Language;
  programmingLanguage?: boolean;
}) => {
  let wordsToType = "";
  let words = ENGLISH_WORDS;
  switch (language) {
    case Language.ENGLISH: {
      words = ENGLISH_WORDS;
      break;
    }
    case Language.REACT: {
      words = REACT_WORDS;
      break;
    }
    case Language.VIM: {
      words = VIM_WORDS;
      break;
    }
    case Language.ANGULAR: {
      words = ANGULAR_WORDS;
      break;
    }
    case Language.JAVASCRIPT: {
      words = JAVASCRIPT_WORDS;
      break;
    }
    case Language.C: {
      words = C_WORDS;
      break;
    }
    case Language.CPLUSPLUS: {
      words = CPLUSPLUS_WORDS;
      break;
    }
    case Language.JAVA: {
      words = JAVA_WORDS;
      break;
    }
  }
  if (programmingLanguage) {
    const wordsIndex = Math.round(Math.random() * words.length);
    wordsToType = words[wordsIndex];
    return wordsToType;
  }
  for (let i = 0; i < count; i++) {
    const wordIndex = Math.round(Math.random() * words.length);
    wordsToType = wordsToType + words[wordIndex];
    if (numbers && Math.random() > 0.5) {
      wordsToType =
        wordsToType +
        numbersData[Math.floor(Math.random() * numbersData.length)];
    }
    if (punctuation && Math.random() > 0.5) {
      wordsToType =
        wordsToType +
        punctuationData[Math.floor(Math.random() * punctuationData.length)];
    }
    wordsToType = `${wordsToType} `;
  }
  return wordsToType.trim();
};
