import * as React from "react";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { CardOverflow } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";
import { getCustomTheme, customDarkTheme } from "../../core/theme";
import { ThemeContext } from "../../index";
import { getAllKeys, deepGet, hexToRgb, rgb_to_hex } from "../../utils/util";

interface Props {
  mode: "dark" | "light" | "system" | undefined;
}
interface State {
  open: boolean;
  background: string;
  customTheme: typeof customDarkTheme;
}
export class ColourThemeSettings extends React.Component<Props, State> {
  static override contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;
  override state = {
    open: true,
    background: "#fff",
    customTheme: {
      ...getCustomTheme(),
    },
  };

  setOpen = (open: boolean) => {
    this.setState({ open: open });
  };

  handleChangeComplete = (color: { hex: string }) => {
    this.setState({ background: color.hex });
  };

  saveColourTheme = () => {
    this.props.mode === "dark"
      ? this.context.setTheme(
          extendTheme({
            colorSchemes: {
              dark: {
                palette: {
                  ...this.state.customTheme,
                },
              },
            },
          }),
        )
      : this.context.setTheme(
          extendTheme({
            colorSchemes: {
              light: {
                palette: {
                  ...this.state.customTheme,
                },
              },
            },
          }),
        );
  };

  updateNestedThemeValue = <T extends keyof typeof this.state.customTheme>(
    path: T[],
    value: string,
  ) => {
    this.setState((prevState) => {
      const newTheme = { ...prevState.customTheme };
      let obj: Record<string, Record<string, string> | string> = newTheme;
      for (let i = 0; i < path.length - 1; i++) {
        if (!obj[path[i]]) obj[path[i]] = {};
        obj = obj[path[i]] as Record<string, string>;
      }
      obj[path[path.length - 1]] = value;
      return { customTheme: newTheme };
    });
  };

  keys = getAllKeys(
    this.state.customTheme,
  ) as keyof (typeof this.state.customTheme)[];

  override render() {
    return (
      <Modal
        sx={{
          "& > .MuiModal-backdrop": {
            backdropFilter: "blur(0px)",
          },
        }}
        open={this.state.open}
        onClose={() => this.setOpen(false)}
      >
        <ModalDialog
          sx={{
            right: 0,
            left: "auto",
            transform: "translate(0%, -50%)",
            maxHeight: "100%",
          }}
        >
          <Card variant="plain">
            <CardOverflow>
              <CardContent orientation="horizontal" sx={{ gap: 2 }}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    this.saveColourTheme();
                  }}
                >
                  <DialogTitle>Create new colour pallette</DialogTitle>
                  <Stack
                    sx={{
                      overflowY: "scroll",
                      maxHeight: "85vh",
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      width: "550px",
                      marginBottom: "16px",
                    }}
                    spacing={2}
                  >
                    {Array.isArray(this.keys) ? (
                      this.keys.map((key) => (
                        <Box
                          sx={{
                            width: "250px",
                            marginTop: "16px !important",
                          }}
                          display="flex"
                          justifyContent="space-between"
                          key={key}
                        >
                          <FormLabel>{key}</FormLabel>
                          <Input
                            type="color"
                            value={
                              key.includes("mainChannel")
                                ? rgb_to_hex(
                                    deepGet(
                                      this.state.customTheme,
                                      key
                                        .replace(/\[([^[\]]*)\]/g, ".$1.")
                                        .split(".")
                                        .filter((t: unknown) => t !== ""),
                                    )
                                      .split(" ")
                                      .map(Number),
                                  )
                                : deepGet(
                                    this.state.customTheme,
                                    key
                                      .replace(/\[([^[\]]*)\]/g, ".$1.")
                                      .split(".")
                                      .filter((t: unknown) => t !== ""),
                                  )
                            }
                            onChange={(e) => {
                              if (key.includes("mainChannel")) {
                                const rgb = hexToRgb(e.target.value.slice(1));
                                if (rgb) {
                                  const { r, g, b } = rgb;
                                  this.updateNestedThemeValue(
                                    key.split("."),
                                    `${r} ${g} ${b}`,
                                  );
                                }
                              } else {
                                this.updateNestedThemeValue(
                                  key.split("."),
                                  e.target.value,
                                );
                              }
                            }}
                            style={{ verticalAlign: "middle" }}
                          />
                        </Box>
                      ))
                    ) : (
                      <></>
                    )}
                  </Stack>
                  <Box display="flex" gap="1em" justifyContent="space-between">
                    <Button
                      type="button"
                      color="neutral"
                      sx={{ width: "100%" }}
                    >
                      Undo
                    </Button>
                    <Button type="submit" sx={{ width: "100%" }}>
                      Save
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </CardOverflow>
          </Card>
        </ModalDialog>
      </Modal>
    );
  }
}
