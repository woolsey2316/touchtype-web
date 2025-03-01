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
        <div>t</div>
        <div>h</div>
        <div>i</div>
        <div>s</div>
      </div>
      <div>
        <div>i</div>
        <div>s</div>
      </div>
      <div>
        <div>a</div>
      </div>
      <div>
        <div>t</div>
        <div>y</div>
        <div>p</div>
        <div>i</div>
        <div>n</div>
        <div>g</div>
      </div>
      <div>
        <div>t</div>
        <div>e</div>
        <div>s</div>
        <div>t</div>
      </div>
    </Box>
  );
}
