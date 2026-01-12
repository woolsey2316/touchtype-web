import { Box } from "@mui/joy";
import { MouseEvent } from "react";
export const ColorInputBox = (props: {
  color: string;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        backgroundColor: props.color,
        padding: "16px",
        width: "45px",
        borderRadius: "8px",
        color: "#fff",
      }}
    ></Box>
  );
};
