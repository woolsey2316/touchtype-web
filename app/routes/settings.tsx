import { Box, Container, Typography, Switch, Select, Option } from "@mui/joy";
import { SettingsButton } from "../components/button-settings";
import { type JSX, useState, useEffect, useContext } from "react";
import { usePageEffect } from "../core/page";
import { Cursor } from "../components/cursor";
import { WordsToType } from "../components/words-to-type";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { UserPreferencesContext } from "../context/userPreferences";

export const Component = function Settings(): JSX.Element {
  usePageEffect({ title: "Settings" });
  const { theme } = useContext(ThemeContext);
  const { setSpaceChar, setZipperAnimation, setCursorType, setSmoothCursor } =
    useContext(UserPreferencesContext);
  // display preview text state
  const [words] = useState<string>("sample text for preview purposes");
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(""),
  );
  const [cursorIndex, setCursorIndex] = useState<number>(0);

  useEffect(() => {
    const myFunction = () => {
      setCursorIndex((prevIndex) => (prevIndex + 1) % words.length);
      setColourOfChar((prevColours: string[]) => {
        let newColours = [...prevColours];
        const nextIndex = cursorIndex;
        if (cursorIndex === 0) {
          newColours = Array(words.length).fill("");
        }
        newColours[nextIndex] = theme.vars.palette.success.plainColor;
        return newColours;
      });
    };

    // Set up the interval
    const intervalId = setInterval(myFunction, 800);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [words, setCursorIndex, cursorIndex, theme, setColourOfChar]);

  const [fontFamily, setFontFamily] = useState<string>(
    () => window.localStorage.getItem("fontFamily") || "0xProtoNerdFont-Bold",
  );
  const [zipperEnabled, setZipperEnabled] = useState<boolean>(() =>
    window.localStorage.getItem("zipperEnabled") === "false" ? false : true,
  );
  const [spaceChar, changeSpaceChar] = useState<string>(
    () => window.localStorage.getItem("spaceChar") ?? "·",
  );
  const [cursorChar, changeCursorChar] = useState<string>(
    () => window.localStorage.getItem("cursorChar") ?? "|",
  );
  const [smoothCursor, changeSmoothCursor] = useState<boolean>(() =>
    window.localStorage.getItem("smoothCursor") === "false" ? false : true,
  );

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipperEnabled(event.target.checked);
    setZipperAnimation(event.target.checked);
    window.localStorage.setItem("zipperEnabled", String(event.target.checked));
  };

  const setSpaceBarChar = (spaceChar: string) => {
    changeSpaceChar(spaceChar);
    setSpaceChar(spaceChar);
    window.localStorage.setItem("spaceChar", spaceChar);
  };

  const setCursorChar = (cursorChar: string) => {
    changeCursorChar(cursorChar);
    setCursorType(cursorChar);
    window.localStorage.setItem("cursorChar", cursorChar);
  };

  const setSmoothCursorPreference = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    changeSmoothCursor(event.target.checked);
    setSmoothCursor(event.target.checked);
    window.localStorage.setItem("smoothCursor", String(event.target.checked));
  };

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2, letterSpacing: "0.01em" }} level="h2">
        Settings
      </Typography>
      <Typography sx={{ mb: 2 }} level="h3">
        Text display
      </Typography>
      <Box
        p={4}
        sx={{ fontFamily: "Courier", fontSize: "24px", position: "relative" }}
      >
        <Cursor cursorIndex={cursorIndex} sx={{ height: "53px" }} />
        <WordsToType colourOfChar={colourOfChar} words={words} />
      </Box>
      <Typography
        component="label"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <span style={{ fontWeight: "bold" }}>Font Family -</span>
        <span>Select the font type</span>
        <Select
          onChange={(
            _event:
              | React.MouseEvent<Element, MouseEvent>
              | React.KeyboardEvent
              | React.FocusEvent<Element, Element>
              | null,
            value,
          ) => {
            setFontFamily(value ?? "0xProtoNerdFont-Bold");
          }}
          defaultValue={"0xProtoNerdFont-Bold"}
          placeholder="Select a font"
          renderValue={(selected) => {
            return <Box>{selected?.label ?? "Select a language"}</Box>;
          }}
          value={fontFamily}
          sx={{ marginLeft: "10px", minWidth: "150px" }}
        >
          <Option value={"0xProtoNerdFont-Bold"}>0xProtoNerdFont-Bold</Option>
        </Select>
      </Typography>
      <Typography
        component="label"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <span style={{ fontWeight: "bold" }}>Zipper Animation -</span>
        <span>
          When successfully typing a character it fades out with an animation
        </span>
        <Switch checked={zipperEnabled} onChange={handleToggle} />
      </Typography>
      <Typography
        component="label"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <span style={{ fontWeight: "bold" }}>Cursor Animation -</span>
        <span>Cursor slides to the right with an animation</span>
        <Switch checked={smoothCursor} onChange={setSmoothCursorPreference} />
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}>
        <Typography
          component="label"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <span style={{ fontWeight: "bold" }}>Space Character -</span>
          <span>displays a visible character for space</span>
        </Typography>
        <SettingsButton
          selectedValue={spaceChar}
          handleClick={() => setSpaceBarChar("·")}
          value="·"
        >
          ·
        </SettingsButton>
        <SettingsButton
          handleClick={() => setSpaceBarChar("␣")}
          selectedValue={spaceChar}
          value="␣"
        >
          ␣
        </SettingsButton>
        <SettingsButton
          handleClick={() => setSpaceBarChar(" ")}
          selectedValue={spaceChar}
          value=" "
        >
          empty
        </SettingsButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}>
        <Typography
          component="label"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <span style={{ fontWeight: "bold" }}>Cursor Character -</span>
          <span>Change the cursor style</span>
        </Typography>
        <SettingsButton
          selectedValue={cursorChar}
          handleClick={() => setCursorChar("|")}
          value="|"
        >
          |
        </SettingsButton>
        <SettingsButton
          handleClick={() => setCursorChar("_")}
          selectedValue={cursorChar}
          value="_"
        >
          _
        </SettingsButton>
        <SettingsButton
          handleClick={() => setCursorChar("▊")}
          selectedValue={cursorChar}
          value="▊"
        >
          ▊
        </SettingsButton>
        <SettingsButton
          handleClick={() => setCursorChar("▯")}
          selectedValue={cursorChar}
          value="▯"
        >
          ▯
        </SettingsButton>
      </Box>
    </Container>
  );
};
