import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Stack,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');

  // Add debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        QR Code Generator
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL to generate QR code..."
          />
        </Paper>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={size}
              label="Size"
              onChange={(e) => setSize(Number(e.target.value))}
              sx={{ width: 125 }}
            >
              <MenuItem value={128}>128x128</MenuItem>
              <MenuItem value={256}>256x256</MenuItem>
              <MenuItem value={512}>512x512</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Background Color"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            sx={{ width: 125 }}
          />
          <TextField
            label="Foreground Color"
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            sx={{ width: 125 }}
          />
        </Stack>

        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6">QR Code</Typography>
            {debouncedText && (
              <IconButton onClick={handleDownload} size="small" title="Download QR Code">
                <DownloadIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            {debouncedText ? (
              <QRCodeCanvas
                value={debouncedText}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={true}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Enter text above to generate QR code
              </Typography>
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default QRCodeGenerator;
