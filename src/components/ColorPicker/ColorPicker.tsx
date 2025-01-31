import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Stack,
  Tooltip,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#008C8C');
  const [showCopied, setShowCopied] = useState(false);

  const getRgb = useCallback(() => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }, [color]);

  const getHsl = useCallback(() => {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }, [color]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
  };

  const ColorValue = ({ label, value }: { label: string; value: string }) => (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">{label}:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            {value}
          </Typography>
          <Tooltip title="Copy to clipboard">
            <IconButton size="small" onClick={() => handleCopy(value)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Color Picker
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <TextField
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              fullWidth
              sx={{
                '& input': {
                  height: 100,
                  cursor: 'pointer',
                },
              }}
            />
          </Stack>
        </Paper>

        <ColorValue label="HEX" value={color.toUpperCase()} />
        <ColorValue label="RGB" value={getRgb()} />
        <ColorValue label="HSL" value={getHsl()} />
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

export default ColorPicker;
