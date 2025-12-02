export function maybeScrollToNextLine(
  cursorIndex: number,
  childInputRef: React.RefObject<HTMLDivElement | null>,
) {
  const letters = document?.getElementsByClassName("letter");
  if (letters.length !== 0) {
    if (
      (letters[cursorIndex + 1] as HTMLElement).offsetTop >
      (letters[cursorIndex] as HTMLElement).offsetTop
    ) {
      if (childInputRef?.current)
        childInputRef.current.scrollTop = (
          letters[cursorIndex + 1] as HTMLElement
        ).offsetTop;
    }
  }
}

export function maybeScrollToPreviousLine(
  cursorIndex: number,
  childInputRef: React.RefObject<HTMLDivElement | null>,
) {
  const letters = document?.getElementsByClassName("letter");
  if (letters[cursorIndex - 1] === undefined) return;
  if (letters.length !== 0) {
    if (
      (letters[cursorIndex - 1] as HTMLElement).offsetTop <
      (letters[cursorIndex] as HTMLElement).offsetTop
    ) {
      if (childInputRef?.current)
        childInputRef.current.scrollTop = (
          letters[cursorIndex - 1] as HTMLElement
        ).offsetTop;
    }
  }
}
