interface Props {
  words: string;
}
export const WordsToType = ({ words }: Props) => {
  const jsx = words.split(" ").map((word, index) => {
    return (
      <div key={index}>
        {word.split("").map((char, charIndex) => {
          return <span key={index * 10 + charIndex}>{char}</span>;
        })}
      </div>
    );
  });

  return jsx;
};
