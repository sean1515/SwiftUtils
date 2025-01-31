import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, Select, MenuItem, Button } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { diffLines } from 'diff';
import styled from 'styled-components';

type Language = 'plaintext' | 'javascript' | 'json' | 'html' | 'css';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextDiff: React.FC = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [leftLang, setLeftLang] = useState<Language>('plaintext');
  const [rightLang, setRightLang] = useState<Language>('plaintext');

  const calculateDiff = () => {
    const diff = diffLines(leftText, rightText);
    return diff.map((part, index) => {
      const color = part.added ? '#2da44e33' : part.removed ? '#cf222e33' : 'transparent';
      return (
        <Box key={index} sx={{ backgroundColor: color }}>
          <SyntaxHighlighter
            language={part.added ? rightLang : leftLang}
            style={vscDarkPlus}
            customStyle={{ margin: 0, backgroundColor: 'transparent' }}
          >
            {part.value}
          </SyntaxHighlighter>
        </Box>
      );
    });
  };

  const handleClear = () => {
    setLeftText('');
    setRightText('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Text Diff Comparison
      </Typography>

      <Stack spacing={3}>
        <Container>
          {/* Left Input */}
          <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
            <Stack spacing={2}>
              <Select
                value={leftLang}
                onChange={(e) => setLeftLang(e.target.value as Language)}
                size="small"
              >
                <MenuItem value="plaintext">Plain Text</MenuItem>
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="json">JSON</MenuItem>
                <MenuItem value="html">HTML</MenuItem>
                <MenuItem value="css">CSS</MenuItem>
              </Select>
              <TextField
                multiline
                rows={10}
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                placeholder="Enter original text..."
                fullWidth
              />
            </Stack>
          </Paper>

          {/* Right Input */}
          <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
            <Stack spacing={2}>
              <Select
                value={rightLang}
                onChange={(e) => setRightLang(e.target.value as Language)}
                size="small"
              >
                <MenuItem value="plaintext">Plain Text</MenuItem>
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="json">JSON</MenuItem>
                <MenuItem value="html">HTML</MenuItem>
                <MenuItem value="css">CSS</MenuItem>
              </Select>
              <TextField
                multiline
                rows={10}
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                placeholder="Enter modified text..."
                fullWidth
              />
            </Stack>
          </Paper>
        </Container>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleClear} disabled={!leftText && !rightText}>
            Clear
          </Button>
        </Box>

        {(leftText || rightText) && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Diff Result
            </Typography>
            <Box sx={{ textAlign: 'left' }}>{calculateDiff()}</Box>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default TextDiff;
