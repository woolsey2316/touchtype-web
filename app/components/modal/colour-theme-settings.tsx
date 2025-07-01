import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import { SketchPicker } from "react-color";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { CardOverflow } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";
import { getCustomTheme } from "../../core/theme";
import { ThemeContext } from "../../index";

interface Props {
  mode: "dark" | "light" | "system" | undefined;
}

export class ColourThemeSettings extends React.Component<Props> {
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
    console.log(this.context.theme);
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
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>50</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                50: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[50]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>100</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                100: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[100]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>200</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                200: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[200]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>300</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                300: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[300]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>400</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                400: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[400]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>500</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                500: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[500]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>600</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                600: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[600]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>700</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                700: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[700]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>800</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                800: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[800]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>900</FormLabel>
                      <Input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          this.setState({
                            customTheme: {
                              ...this.state.customTheme,
                              primary: {
                                ...this.state.customTheme.primary,
                                900: event.target.value,
                              },
                            },
                          })
                        }
                        value={this.state.customTheme.primary[900]}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <Box
                      display="flex"
                      gap="1em"
                      justifyContent="space-between"
                    >
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
                  </Stack>
                </form>
                <SketchPicker
                  color={this.state.background}
                  onChangeComplete={this.handleChangeComplete}
                />
              </CardContent>
            </CardOverflow>
          </Card>
        </ModalDialog>
      </Modal>
    );
  }
}
