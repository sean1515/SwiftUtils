import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { trackInteraction } from '../../utils/analytics';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({
    global: true,
    caseInsensitive: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  });
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (pattern && testText) {
      try {
        const flagString = [
          flags.global ? 'g' : '',
          flags.caseInsensitive ? 'i' : '',
          flags.multiline ? 'm' : '',
          flags.dotAll ? 's' : '',
          flags.unicode ? 'u' : '',
          flags.sticky ? 'y' : '',
        ].join('');

        const regex = new RegExp(pattern, flagString);
        const matches = Array.from(testText.matchAll(regex), (match) => match[0]);
        setMatches(matches);
        setError('');
        
        trackInteraction('test_regex', 'RegexTester', {
          pattern_length: pattern.length,
          has_matches: matches.length > 0,
        });
      } catch (err) {
        setError((err as Error).message);
        setMatches([]);
        
        trackInteraction('regex_error', 'RegexTester', {
          error_message: (err as Error).message,
        });
      }
    } else {
      setMatches([]);
      setError('');
    }
  }, [pattern, testText, flags]);

  const handleCopyMatches = () => {
    navigator.clipboard.writeText(matches.join('\n'));
    trackInteraction('copy_matches', 'RegexTester');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Regex Tester
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Regular Expression
            </Typography>
            <TextField
              fullWidth
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              error={!!error}
              helperText={error}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.global}
                    onChange={(e) => setFlags({ ...flags, global: e.target.checked })}
                  />
                }
                label="Global (g)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.caseInsensitive}
                    onChange={(e) => setFlags({ ...flags, caseInsensitive: e.target.checked })}
                  />
                }
                label="Case Insensitive (i)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.multiline}
                    onChange={(e) => setFlags({ ...flags, multiline: e.target.checked })}
                  />
                }
                label="Multiline (m)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.dotAll}
                    onChange={(e) => setFlags({ ...flags, dotAll: e.target.checked })}
                  />
                }
                label="Dot All (s)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.unicode}
                    onChange={(e) => setFlags({ ...flags, unicode: e.target.checked })}
                  />
                }
                label="Unicode (u)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.sticky}
                    onChange={(e) => setFlags({ ...flags, sticky: e.target.checked })}
                  />
                }
                label="Sticky (y)"
              />
            </Box>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Test Text
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Enter text to test against..."
          />
        </Paper>

        {(matches.length > 0 || error) && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6">Matches</Typography>
              {matches.length > 0 && (
                <Tooltip title="Copy matches">
                  <IconButton onClick={handleCopyMatches} size="small">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            {matches.length > 0 ? (
              <>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Found {matches.length} match{matches.length !== 1 ? 'es' : ''}
                </Alert>
                <Box
                  sx={{
                    maxHeight: '200px',
                    overflow: 'auto',
                    bgcolor: 'background.default',
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  {matches.map((match, index) => (
                    <Typography key={index} sx={{ fontFamily: 'monospace' }}>
                      {index + 1}. {match}
                    </Typography>
                  ))}
                </Box>
              </>
            ) : (
              <Alert severity="info">No matches found</Alert>
            )}
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default RegexTester; 