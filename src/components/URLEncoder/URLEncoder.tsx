import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  IconButton,
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { trackInteraction } from '../../utils/analytics';

const URLEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [showCopied, setShowCopied] = useState(false);

  const handleProcess = () => {
    try {
      const result = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
      setOutput(result);
      trackInteraction(mode, 'URLEncoder', {
        success: true,
        input_length: input.length,
      });
    } catch (error) {
      setOutput('Error: Invalid input');
      trackInteraction('error', 'URLEncoder', {
        error_message: 'Invalid input',
        mode,
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    trackInteraction('clear', 'URLEncoder');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setShowCopied(true);
    trackInteraction('copy', 'URLEncoder');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        URL Encoder/Decoder
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, newMode) => newMode && setMode(newMode)}
              aria-label="text mode"
              sx={{ alignSelf: 'center' }}
            >
              <ToggleButton value="encode" aria-label="encode">
                Encode
              </ToggleButton>
              <ToggleButton value="decode" aria-label="decode">
                Decode
              </ToggleButton>
            </ToggleButtonGroup>

            <TextField
              multiline
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter text to ${mode}...`}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleProcess}
                disabled={!input}
                sx={{ minWidth: 100 }}
              >
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                disabled={!input && !output}
                sx={{ minWidth: 100 }}
              >
                Clear
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {output && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6">Output</Typography>
              <IconButton onClick={handleCopy} size="small" title="Copy to clipboard">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
            <TextField
              multiline
              rows={4}
              value={output}
              fullWidth
              InputProps={{
                readOnly: true,
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

export default URLEncoder; 