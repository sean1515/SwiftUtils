import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  IconButton,
  TextField,
  Grid,
  Tooltip,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import DeleteIcon from '@mui/icons-material/Delete';
import { trackInteraction } from '../../utils/analytics';

interface DiceRoll {
  id: number;
  sides: number;
  result: number;
  timestamp: number;
}

const DiceRoller: React.FC = () => {
  const [customSides, setCustomSides] = useState('');
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const [lastRollId, setLastRollId] = useState(0);

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    const newRoll: DiceRoll = {
      id: lastRollId + 1,
      sides,
      result,
      timestamp: Date.now(),
    };
    
    setLastRollId(lastRollId + 1);
    setRollHistory((prev) => [newRoll, ...prev].slice(0, 10)); // Keep last 10 rolls
    
    trackInteraction('roll_dice', 'DiceRoller', {
      sides,
      result,
    });
  };

  const handleCustomRoll = () => {
    const sides = parseInt(customSides);
    if (sides > 0) {
      rollDice(sides);
      setCustomSides('');
    }
  };

  const clearHistory = () => {
    setRollHistory([]);
    trackInteraction('clear_history', 'DiceRoller');
  };

  const commonDice = [4, 6, 8, 10, 12, 20, 100];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dice Roller
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Common Dice
          </Typography>
          <Grid container spacing={2}>
            {commonDice.map((sides) => (
              <Grid item key={sides}>
                <Button
                  variant="contained"
                  onClick={() => rollDice(sides)}
                  startIcon={<CasinoIcon />}
                  sx={{ minWidth: '100px' }}
                >
                  d{sides}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Custom Dice
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Number of Sides"
                type="number"
                value={customSides}
                onChange={(e) => setCustomSides(e.target.value)}
                inputProps={{ min: 1 }}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleCustomRoll}
                disabled={!customSides || parseInt(customSides) < 1}
                startIcon={<CasinoIcon />}
              >
                Roll
              </Button>
            </Box>
          </Stack>
        </Paper>

        {rollHistory.length > 0 && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6">Roll History</Typography>
              <Tooltip title="Clear History">
                <IconButton onClick={clearHistory} size="small">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Stack spacing={1}>
              {rollHistory.map((roll) => (
                <Paper
                  key={roll.id}
                  elevation={1}
                  sx={{
                    p: 1,
                    bgcolor: 'background.default',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>
                    d{roll.sides}: <strong>{roll.result}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(roll.timestamp).toLocaleTimeString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default DiceRoller; 