import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  IconButton,
  TextField,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { trackInteraction } from '../../utils/analytics';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [showCopied, setShowCopied] = useState(false);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase) chars += uppercaseChars;
    if (options.lowercase) chars += lowercaseChars;
    if (options.numbers) chars += numberChars;
    if (options.symbols) chars += symbolChars;

    if (!chars) {
      setPassword('Please select at least one option');
      return;
    }

    let generatedPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += chars[array[i] % chars.length];
    }

    setPassword(generatedPassword);
    trackInteraction('generate_password', 'PasswordGenerator', {
      length,
      options: JSON.stringify(options),
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setShowCopied(true);
    trackInteraction('copy_password', 'PasswordGenerator');
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions((prev) => {
      const newOptions = { ...prev, [option]: !prev[option] };
      // Prevent all options from being unchecked
      if (!Object.values(newOptions).includes(true)) {
        return prev;
      }
      return newOptions;
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Password Generator
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Password Length: {length}
            </Typography>
            <Slider
              value={length}
              onChange={(_, value) => setLength(value as number)}
              min={8}
              max={32}
              marks={[
                { value: 8, label: '8' },
                { value: 16, label: '16' },
                { value: 24, label: '24' },
                { value: 32, label: '32' },
              ]}
              valueLabelDisplay="auto"
            />

            <Typography variant="h6" gutterBottom>
              Character Types
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.uppercase}
                    onChange={() => handleOptionChange('uppercase')}
                  />
                }
                label="Uppercase (A-Z)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.lowercase}
                    onChange={() => handleOptionChange('lowercase')}
                  />
                }
                label="Lowercase (a-z)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.numbers}
                    onChange={() => handleOptionChange('numbers')}
                  />
                }
                label="Numbers (0-9)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.symbols}
                    onChange={() => handleOptionChange('symbols')}
                  />
                }
                label="Symbols (!@#$%^&*)"
              />
            </Stack>

            <Button variant="contained" onClick={generatePassword} sx={{ mt: 2 }}>
              Generate Password
            </Button>
          </Stack>
        </Paper>

        {password && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6">Generated Password</Typography>
              <IconButton onClick={handleCopy} size="small" title="Copy to clipboard">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              value={password}
              InputProps={{
                readOnly: true,
                sx: { fontFamily: 'monospace' },
              }}
            />
          </Paper>
        )}
      </Stack>

      <Snackbar
        open={showCopied}
        autoHideDuration={2000}
        onClose={() => setShowCopied(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
};

export default PasswordGenerator; 