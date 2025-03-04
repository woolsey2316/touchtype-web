interface Props {
  words: string;
  result: string[];
}
export const WordsToType = ({ words, result }: Props) => {
  let wordsIndex = -1;
  const jsx = words.split(" ").map((word, index) => {
    wordsIndex++;
    return (
      <div key={index}>
        {word.split("").map((char, charIndex) => {
          wordsIndex++;
          console.log(result[wordsIndex]);
          return (
            <span
              style={{ color: result[wordsIndex] }}
              key={index * 10 + charIndex}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  });

  return jsx;
};
