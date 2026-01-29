import { numbersData } from "../data/numbers";
import { symbolData } from "../data/punctuation";
import { ENGLISH_WORDS } from "../data/english-words";
import { REACT_WORDS } from "../data/react-words";
import { VIM_WORDS } from "../data/vim-words";
import { ANGULAR_WORDS } from "../data/angular-words";
import { JAVASCRIPT_WORDS } from "../data/javaScript-words";
import { TYPESCRIPT_WORDS } from "../data/typescript-words";
import { C_WORDS } from "../data/c-words";
import { CPLUSPLUS_WORDS } from "../data/cplusplus-words";
import { JAVA_WORDS } from "../data/java-words";
import { PYTHON_WORDS } from "../data/python-words";
import { RUBY_WORDS } from "../data/ruby-words";
import { GO_WORDS } from "../data/go-words";
import { RUST_WORDS } from "../data/rust-words";
import { SWIFT_WORDS } from "../data/swift-words";
import { HASKELL_WORDS } from "../data/haskell-words";
import { Language } from "../types/words.type";

const filterWordsByWeakestCharacters = (words: string[], charArr: string[]) => {
  const filteredWords = words.filter((word) => {
    for (const char of charArr) {
      if (word.includes(char)) {
        return true;
      }
    }
  });
  return filteredWords;
};

export const WordsGenerator = ({
  count,
  numbers,
  punctuation,
  language,
  programmingLanguage,
  isTrainingWeakestChars,
  weakestSymbols = ["@", "#", "!", "^", "~"],
  weakestLowercaseChars = ["w", "x"],
  weakestNumbers = ["1", "7", "9", "6"],
}: {
  count: number;
  numbers?: boolean;
  punctuation?: boolean;
  language?: Language;
  programmingLanguage?: boolean;
  isTrainingWeakestChars?: boolean;
  weakestSymbols?: string[];
  weakestLowercaseChars?: string[];
  weakestNumbers?: string[];
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
    case Language.TYPESCRIPT: {
      words = TYPESCRIPT_WORDS;
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
    case Language.PYTHON: {
      words = PYTHON_WORDS;
      break;
    }
    case Language.RUBY: {
      words = RUBY_WORDS;
      break;
    }
    case Language.GO: {
      words = GO_WORDS;
      break;
    }
    case Language.RUST: {
      words = RUST_WORDS;
      break;
    }
    case Language.SWIFT: {
      words = SWIFT_WORDS;
      break;
    }
    case Language.HASKELL: {
      words = HASKELL_WORDS;
      break;
    }
  }

  if (numbers && punctuation) {
    let numbers = numbersData;
    let symbols = symbolData;
    if (isTrainingWeakestChars) {
      numbers = filterWordsByWeakestCharacters(numbersData, weakestNumbers);
      symbols = filterWordsByWeakestCharacters(symbolData, weakestSymbols);
    }
    for (let i = 0; i < count; i++) {
      const wordLength = Math.floor(Math.random() * 4) + 4; // 4 to 7
      let currWord = "";
      for (let j = 0; j < wordLength; j++) {
        if (Math.random() < 0.5) {
          currWord += numbers[Math.floor(Math.random() * numbers.length)];
        } else {
          currWord += symbols[Math.floor(Math.random() * symbols.length)];
        }
      }
      wordsToType += currWord + " ";
    }
    wordsToType = wordsToType.trim();
    return wordsToType;
  }
  if (numbers) {
    let numbers = numbersData;
    if (isTrainingWeakestChars) {
      numbers = filterWordsByWeakestCharacters(numbersData, weakestNumbers);
    }
    for (let i = 0; i < count; i++) {
      const wordLength = Math.floor(Math.random() * 4) + 4; // 4 to 7
      let currWord = "";
      for (let j = 0; j < wordLength; j++) {
        currWord =
          currWord + numbers[Math.floor(Math.random() * numbers.length)];
      }
      wordsToType = wordsToType + " " + currWord;
    }
    return wordsToType.trim();
  }
  if (punctuation) {
    let symbols = symbolData;
    if (isTrainingWeakestChars) {
      symbols = filterWordsByWeakestCharacters(symbolData, weakestSymbols);
    }
    for (let i = 0; i < count; i++) {
      const wordLength = Math.floor(Math.random() * 4) + 4; // 4 to 7
      let currWord = "";
      for (let j = 0; j < wordLength; j++) {
        currWord =
          currWord + symbols[Math.floor(Math.random() * symbols.length)];
      }
      wordsToType = wordsToType + " " + currWord;
    }
    return wordsToType.trim();
  }
  if (programmingLanguage) {
    const wordsIndex = Math.round(Math.random() * words.length);
    wordsToType = words[wordsIndex];
    return wordsToType;
  }
  if (isTrainingWeakestChars) {
    words = filterWordsByWeakestCharacters(words, weakestLowercaseChars);
  }
  for (let i = 0; i < count; i++) {
    const wordIndex = Math.round(Math.random() * words.length);
    wordsToType = wordsToType + " " + words[wordIndex];
  }
  const result = wordsToType.trim();
  return result;
};
