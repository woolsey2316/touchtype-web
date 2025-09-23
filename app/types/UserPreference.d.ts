export default interface UserPrefrence {
  email: string;
  mode: "light" | "dark";
  spaceCharacter: "space" | "underscore" | "dash";
  zipperAnimation: boolean;
  cursorCharacter: "block" | "underline" | "bar" | "stick";
  smoothCursor: boolean;
  fontFamily: string;
}
