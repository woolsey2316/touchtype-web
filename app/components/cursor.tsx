interface CursorProps {
  left: string;
  top: string;
}

export function Cursor({ left, top }: CursorProps): JSX.Element {
  return (
    <div
      style={{
        color: "#034748",
        position: "absolute",
        left: left,
        top: top,
      }}
    >
      |
    </div>
  );
}
