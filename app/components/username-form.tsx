import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/joy";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/joy/styles";
import { auth } from "../core/firebase";

const baseURL = import.meta.env.VITE_API_ORIGIN || "http://localhost:3000";

interface UsernameFormProps {
  currentUsername?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export const UsernameForm = ({
  currentUsername = "",
  onSuccess,
  onCancel,
  showCancel = false,
}: UsernameFormProps) => {
  const [username, setUsername] = useState(currentUsername);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const theme = useTheme();

  useEffect(() => {
    // Debounce username availability check
    if (!username || username === currentUsername) {
      setAvailable(null);
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setChecking(true);
      try {
        const response = await fetch(
          `${baseURL}/api/username/check?username=${encodeURIComponent(username)}`,
        );
        const data = await response.json();
        setAvailable(data.available);
      } catch (err) {
        console.error("Error checking username availability:", err);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, currentUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!username || username.length < 3 || username.length > 20) {
      setError("Username must be between 3 and 20 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError(
        "Username can only contain letters, numbers, underscores, and hyphens",
      );
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Not authenticated");
      }

      const idToken = await user.getIdToken();

      const response = await fetch(`${baseURL}/api/username/${user.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update username");
      }

      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getHelperText = () => {
    if (error) return error;
    if (success) return "Username updated successfully!";
    if (checking) return "Checking availability...";
    if (available === false && username !== currentUsername)
      return "Username already taken or contains inappropriate language";
    if (available === true) return "Username available!";
    return "3-20 characters, letters, numbers, underscores, and hyphens only";
  };

  const getHelperColor = () => {
    if (error) return theme.vars.palette.danger.plainColor;
    if (success) return theme.vars.palette.success.plainColor;
    if (available === false && username !== currentUsername)
      return theme.vars.palette.danger.plainColor;
    if (available === true) return theme.vars.palette.success.plainColor;
    return theme.vars.palette.text.secondary;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
            setSuccess(false);
          }}
          placeholder="Enter username"
          disabled={loading}
          error={
            !!error || (available === false && username !== currentUsername)
          }
          sx={{
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.background.level1,
            fontSize: "16px",
            maxWidth: "400px",
          }}
        />
        <FormHelperText sx={{ color: getHelperColor() }}>
          {getHelperText()}
        </FormHelperText>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          type="submit"
          loading={loading}
          disabled={
            !username ||
            username === currentUsername ||
            loading ||
            checking ||
            available === false
          }
        >
          {currentUsername ? "Update Username" : "Set Username"}
        </Button>
        {showCancel && onCancel && (
          <Button variant="outlined" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};
