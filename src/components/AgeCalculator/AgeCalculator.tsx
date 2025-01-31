import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, Button, Alert } from '@mui/material';

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<AgeResult | null>(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setError('Birth date cannot be in the future');
      setAge(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust for negative months or days
    if (days < 0) {
      months--;
      // Get days in the previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, birth.getDate());
      days += Math.floor((today.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24));
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
    setError('');
  };

  const handleClear = () => {
    setBirthDate('');
    setAge(null);
    setError('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Age Calculator
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Enter Birth Date
            </Typography>
            <TextField
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={calculateAge} disabled={!birthDate}>
                Calculate Age
              </Button>
              <Button variant="outlined" onClick={handleClear} disabled={!birthDate && !age}>
                Clear
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {error && <Alert severity="error">{error}</Alert>}

        {age && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Age Result
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body1">
                Years: <strong>{age.years}</strong>
              </Typography>
              <Typography variant="body1">
                Months: <strong>{age.months}</strong>
              </Typography>
              <Typography variant="body1">
                Days: <strong>{age.days}</strong>
              </Typography>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default AgeCalculator;
