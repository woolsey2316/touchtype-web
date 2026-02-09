import { Box } from "@mui/joy";
import { BasicLink } from "./basic-link";
export const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "auto",
      }}
    >
      <BasicLink href="/privacy">
        <p style={{ textAlign: "center", margin: "1rem 0" }}>privacy</p>
      </BasicLink>
      <p style={{ textAlign: "center", margin: "1rem 0.5rem" }}>&#183;</p>
      <BasicLink href="/terms">
        <p style={{ textAlign: "center", margin: "1rem 0" }}>terms</p>
      </BasicLink>
    </Box>
  );
};
