import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import QrCodeIcon from '@mui/icons-material/QrCode';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CompareIcon from '@mui/icons-material/Compare';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ScaleIcon from '@mui/icons-material/Scale';
import TimerIcon from '@mui/icons-material/Timer';
import LinkIcon from '@mui/icons-material/Link';
import RegexIcon from '@mui/icons-material/Code';
import CasinoIcon from '@mui/icons-material/Casino';
import PasswordIcon from '@mui/icons-material/Password';
import useDebounce from '../../hooks/useDebounce';

const tools = [
  {
    name: 'Base64 Encoder',
    description: 'Convert text to and from Base64 encoding',
    path: '/base64',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    category: 'Encoding',
  },
  {
    name: 'Markdown Previewer',
    description: 'View and edit markdown text with live preview',
    path: '/markdown',
    icon: <TextFieldsIcon sx={{ fontSize: 40 }} />,
    category: 'Text',
  },
  {
    name: 'QR Code Generator',
    description: 'Create QR codes for links, text, and more',
    path: '/qrcode',
    icon: <QrCodeIcon sx={{ fontSize: 40 }} />,
    category: 'Tools',
  },
  {
    name: 'Color Picker',
    description: 'Select and convert colors between different formats',
    path: '/color-picker',
    icon: <ColorLensIcon sx={{ fontSize: 40 }} />,
    category: 'Design',
  },
  {
    name: 'Age Calculator',
    description: 'Calculate age or time between two dates',
    path: '/age-calculator',
    icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
    category: 'Tools',
  },
  {
    name: 'Text Diff',
    description: 'Compare two text inputs and highlight differences',
    path: '/text-diff',
    icon: <CompareIcon sx={{ fontSize: 40 }} />,
    category: 'Text',
  },
  {
    name: 'Words Generator',
    description: 'Generate random placeholder text (Lorem Ipsum)',
    path: '/words-generator',
    icon: <TextSnippetIcon sx={{ fontSize: 40 }} />,
    category: 'Text',
  },
  {
    name: 'Unit Converter',
    description: 'Easily convert between different measurement units',
    path: '/unit-converter',
    icon: <ScaleIcon sx={{ fontSize: 40 }} />,
    category: 'Tools',
  },
  {
    name: 'Pomodoro Timer',
    description: 'Stay focused with work and rest time intervals',
    path: '/pomodoro',
    icon: <TimerIcon sx={{ fontSize: 40 }} />,
    category: 'Productivity',
  },
  {
    name: 'URL Encoder',
    description: 'Encode or decode URLs for safe sharing',
    path: '/url-encoder',
    icon: <LinkIcon sx={{ fontSize: 40 }} />,
    category: 'Encoding',
  },
  {
    name: 'Regex Tester',
    description: 'Test and debug regular expressions in real time',
    path: '/regex-tester',
    icon: <RegexIcon sx={{ fontSize: 40 }} />,
    category: 'Development',
  },
  {
    name: 'Dice Roller',
    description: 'Roll virtual dice for games and decision-making',
    path: '/dice-roller',
    icon: <CasinoIcon sx={{ fontSize: 40 }} />,
    category: 'Tools',
  },
  {
    name: 'Password Generator',
    description: 'Create strong passwords with custom options',
    path: '/password-generator',
    icon: <PasswordIcon sx={{ fontSize: 40 }} />,
    category: 'Security',
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();
  const theme = useTheme();

  const categories = useMemo(
    () => ['All', ...new Set(tools.map((tool) => tool.category))].sort(),
    []
  );

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearchQuery, selectedCategory]);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          pt: 12,
          pb: 6,
          background:
            theme.palette.mode === 'dark'
              ? `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`
              : `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            SwiftUtils
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            A comprehensive collection of essential developer tools to streamline your workflow
          </Typography>

          {/* Search Section */}
          <Box sx={{ maxWidth: '600px', mx: 'auto', px: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Categories */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 4,
            justifyContent: 'center',
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
              sx={{
                px: 1,
                '&:hover': {
                  bgcolor:
                    selectedCategory === category
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.main, 0.1),
                },
              }}
            />
          ))}
        </Box>

        {/* Tools Grid */}
        <Grid container spacing={3}>
          {filteredTools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.path}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
                onClick={() => navigate(tool.path)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      {tool.icon}
                    </Box>
                    <Typography variant="h6" component="h2" align="center" sx={{ fontWeight: 600 }}>
                      {tool.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {tool.description}
                    </Typography>
                    <Chip
                      label={tool.category}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
