import * as React from "react";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalClose from "@mui/joy/ModalClose";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import { CardOverflow } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";
import { getCustomTheme, customDarkTheme } from "../../core/theme";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { getAllKeys, deepGet, hexToRgb, rgb_to_hex } from "../../utils/util";
import { THEME_COLLECTION } from "../../data/themes/colour-themes";

interface Props {
  mode: "dark" | "light" | "system" | undefined;
  isModalOpen: boolean;
  setIsResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface State {
  open: boolean;
  background: string;
  customTheme: typeof customDarkTheme;
  revertCustomTheme: typeof customDarkTheme;
}
export class ColourThemeSettings extends React.Component<Props, State> {
  static override contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;
  override state = {
    open: true,
    background: "#fff",
    revertCustomTheme: structuredClone(
      getCustomTheme({
        mode: "default",
        name: "MOCHA",
      }),
    ),
    customTheme: {
      ...getCustomTheme({
        mode: "default",
        name: "MOCHA",
      }),
    },
  };

  setOpen = (open: boolean) => {
    this.setState({ open: open });
  };

  handleChangeComplete = (color: { hex: string }) => {
    this.setState({ background: color.hex });
  };

  saveColourTheme = () => {
    if (this.props.mode === "dark") {
      this.context.setTheme(
        extendTheme({
          colorSchemes: {
            dark: {
              palette: {
                ...this.state.customTheme,
              },
            },
          },
        }),
      );
    } else {
      this.context.setTheme(
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
    }
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

  handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    this.setState(
      {
        customTheme: getCustomTheme({
          mode: this.props.mode === "dark" ? "dark" : "light",
          name: newValue as keyof (typeof THEME_COLLECTION)["light"] &
            keyof (typeof THEME_COLLECTION)["dark"] as keyof (typeof THEME_COLLECTION)["default"],
        }),
      },
      () => {
        this.saveColourTheme();
        this.setState({ revertCustomTheme: { ...this.state.customTheme } });
      },
    );
  };

  revertTheme = () => {
    console.log(this.state.revertCustomTheme);
    this.setState({
      customTheme: { ...this.state.revertCustomTheme },
    });
  };

  override render() {
    return (
      <Modal
        slotProps={{
          backdrop: {
            style: {
              backdropFilter: "blur(0px)",
              backgroundColor: "transparent",
            },
          },
        }}
        disableScrollLock={true}
        open={this.props.isModalOpen}
        onClose={() => this.props.setIsResultsModalOpen(false)}
      >
        <ModalDialog
          sx={{
            right: 0,
            left: "auto",
            transform: "translate(0%, -50%)",
            maxHeight: "95%",
          }}
        >
          <ModalClose />
          <Card variant="plain">
            <CardOverflow>
              <CardContent orientation="horizontal" sx={{ gap: 2 }}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    this.saveColourTheme();
                  }}
                >
                  <DialogTitle>Create colour pallette</DialogTitle>
                  <Stack
                    sx={{
                      overflowY: "scroll",
                      maxHeight: "80vh",
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      width: "550px",
                      marginBottom: "16px",
                    }}
                    spacing={2}
                  >
                    {/* load theme from select menu  */}
                    <Box sx={{ marginTop: "16px !important" }}>
                      <Typography>Load theme</Typography>
                      <Select
                        placeholder="Select a theme..."
                        onChange={this.handleChange}
                        sx={{ width: 240 }}
                      >
                        {Object.entries(
                          THEME_COLLECTION[
                            this.props.mode === "dark" ? "dark" : "light"
                          ],
                        ).map(([key]) => (
                          <Option
                            sx={(theme) => ({
                              "&.Mui-selected": {
                                color: theme.palette.neutral.plainHoverColor,
                              },
                              "&.MuiOption-highlighted": {
                                color: theme.palette.neutral.plainHoverColor,
                              },
                            })}
                            key={key}
                            value={key}
                          >
                            {key.toLowerCase()}
                          </Option>
                        ))}
                      </Select>
                    </Box>
                    {/* save theme into custom slot */}
                    <Box>
                      <Typography>Save theme</Typography>
                      <Select
                        placeholder="Select a theme..."
                        sx={{ width: 240 }}
                      >
                        <Option
                          sx={(theme) => ({
                            "&.Mui-selected": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                            "&.MuiOption-highlighted": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                          })}
                          value="custom1"
                        >
                          Custom 1
                        </Option>
                        <Option
                          sx={(theme) => ({
                            "&.Mui-selected": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                            "&.MuiOption-highlighted": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                          })}
                          value="custom2"
                        >
                          Custom 2
                        </Option>
                        <Option
                          sx={(theme) => ({
                            "&.Mui-selected": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                            "&.MuiOption-highlighted": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                          })}
                          value="custom3"
                        >
                          Custom 3
                        </Option>
                        <Option
                          sx={(theme) => ({
                            "&.Mui-selected": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                            "&.MuiOption-highlighted": {
                              color: theme.palette.neutral.plainHoverColor,
                            },
                          })}
                          value="custom4"
                        >
                          Custom 4
                        </Option>
                      </Select>
                    </Box>
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
                      onClick={this.revertTheme}
                    >
                      Reset
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
