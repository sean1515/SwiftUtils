import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { trackInteraction, trackError } from '../../utils/analytics';

const MarkdownPreviewer: React.FC = () => {
  const [markdownText, setMarkdownText] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClear = () => {
    setMarkdownText('');
    trackInteraction('clear', 'MarkdownPreviewer');
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setMarkdownText(e.target.value);
      if (e.target.value.length > 0) {
        trackInteraction('input', 'MarkdownPreviewer', {
          content_length: e.target.value.length,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      trackError('Failed to update markdown text', 'MARKDOWN_UPDATE_ERROR', 'MarkdownPreviewer');
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        height: isMobile ? 'auto' : '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Markdown Previewer
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 3,
          flex: isMobile ? 'none' : 1,
          minHeight: 0,
          overflow: 'hidden',
          pb: isMobile ? 3 : 0,
        }}
      >
        {/* Input Section */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: isMobile ? '400px' : 'auto',
            maxHeight: isMobile ? '400px' : 'auto',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Markdown Input
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={isMobile ? 15 : undefined}
            value={markdownText}
            onChange={handleMarkdownChange}
            placeholder="Enter markdown text here..."
            sx={{
              flex: 1,
              display: 'flex',
              height: 'calc(100% - 48px)',
              '& .MuiInputBase-root': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              },
              '& .MuiInputBase-input': {
                flex: 1,
                overflow: 'auto !important',
                resize: 'none',
              },
            }}
          />
        </Paper>

        {/* Buttons - Shown between sections */}
        <Stack
          direction={isMobile ? 'row' : 'column'}
          spacing={2}
          sx={{
            justifyContent: 'center',
            py: isMobile ? 2 : 0,
            px: isMobile ? 0 : 2,
          }}
        >
          <Button variant="outlined" onClick={handleClear} disabled={!markdownText}>
            Clear
          </Button>
        </Stack>

        {/* Preview Section */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            flex: 1,
            minHeight: isMobile ? '400px' : 'auto',
            overflow: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>
          <Box
            sx={{
              textAlign: 'left',
              p: 2,
              height: 'calc(100% - 48px)',
              overflow: 'auto',
              '& img': {
                maxWidth: '100%',
                height: 'auto',
              },
            }}
          >
            <ReactMarkdown>{markdownText}</ReactMarkdown>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MarkdownPreviewer;
