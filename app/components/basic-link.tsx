import Link from "@mui/material/Link";

export const BasicLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      sx={{
        color: (theme) => theme.palette.text.primary,
        textDecoration: "none",
        "&:hover": { textdecoration: "none" },
      }}
    >
      {children}
    </Link>
  );
};
