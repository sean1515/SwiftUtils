import React, { useState } from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { trackInteraction } from '../../utils/analytics';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const MAX_WORDS = 10000;

const LoremIpsumGenerator: React.FC = () => {
  const [wordCount, setWordCount] = useState<string>('50');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [showCopied, setShowCopied] = useState(false);

  const handleGenerate = () => {
    const count = Math.min(parseInt(wordCount) || 0, MAX_WORDS);
    setGeneratedText(lorem.generateWords(count));
    trackInteraction('generate', 'LoremIpsumGenerator', {
      word_count: count,
    });
  };

  const handleClear = () => {
    setGeneratedText('');
    setWordCount('50');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setShowCopied(true);
    trackInteraction('copy', 'LoremIpsumGenerator', {
      text_length: generatedText.length,
    });
  };

  const handleWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setWordCount(value);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Words Generator
      </Typography>

      <Stack spacing={3}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Number of Words
            </Typography>
            <TextField
              type="text"
              value={wordCount}
              onChange={handleWordCountChange}
              fullWidth
              helperText={`Maximum ${MAX_WORDS} words`}
              error={parseInt(wordCount) > MAX_WORDS}
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={!wordCount || parseInt(wordCount) <= 0 || parseInt(wordCount) > MAX_WORDS}
                sx={{ '&:focus': { outline: 'none' } }}
              >
                Generate
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                disabled={!generatedText && wordCount === '50'}
                sx={{ '&:focus': { outline: 'none' } }}
              >
                Clear
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {generatedText && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6">Generated Text</Typography>
              <IconButton
                onClick={handleCopy}
                size="small"
                title="Copy to clipboard"
                sx={{ '&:focus': { outline: 'none' } }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={generatedText}
              InputProps={{
                readOnly: true,
              }}
              sx={{ pointerEvents: 'none' }}
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

export default LoremIpsumGenerator;
