import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const Base64Guide: React.FC = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
        '& h4': {
          fontWeight: 600,
          mt: 4,
          mb: 2,
          color: 'primary.main',
          fontSize: { xs: '1.5rem', md: '1.75rem' },
        },
        '& h5': {
          fontWeight: 500,
          mt: 3,
          mb: 1.5,
        },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          flexDirection: { xs: 'column', md: 'row' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <CodeIcon fontSize="large" />
        Base64 Encoding Guide
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Table of Contents
        </Typography>
        <List dense>
          {['What is Base64?', 'How It Works', 'Common Uses', 'Examples', 'Specifications'].map(
            (item) => (
              <ListItem key={item} sx={{ py: 0.5 }}>
                <Link href={`#${item.replace(/\s+/g, '-').toLowerCase()}`} color="inherit">
                  <ListItemText primary={item} />
                </Link>
              </ListItem>
            )
          )}
        </List>
      </Paper>

      <section id="what-is-base64">
        <Typography variant="h4" component="h2" gutterBottom>
          What is Base64?
        </Typography>
        <Typography paragraph>
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string
          format by translating it into a radix-64 representation. This encoding is crucial for
          handling binary data in text-based systems and protocols.
        </Typography>
        <Typography paragraph>
          The encoding process takes binary data and converts it into a set of 64 different
          printable characters that can be safely transmitted over text-based protocols. These
          characters include A-Z, a-z, 0-9, and typically '+' and '/' (with '=' used for padding).
        </Typography>
        <Typography paragraph>
          Base64 encoding increases the data size by approximately 33% (as 3 bytes of binary data
          become 4 bytes of Base64-encoded data), but this trade-off is necessary to ensure reliable
          data transmission across different systems and protocols.
        </Typography>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="how-it-works">
        <Typography variant="h4" component="h2" gutterBottom>
          How Base64 Works
        </Typography>

        <Typography variant="h5" component="h3">
          Encoding Process
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="1. Input Segmentation"
              secondary="Divide the input bytes into groups of 3 bytes (24 bits)"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. Bit Splitting"
              secondary="Split these 24 bits into four 6-bit chunks"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3. Character Mapping"
              secondary="Map each 6-bit value to the Base64 alphabet"
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" sx={{ mt: 3 }}>
          Base64 Alphabet
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            my: 2,
            bgcolor: 'action.hover',
            borderRadius: 1,
            overflowX: 'auto',
            '& code': {
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              display: 'block',
            },
          }}
        >
          <code>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/</code>
        </Paper>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="common-uses">
        <Typography variant="h4" component="h2" gutterBottom>
          Common Applications
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, md: 2 },
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            'Embedding images in HTML/CSS',
            'JSON/XML data transfer',
            'URL-safe data storage',
            'Basic data obfuscation',
            'Email attachments',
            'Cryptographic digests',
          ].map((use) => (
            <Chip key={use} label={use} variant="outlined" />
          ))}
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="examples">
        <Typography variant="h4" component="h2" gutterBottom>
          Encoding Examples
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
          gap={3}
        >
          <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" gutterBottom>
              Simple String
            </Typography>
            <Box
              component="div"
              fontFamily="monospace"
              fontSize={14}
              sx={{
                wordBreak: 'break-all',
                '& div': {
                  overflowWrap: 'break-word',
                },
              }}
            >
              <div>
                <strong>Input:</strong> "Hello"
              </div>
              <div>
                <strong>Output:</strong> "SGVsbG8="
              </div>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" gutterBottom>
              Special Characters
            </Typography>
            <Box
              component="div"
              fontFamily="monospace"
              fontSize={14}
              sx={{
                wordBreak: 'break-all',
                '& div': {
                  overflowWrap: 'break-word',
                },
              }}
            >
              <div>
                <strong>Input:</strong> "😊✅"
              </div>
              <div>
                <strong>Output:</strong> "8J+YivCdlZE="
              </div>
            </Box>
          </Paper>
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="specifications">
        <Typography variant="h4" component="h2" gutterBottom>
          Technical Specifications
        </Typography>
        <Typography paragraph>The Base64 encoding is defined in several RFC documents:</Typography>
        <List>
          <ListItem>
            <Link href="https://tools.ietf.org/html/rfc4648" target="_blank" rel="noopener">
              RFC 4648 - The Base16, Base32, and Base64 Data Encodings
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://tools.ietf.org/html/rfc2045" target="_blank" rel="noopener">
              RFC 2045 - MIME Part One: Format of Internet Message Bodies
            </Link>
          </ListItem>
        </List>
      </section>
    </Box>
  );
};

export default Base64Guide;
