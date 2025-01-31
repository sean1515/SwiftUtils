import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Paper,
  MenuItem,
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CompareIcon from '@mui/icons-material/Compare';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ScaleIcon from '@mui/icons-material/Scale';
import TimerIcon from '@mui/icons-material/Timer';
import LinkIcon from '@mui/icons-material/Link';
import CasinoIcon from '@mui/icons-material/Casino';
import PasswordIcon from '@mui/icons-material/Password';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import TableChartIcon from '@mui/icons-material/TableChart';
import './Layout.scss';

interface LayoutProps {
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onToggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, setGuidesAnchor] = useState<null | HTMLElement>(null);
  const [, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [openGuides, setOpenGuides] = useState(false);
  const [openTools, setOpenTools] = useState(false);
  const [guidesHover, setGuidesHover] = useState(false);
  const [toolsHover, setToolsHover] = useState(false);
  const navigate = useNavigate();

  const guidesItems = [
    {
      text: 'Base64 Guide',
      path: '/guides/base64',
      icon: <CodeIcon sx={{ fontSize: 24 }} />,
    },
    {
      text: 'Markdown Guide',
      path: '/guides/markdown',
      icon: <TableChartIcon sx={{ fontSize: 24 }} />,
    },
    {
      text: 'URL Encoding Guide',
      path: '/guides/url-encoder',
      icon: <LinkIcon sx={{ fontSize: 24 }} />,
    },
  ];

  const toolsItems = [
    { text: 'Base64 Encoder', path: '/base64', icon: <CodeIcon sx={{ fontSize: 24 }} /> },
    {
      text: 'Markdown Previewer',
      path: '/markdown',
      icon: <TextFieldsIcon sx={{ fontSize: 24 }} />,
    },
    { text: 'QR Code', path: '/qrcode', icon: <QrCodeIcon sx={{ fontSize: 24 }} /> },
    { text: 'Color Picker', path: '/color-picker', icon: <ColorLensIcon sx={{ fontSize: 24 }} /> },
    {
      text: 'Age Calculator',
      path: '/age-calculator',
      icon: <CalendarMonthIcon sx={{ fontSize: 24 }} />,
    },
    { text: 'Text Diff', path: '/text-diff', icon: <CompareIcon sx={{ fontSize: 24 }} /> },
    {
      text: 'Words Generator',
      path: '/words-generator',
      icon: <TextSnippetIcon sx={{ fontSize: 24 }} />,
    },
    { text: 'Unit Converter', path: '/unit-converter', icon: <ScaleIcon sx={{ fontSize: 24 }} /> },
    { text: 'Pomodoro Timer', path: '/pomodoro', icon: <TimerIcon sx={{ fontSize: 24 }} /> },
    { text: 'URL Encoder', path: '/url-encoder', icon: <LinkIcon sx={{ fontSize: 24 }} /> },
    { text: 'Regex Tester', path: '/regex-tester', icon: <CodeIcon sx={{ fontSize: 24 }} /> },
    { text: 'Dice Roller', path: '/dice-roller', icon: <CasinoIcon sx={{ fontSize: 24 }} /> },
    {
      text: 'Password Generator',
      path: '/password-generator',
      icon: <PasswordIcon sx={{ fontSize: 24 }} />,
    },
  ];

  const handleGuidesHover = (isHovering: boolean) => {
    setGuidesHover(isHovering);
  };

  const handleToolsHover = (isHovering: boolean) => {
    setToolsHover(isHovering);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setGuidesAnchor(null);
    setToolsAnchor(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box className="layout" sx={{ bgcolor: 'background.default' }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? '#2a2c38' : '#008C8C',
          boxShadow: 1,
          color: '#ffffff',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Link
              to="/"
              className="layoutHeaderLink"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                padding: '4px 8px',
                borderRadius: '4px',
                background:
                  'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              ⚡ SwiftUtils
            </Link>
          </Typography>

          {!isMobile && (
            <>
              <Box
                onMouseEnter={() => handleGuidesHover(true)}
                onMouseLeave={() => handleGuidesHover(false)}
                sx={{ position: 'relative' }}
              >
                <Button
                  color="inherit"
                  sx={{
                    mx: 1,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      bottom: 6,
                      left: 0,
                      backgroundColor: '#fff',
                      transform: guidesHover ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  Guides
                </Button>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 1000,
                    minWidth: '200px',
                    visibility: guidesHover ? 'visible' : 'hidden',
                    opacity: guidesHover ? 1 : 0,
                    transform: guidesHover ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      mt: 1,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      bgcolor: theme.palette.mode === 'dark' ? '#1a1b23' : '#ffffff',
                    }}
                  >
                    {guidesItems.map((item) => (
                      <MenuItem
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                          '&:hover': {
                            bgcolor:
                              theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.08)'
                                : 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        {React.cloneElement(item.icon, {
                          sx: {
                            fontSize: 20,
                            color: theme.palette.mode === 'dark' ? '#ffffff80' : '#00000080',
                          },
                        })}
                        <Typography variant="body2">{item.text}</Typography>
                      </MenuItem>
                    ))}
                  </Paper>
                </Box>
              </Box>

              <Box
                onMouseEnter={() => handleToolsHover(true)}
                onMouseLeave={() => handleToolsHover(false)}
                sx={{ position: 'relative' }}
              >
                <Button
                  color="inherit"
                  sx={{
                    mx: 1,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      bottom: 6,
                      left: 0,
                      backgroundColor: '#fff',
                      transform: toolsHover ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  Tools
                </Button>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    zIndex: 1000,
                    minWidth: '200px',
                    visibility: toolsHover ? 'visible' : 'hidden',
                    opacity: toolsHover ? 1 : 0,
                    transform: toolsHover ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      mt: 1,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      bgcolor: theme.palette.mode === 'dark' ? '#1a1b23' : '#ffffff',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      maxWidth: '300px',
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: theme.palette.mode === 'dark' ? '#ffffff40' : '#00000040',
                        borderRadius: '3px',
                      },
                    }}
                  >
                    {toolsItems.map((item) => (
                      <MenuItem
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                          '&:hover': {
                            bgcolor:
                              theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.08)'
                                : 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        {React.cloneElement(item.icon, {
                          sx: {
                            fontSize: 20,
                            color: theme.palette.mode === 'dark' ? '#ffffff80' : '#00000080',
                          },
                        })}
                        <Typography variant="body2">{item.text}</Typography>
                      </MenuItem>
                    ))}
                  </Paper>
                </Box>
              </Box>
            </>
          )}

          <IconButton onClick={onToggleTheme} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: theme.palette.mode === 'dark' ? '#1a1b23' : '#ffffff',
            borderRight: 'none',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
            overflowX: 'hidden',
          },
        }}
      >
        <List sx={{ px: 2, py: 1, height: '100%', overflowY: 'auto' }}>
          <ListItemButton
            onClick={() => setOpenTools(!openTools)}
            sx={{
              borderRadius: '8px',
              mb: 1,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText
              primary="Tools"
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 600,
                  fontSize: '0.95rem',
                },
              }}
            />
            {openTools ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTools} timeout="auto" unmountOnExit>
            {toolsItems.map((item) => (
              <ListItem
                component="div"
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  borderRadius: '8px',
                  mb: 0.5,
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: 20,
                      color: theme.palette.mode === 'dark' ? '#ffffff80' : '#00000080',
                    },
                  })}
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.9rem',
                      },
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </Collapse>

          <ListItemButton
            onClick={() => setOpenGuides(!openGuides)}
            sx={{
              borderRadius: '8px',
              mb: 1,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText
              primary="Guides"
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 600,
                  fontSize: '0.95rem',
                },
              }}
            />
            {openGuides ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openGuides} timeout="auto" unmountOnExit>
            {guidesItems.map((item) => (
              <ListItem
                component="div"
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  borderRadius: '8px',
                  mb: 0.5,
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: 20,
                      color: theme.palette.mode === 'dark' ? '#ffffff80' : '#00000080',
                    },
                  })}
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.9rem',
                      },
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </Collapse>
        </List>
      </Drawer>

      <Container
        maxWidth={false}
        className="layoutContainer"
        sx={{ bgcolor: 'background.default' }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
