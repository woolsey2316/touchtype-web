import { Box, Container, Typography, Switch, Select, Option } from "@mui/joy";
import { SettingsButton } from "../components/button-settings";
import { type JSX, useState, useEffect, useContext } from "react";
import { usePageEffect } from "../core/page";
import { Cursor } from "../components/cursor";
import { WordsToType } from "../components/words-to-type";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { UserPreferencesContext } from "../context/userPreferences";
import { UsernameForm } from "../components/username-form";
import { useUserData } from "../hooks/useUserData";
import Divider from "@mui/joy/Divider";
import { Footer } from "../components/footer";

export const Component = function Settings(): JSX.Element {
  usePageEffect({ title: "Settings" });
  const { theme } = useContext(ThemeContext);
  const userId = localStorage.getItem("user_id");
  const { userData } = useUserData(userId);
  const {
    font,
    setFont,
    setSpaceChar,
    setZipperAnimation,
    setCursorType,
    setSmoothCursor,
    setSkipOverTabs,
  } = useContext(UserPreferencesContext);
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

  const [zipperEnabled, setZipperEnabled] = useState<boolean>(() =>
    window.localStorage.getItem("zipperEnabled") === "false" ? false : true,
  );
  const [spaceChar, changeSpaceChar] = useState<string>(
    () => window.localStorage.getItem("spaceChar") ?? " ",
  );
  const [cursorChar, changeCursorChar] = useState<string>(
    () => window.localStorage.getItem("cursorChar") ?? "|",
  );
  const [smoothCursor, changeSmoothCursor] = useState<boolean>(() =>
    window.localStorage.getItem("smoothCursor") === "false" ? false : true,
  );
  const [skipTabs, changeSkipTabs] = useState<boolean>(() =>
    window.localStorage.getItem("skipOverTabs") === "true" ? true : false,
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

  const setSkipTabsPreference = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    changeSkipTabs(event.target.checked);
    setSkipOverTabs(event.target.checked);
    window.localStorage.setItem("skipOverTabs", String(event.target.checked));
  };

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 1, letterSpacing: "0.01em" }} level="h2">
        Settings
      </Typography>
      <Typography sx={{ mb: 4 }} level="body-md">
        Adjust the typing behaviour and visual cues. Settings are saved locally
      </Typography>

      {/* Username Section */}
      <Box
        sx={{
          mb: 2,
          bgcolor: theme.vars.palette.grey[600],
          color: theme.vars.palette.text.secondary,
          borderRadius: "8px",
          boxShadow:
            "1px 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          p: 2,
        }}
      >
        <Typography
          component="h3"
          sx={{
            color: theme.vars.palette.grey[800],
            mb: 2,
          }}
        >
          Profile
        </Typography>
        <UsernameForm
          currentUsername={userData?.username}
          key={userData?.username}
        />
      </Box>

      <Box
        sx={{
          mb: 2,
          bgcolor: theme.vars.palette.grey[600],
          color: theme.vars.palette.text.secondary,
          borderRadius: "8px",
          boxShadow:
            "1px 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          p: 2,
        }}
      >
        <Typography
          component="h3"
          sx={{
            color: theme.vars.palette.grey[800],
          }}
        >
          Preview
        </Typography>
        <Box
          p={4}
          sx={{ fontFamily: "Courier", fontSize: "24px", position: "relative" }}
        >
          <Cursor
            letters={document.getElementsByClassName("letter")}
            cursorIndex={cursorIndex}
            sx={{ height: "53px" }}
          />
          <WordsToType colourOfChar={colourOfChar} words={words} />
        </Box>
        <Divider
          sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <Typography
              component="label"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                color: theme.vars.palette.grey[800],
              }}
            >
              <span style={{ fontWeight: "bold" }}>Font Family</span>
            </Typography>
            <Select
              onChange={(
                _event:
                  | React.MouseEvent<Element, MouseEvent>
                  | React.KeyboardEvent
                  | React.FocusEvent<Element, Element>
                  | null,
                value,
              ) => {
                value = value ?? "0xProtoNerdFontMono-Bold.700";
                const [family, weight] = value.split(".");
                setFont({
                  family: family,
                  weight: weight ?? "400",
                });
                window.localStorage.setItem("fontFamily", family);
                window.localStorage.setItem("fontWeight", weight ?? "400");
              }}
              defaultValue={"0xProtoNerdFontMono-Bold.700"}
              placeholder="Select a font"
              renderValue={(selected) => {
                const family =
                  selected?.value?.split(".")[0] ??
                  selected?.label ??
                  `${font.family}` ??
                  "Select a font";
                return <Box>{family}</Box>;
              }}
              value={`${font.family}.${font.weight}`}
              sx={{
                marginLeft: "10px",
                marginTop: "10px",
                width: "350px",
                border: "none",
                borderRadius: "50px",
                color: theme.vars.palette.text.primary,
              }}
            >
              <Option value="0xProtoNerdFontMono-Bold.700">
                0xProtoNerdFontMono-Bold
              </Option>
              <Option value="0xProtoNerdFontMono-Regular.400">
                0xProtoNerdFontMono-Regular
              </Option>
              <Option value="0xProtoNerdFontPropo-Bold.700">
                0xProtoNerdFontPropo-Bold
              </Option>
              <Option value="0xProtoNerdFontPropo-Regular.400">
                0xProtoNerdFontPropo-Regular
              </Option>
              <Option value="0xProtoNerdFont-Regular.400">
                0xProtoNerdFont-Regular
              </Option>
              <Option value="AdwaitaMonoNerdFont-Bold.700">
                AdwaitaMonoNerdFont-Bold
              </Option>
              <Option value="AdwaitaMonoNerdFontMono-Bold.700">
                AdwaitaMonoNerdFontMono-Bold
              </Option>
              <Option value="AdwaitaMonoNerdFontMono-Regular.400">
                AdwaitaMonoNerdFontMono-Regular
              </Option>
              <Option value="AdwaitaMonoNerdFontPropo-Bold.700">
                AdwaitaMonoNerdFontPropo-Bold
              </Option>
              <Option value="AdwaitaMonoNerdFontPropo-Regular.400">
                AdwaitaMonoNerdFontPropo-Regular
              </Option>
              <Option value="AdwaitaMonoNerdFont-Regular.400">
                AdwaitaMonoNerdFont-Regular
              </Option>
              <Option value="AgaveNerdFont-Bold.700">AgaveNerdFont-Bold</Option>
              <Option value="AgaveNerdFontMono-Bold.700">
                AgaveNerdFontMono-Bold
              </Option>
              <Option value="AgaveNerdFontMono-Regular.400">
                AgaveNerdFontMono-Regular
              </Option>
              <Option value="AgaveNerdFontPropo-Bold.700">
                AgaveNerdFontPropo-Bold
              </Option>
              <Option value="AgaveNerdFontPropo-Regular.400">
                AgaveNerdFontPropo-Regular
              </Option>
              <Option value="AgaveNerdFont-Regular.400">
                AgaveNerdFont-Regular
              </Option>
              <Option value="AnonymiceProNerdFont-Bold.700">
                AnonymiceProNerdFontMono-Regular
              </Option>
              <Option value="AnonymiceProNerdFontPropo-Bold.700">
                AnonymiceProNerdFontPropo-Bold
              </Option>
              <Option value="AnonymiceProNerdFontPropo-Regular.400">
                AnonymiceProNerdFontPropo-Regular
              </Option>
              <Option value="AnonymiceProNerdFont-Regular.400">
                AnonymiceProNerdFont-Regular
              </Option>
              <Option value="ArimoNerdFont-Bold.700">ArimoNerdFont-Bold</Option>
              <Option value="ArimoNerdFont-Regular.400">
                ArimoNerdFont-Regular
              </Option>
              <Option value="BitstromWeraNerdFont-Bold.700">
                BitstromWeraNerdFont-Bold
              </Option>
              <Option value="BitstromWeraNerdFontMono-Regular.400">
                BitstromWeraNerdFontMono-Regular
              </Option>
              <Option value="BitstromWeraNerdFont-Regular.400">
                BitstromWeraNerdFont-Regular
              </Option>
              <Option value="BlexMonoNerdFont-Bold.700">
                BlexMonoNerdFont-Bold
              </Option>
              <Option value="BlexMonoNerdFont-Medium.500">
                BlexMonoNerdFont-Medium
              </Option>
              <Option value="BlexMonoNerdFontMono-Medium.500">
                BlexMonoNerdFontMono-Medium
              </Option>
              <Option value="BlexMonoNerdFontMono-Regular.400">
                BlexMonoNerdFontMono-Regular
              </Option>
              <Option value="CaskaydiaCoveNerdFontMono-Regular.400">
                CaskaydiaCoveNerdFontMono-Regular
              </Option>
              <Option value="CaskaydiaCoveNerdFontPropo-Regular.400">
                CaskaydiaCoveNerdFontPropo-Regular
              </Option>
              <Option value="CaskaydiaMonoNerdFontMono-Regular.400">
                CaskaydiaMonoNerdFontMono-Regular
              </Option>
              <Option value="CaskaydiaMonoNerdFontPropo-Regular.400">
                CaskaydiaMonoNerdFontPropo-Regular
              </Option>
              <Option value="CousineNerdFontMono-Bold.700">
                CousineNerdFontMono-Bold
              </Option>
              <Option value="CousineNerdFontMono-Regular.400">
                CousineNerdFontMono-Regular
              </Option>
              <Option value="CousineNerdFontPropo-Regular.400">
                CousineNerdFontPropo-Regular
              </Option>
              <Option value="CousineNerdFont-Regular.400">
                CousineNerdFont-Regular
              </Option>
              <Option value="D2CodingLigatureNerdFontMono-Bold.700">
                D2CodingLigatureNerdFontMono-Bold
              </Option>
              <Option value="D2CodingLigatureNerdFontMono-Regular.400">
                D2CodingLigatureNerdFontMono-Regular
              </Option>
              <Option value="D2CodingLigatureNerdFontPropo-Regular.400">
                D2CodingLigatureNerdFontPropo-Regular
              </Option>
              <Option value="D2CodingLigatureNerdFont-Regular.400">
                D2CodingLigatureNerdFont-Regular
              </Option>
              <Option value="DaddyTimeMonoNerdFontPropo-Regular.400">
                DaddyTimeMonoNerdFontPropo-Regular
              </Option>
              <Option value="DaddyTimeMonoNerdFont-Regular.400">
                DaddyTimeMonoNerdFont-Regular
              </Option>
              <Option value="FantasqueSansMNerdFont-Bold.700">
                FantasqueSansMNerdFont-Bold
              </Option>
              <Option value="FantasqueSansMNerdFontMono-Regular.400">
                FantasqueSansMNerdFontMono-Regular
              </Option>
              <Option value="FantasqueSansMNerdFont-Regular.400">
                FantasqueSansMNerdFont-Regular
              </Option>
              <Option value="InconsolataLGCNerdFontMono-Regular.400">
                InconsolataLGCNerdFontMono-Regular
              </Option>
              <Option value="InconsolataLGCNerdFontPropo-Regular.400">
                InconsolataLGCNerdFontPropo-Regular
              </Option>
              <Option value="InconsolataLGCNerdFont-Regular.400">
                InconsolataLGCNerdFont-Regular
              </Option>
              <Option value="IntoneMonoNerdFont-Medium.500">
                IntoneMonoNerdFont-Medium
              </Option>
              <Option value="IntoneMonoNerdFontMono-Bold.700">
                IntoneMonoNerdFontMono-Bold
              </Option>
              <Option value="IntoneMonoNerdFontMono-Medium.500">
                IntoneMonoNerdFontMono-Medium
              </Option>
              <Option value="IntoneMonoNerdFontMono-Regular.400">
                IntoneMonoNerdFontMono-Regular
              </Option>
              <Option value="IntoneMonoNerdFontPropo-Bold.700">
                IntoneMonoNerdFontPropo-Bold
              </Option>
              <Option value="JetBrainsMonoNerdFont-Medium.500">
                JetBrainsMonoNerdFont-Medium
              </Option>
              <Option value="JetBrainsMonoNerdFontMono-Bold.700">
                JetBrainsMonoNerdFontMono-Bold
              </Option>
              <Option value="JetBrainsMonoNerdFontMono-Medium.500">
                JetBrainsMonoNerdFontMono-Medium
              </Option>
              <Option value="JetBrainsMonoNerdFontMono-Regular.400">
                JetBrainsMonoNerdFontMono-Regular
              </Option>
              <Option value="JetBrainsMonoNerdFontPropo-Medium.500">
                JetBrainsMonoNerdFontPropo-Medium
              </Option>
              <Option value="JetBrainsMonoNerdFontPropo-Regular.400">
                JetBrainsMonoNerdFontPropo-Regular
              </Option>
              <Option value="LilexNerdFont-Medium.500">
                LilexNerdFont-Medium
              </Option>
              <Option value="LilexNerdFontMono-Medium.500">
                LilexNerdFontMono-Medium
              </Option>
              <Option value="LilexNerdFontMono-Regular.400">
                LilexNerdFontMono-Regular
              </Option>
              <Option value="LilexNerdFontPropo-Medium.500">
                LilexNerdFontPropo-Medium
              </Option>
              <Option value="LilexNerdFontPropo-Regular.400">
                LilexNerdFontPropo-Regular
              </Option>
              <Option value="LilexNerdFont-Regular.400">
                LilexNerdFont-Regular
              </Option>
              <Option value="PlusJakartaSans-VariableFont_wght.400">
                PlusJakartaSans-VariableFont_wght
              </Option>
              <Option value="RobotoMonoNerdFont-Bold.700">
                RobotoMonoNerdFont-Bold
              </Option>
              <Option value="RobotoMonoNerdFont-Medium.500">
                RobotoMonoNerdFont-Medium
              </Option>
              <Option value="RobotoMonoNerdFontMono-Bold.700">
                RobotoMonoNerdFontMono-Bold
              </Option>
              <Option value="RobotoMonoNerdFontMono-Medium.500">
                RobotoMonoNerdFontMono-Medium
              </Option>
              <Option value="RobotoMonoNerdFontMono-Regular.400">
                RobotoMonoNerdFontMono-Regular
              </Option>
              <Option value="RobotoMonoNerdFontPropo-Bold.700">
                RobotoMonoNerdFontPropo-Bold
              </Option>
              <Option value="RobotoMonoNerdFontPropo-Regular.400">
                RobotoMonoNerdFontPropo-Regular
              </Option>
              <Option value="RobotoMonoNerdFont-Regular.400">
                RobotoMonoNerdFont-Regular
              </Option>
              <Option value="UbuntuMonoNerdFont-Bold.700">
                UbuntuMonoNerdFont-Bold
              </Option>
              <Option value="UbuntuMonoNerdFontMono-Bold.700">
                UbuntuMonoNerdFontMono-Bold
              </Option>
              <Option value="UbuntuMonoNerdFontMono-Regular.400">
                UbuntuMonoNerdFontMono-Regular
              </Option>
              <Option value="UbuntuMonoNerdFontPropo-Regular.400">
                UbuntuMonoNerdFontPropo-Regular
              </Option>
            </Select>
          </Box>
          <Box
            sx={{
              mt: 3,
              mx: 2,
              fontFamily: '"' + font.family + '"',
              fontWeight: font.weight,
              fontSize: "36px",
            }}
          >
            Text to type preview
          </Box>
        </Box>
        <Divider
          sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
        />
        <Typography
          component="label"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 1,
            color: theme.vars.palette.grey[800],
          }}
        >
          <span style={{ fontWeight: "bold" }}>Zipper Animation</span>
          <span>
            When successfully typing a character it fades out with an animation
          </span>
        </Typography>
        <Switch
          sx={{ alignSelf: "start", mt: 2, ml: 2 }}
          checked={zipperEnabled}
          onChange={handleToggle}
        />
        <Divider
          sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
        />
        <Typography
          component="label"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            color: theme.vars.palette.grey[800],
          }}
        >
          <span style={{ fontWeight: "bold" }}>Cursor Animation</span>
          <span>Cursor smoothly slides to the right between characters</span>
        </Typography>
        <Switch
          sx={{ alignSelf: "flex-start", ml: 2, mt: 2 }}
          checked={smoothCursor}
          onChange={setSmoothCursorPreference}
        />

        <Divider
          sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
        />
        <Box>
          <Typography
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              color: theme.vars.palette.grey[800],
            }}
          >
            <span style={{ fontWeight: "bold" }}>Space Character</span>
            <span>displays a visible character for space</span>
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
        </Box>
        <Divider
          sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
        />
        <Box>
          <Typography
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              color: theme.vars.palette.grey[800],
            }}
          >
            <span style={{ fontWeight: "bold" }}>Cursor Character</span>
            <span>Change the cursor style</span>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}>
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
        </Box>
      </Box>
      <Box
        sx={{
          mb: 2,
          bgcolor: theme.vars.palette.grey[600],
          color: theme.vars.palette.text.secondary,
          borderRadius: "8px",
          boxShadow:
            "1px 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          p: 2,
        }}
      >
        <Typography
          component="h3"
          sx={{
            color: theme.vars.palette.grey[800],
          }}
        >
          Test Behavior
        </Typography>
        <Typography
          component="label"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            color: theme.vars.palette.grey[800],
            mt: 2,
          }}
        >
          <span style={{ fontWeight: "bold" }}>Skip Tabs</span>
          <span>Automatically skip over tab characters during typing test</span>
        </Typography>
        <Switch
          sx={{ alignSelf: "flex-start", ml: 2, mt: 2 }}
          checked={skipTabs}
          onChange={setSkipTabsPreference}
        />
      </Box>
      <Footer />
    </Container>
  );
};
