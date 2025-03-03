import Box from "@mui/joy/Box";
import { Cursor } from "./cursor";

export default function TypingPanel() {
  return (
    <Box
      sx={{
        color: "#1481BA",
        display: "flex",
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1.5,
        fontFamily: "monospace",
        fontSize: 24,
      }}
    >
      <Cursor left="-5px" top="-2px" />
      <div>
        <span>t</span>
        <span>h</span>
        <span>i</span>
        <span>s</span>
      </div>
      <div>
        <span>i</span>
        <span>s</span>
      </div>
      <div>
        <span>a</span>
      </div>
      <div>
        <span>t</span>
        <span>y</span>
        <span>p</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
      </div>
      <div>
        <span>t</span>
        <span>e</span>
        <span>s</span>
        <span>t</span>
      </div>
    </Box>
  );
}
