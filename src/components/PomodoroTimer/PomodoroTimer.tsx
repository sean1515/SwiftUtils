import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { trackInteraction } from '../../utils/analytics';

type TimerMode = 'work' | 'break';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    pomodorosUntilLongBreak: 4,
  });
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    const notification = new Audio('/notification.mp3'); // You'll need to add this audio file
    notification.play().catch(() => console.log('Audio playback failed'));

    if (mode === 'work') {
      const newPomodorosCompleted = pomodorosCompleted + 1;
      setPomodorosCompleted(newPomodorosCompleted);
      
      if (newPomodorosCompleted % settings.pomodorosUntilLongBreak === 0) {
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setTimeLeft(settings.breakDuration * 60);
      }
      setMode('break');
    } else {
      setTimeLeft(settings.workDuration * 60);
      setMode('work');
    }
    
    setIsRunning(false);
    trackInteraction('timer_complete', 'PomodoroTimer', { mode });
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    trackInteraction('timer_toggle', 'PomodoroTimer', { action: isRunning ? 'pause' : 'play' });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.workDuration * 60);
    setMode('work');
    setPomodorosCompleted(0);
    trackInteraction('timer_reset', 'PomodoroTimer');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60)) * 100;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pomodoro Timer
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
            <CircularProgress
              variant="determinate"
              value={100 - progress}
              size={200}
              thickness={4}
              sx={{
                color: mode === 'work' ? 'primary.main' : 'success.main',
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" component="div">
                {formatTime(timeLeft)}
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
            <IconButton onClick={toggleTimer} color="primary" size="large">
              {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={resetTimer} color="primary" size="large">
              <RestartAltIcon />
            </IconButton>
            <IconButton onClick={() => setShowSettings(!showSettings)} color="primary" size="large">
              <SettingsIcon />
            </IconButton>
          </Stack>

          <Typography variant="h6" color="text.secondary">
            {mode === 'work' ? 'Work Time' : 'Break Time'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pomodoros completed: {pomodorosCompleted}
          </Typography>
        </Paper>

        {showSettings && (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Work Duration (minutes)"
                type="number"
                value={settings.workDuration}
                onChange={(e) =>
                  setSettings({ ...settings, workDuration: Math.max(1, parseInt(e.target.value) || 1) })
                }
                fullWidth
              />
              <TextField
                label="Break Duration (minutes)"
                type="number"
                value={settings.breakDuration}
                onChange={(e) =>
                  setSettings({ ...settings, breakDuration: Math.max(1, parseInt(e.target.value) || 1) })
                }
                fullWidth
              />
              <TextField
                label="Long Break Duration (minutes)"
                type="number"
                value={settings.longBreakDuration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    longBreakDuration: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                fullWidth
              />
              <TextField
                label="Pomodoros until Long Break"
                type="number"
                value={settings.pomodorosUntilLongBreak}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    pomodorosUntilLongBreak: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                fullWidth
              />
            </Stack>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default PomodoroTimer; 