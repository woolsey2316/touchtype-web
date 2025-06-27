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
import { setCustomDarkTheme } from "../../core/theme";

export class ColourThemeSettings extends React.Component {
  override state = {
    open: true,
    background: "#fff",
    customTheme: {
      danger: {
        plainColor: "#d20f39",
      },
      success: {
        plainColor: "#40a02b",
      },
      background: {
        body: "#232634",
        level1: "#292c3c",
        level2: "#303446",
        level3: "#414559",
      },
      primary: {
        50: "#f2d5cf",
        100: "#eebebe",
        200: "#f4b8e4",
        300: "#ca9ee6",
        400: "#e78284",
        500: "#ea999c",
        600: "#ef9f76",
        700: "#e5c890",
        800: "#a6d189",
        900: "#99d1db",
        plainColor: "#8caaee",
        plainHoverColor: "#85c1dc",
        plainHoverBg: "transparent",
        plainActiveBg: "transparent",
        softBg: "#ca9ee6",
        softHoverBg: "#f4b8e4",
        plainActiveColor: "#232634",
      },
      neutral: {
        50: "#dce0e8",
        100: "#e6e9ef",
        200: "#eff1f5",
        300: "#ccd0da",
        400: "#bcc0cc",
        500: "#acb0be",
        600: "#9ca0b0",
        700: "#8c8fa1",
        800: "#7c7f93",
        900: "#6c6f85",
        plainActiveBg: "#ca9ee6",
        plainHoverBg: "#99d1db",
        plainHoverColor: "#232634",
        plainActiveColor: "#232634",
      },
    },
  };

  setOpen = (open: boolean) => {
    this.setState({ open: open });
  };

  handleChangeComplete = (color: { hex: string }) => {
    this.setState({ background: color.hex });
  };

  saveColourTheme = () => {
    setCustomDarkTheme(this.state.customTheme);
    return;
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
                        ) => this.setState(event.target.value)}
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
