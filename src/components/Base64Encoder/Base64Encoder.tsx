import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Base64Encoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      console.error(error);
      setOutput('Error: Invalid input for Base64 encoding');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Base64 Encoder
      </Typography>

      <Stack spacing={3}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Input
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode..."
          />
        </Paper>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleEncode} disabled={!input}>
            Encode
          </Button>
          <Button variant="outlined" onClick={handleClear} disabled={!input && !output}>
            Clear
          </Button>
        </Box>

        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6">Output</Typography>
            {output && (
              <IconButton onClick={handleCopy} size="small" title="Copy to clipboard">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={output}
            InputProps={{
              readOnly: true,
              sx: {
                pointerEvents: 'none',
              },
            }}
          />
        </Paper>
      </Stack>
    </Box>
  );
};

export default Base64Encoder;
