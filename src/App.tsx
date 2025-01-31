import './App.css';
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import OtherPage from './pages/OtherPage/OtherPage';
import { getTheme } from './theme';
import Base64Encoder from './components/Base64Encoder/Base64Encoder';
import MarkdownPreviewer from './components/MarkdownPreviewer/MarkdownPreviewer';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import ColorPicker from './components/ColorPicker/ColorPicker';
import AgeCalculator from './components/AgeCalculator/AgeCalculator';
import TextDiff from './components/TextDiff/TextDiff';
import LoremIpsumGenerator from './components/LoremIpsumGenerator/LoremIpsumGenerator';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import { config } from './config';
import UnitConverter from './components/UnitConverter/UnitConverter';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import URLEncoder from './components/URLEncoder/URLEncoder';
import RegexTester from './components/RegexTester/RegexTester';
import DiceRoller from './components/DiceRoller/DiceRoller';
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator';
import Base64Guide from './pages/Guides/Base64Guide';
import MarkdownGuide from './pages/Guides/MarkdownGuide';
import URLEncoderGuide from './pages/Guides/URLEncoderGuide';

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <title>SwiftUtils - Web Developer Tools</title>
          <meta
            name="description"
            content="Collection of useful web development tools including Base64 encoder, Markdown previewer, QR code generator, and more."
          />
          <meta
            name="keywords"
            content="web tools, developer tools, base64, markdown, qr code, color picker, text diff, regex tester"
          />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://your-domain.com/" />
          <meta property="og:title" content="SwiftUtils - Web Developer Tools" />
          <meta
            property="og:description"
            content="Collection of useful web development tools including Base64 encoder, Markdown previewer, QR code generator, and more."
          />
          <meta property="og:image" content="https://your-domain.com/og-image.jpg" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://your-domain.com/" />
          <meta property="twitter:title" content="SwiftUtils - Web Developer Tools" />
          <meta
            property="twitter:description"
            content="Collection of useful web development tools including Base64 encoder, Markdown previewer, QR code generator, and more."
          />
          <meta property="twitter:image" content="https://your-domain.com/og-image.jpg" />

          {/* Other important meta tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#008C8C" />
          <link rel="canonical" href="https://your-domain.com/" />
        </Helmet>

        <Router>
          <GoogleAnalytics measurementId={config.googleAnalytics.measurementId} />
          <Routes>
            <Route
              path="/"
              element={
                <Layout onToggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} />
              }
            >
              <Route index element={<HomePage />} />
              <Route path="other" element={<OtherPage />} />
              <Route path="base64" element={<Base64Encoder />} />
              <Route path="markdown" element={<MarkdownPreviewer />} />
              <Route path="qrcode" element={<QRCodeGenerator />} />
              <Route path="color-picker" element={<ColorPicker />} />
              <Route path="age-calculator" element={<AgeCalculator />} />
              <Route path="text-diff" element={<TextDiff />} />
              <Route path="words-generator" element={<LoremIpsumGenerator />} />
              <Route path="unit-converter" element={<UnitConverter />} />
              <Route path="pomodoro" element={<PomodoroTimer />} />
              <Route path="url-encoder" element={<URLEncoder />} />
              <Route path="regex-tester" element={<RegexTester />} />
              <Route path="dice-roller" element={<DiceRoller />} />
              <Route path="password-generator" element={<PasswordGenerator />} />
              <Route path="guides/base64" element={<Base64Guide />} />
              <Route path="guides/markdown" element={<MarkdownGuide />} />
              <Route path="guides/url-encoder" element={<URLEncoderGuide />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
