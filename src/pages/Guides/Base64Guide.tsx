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
        p: { xs: 1, sm: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
        '& section': {
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
        },
        '& h4': {
          fontWeight: 600,
          mt: 3,
          mb: 2,
          color: 'primary.main',
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
        },
        '& h5': {
          fontWeight: 500,
          mt: 2,
          mb: 1.5,
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
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
          gap: { xs: 1, sm: 2 },
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <CodeIcon fontSize="large" />
        Base64 Encoding Guide
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Table of Contents
        </Typography>
        <List
          dense
          sx={{
            '& .MuiListItem-root': {
              px: { xs: 1, sm: 2 },
            },
          }}
        >
          {[
            'What is Base64?',
            'How It Works',
            'Common Uses',
            'Advantages & Disadvantages',
            'Examples',
            'Implementation',
            'Specifications',
          ].map((item) => (
            <ListItem key={item} sx={{ py: 0.5 }}>
              <Link href={`#${item.replace(/\s+/g, '-').toLowerCase()}`} color="inherit">
                <ListItemText primary={item} />
              </Link>
            </ListItem>
          ))}
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

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

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
            p: { xs: 1.5, sm: 2 },
            my: { xs: 1, sm: 2 },
            bgcolor: 'action.hover',
            borderRadius: 1,
            overflowX: 'auto',
            maxWidth: '100%',
            '& code': {
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              whiteSpace: 'pre',
              display: 'block',
              width: '100%',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '4px',
              },
            },
          }}
        >
          <code>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/</code>
        </Paper>
      </section>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <section id="common-uses">
        <Typography variant="h4" component="h2" gutterBottom>
          Common Applications
        </Typography>
        <Typography paragraph>
          Base64 encoding is widely used in various scenarios where binary data needs to be
          transmitted through text-based channels. Here are some common applications:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Data URIs in Web Development"
              secondary="Embedding images, fonts, or other binary assets directly in HTML/CSS using the data URI scheme"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Email Attachments"
              secondary="MIME encoding for sending binary files through email systems that only support ASCII characters"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="API Communication"
              secondary="Transferring binary data in JSON payloads or other text-based protocols"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Digital Signatures"
              secondary="Encoding binary cryptographic signatures in a text-safe format"
            />
          </ListItem>
        </List>

        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              mx: { xs: -1, sm: 0 },
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
              <Chip
                key={use}
                label={use}
                variant="outlined"
                sx={{
                  m: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  height: { xs: 24, sm: 32 },
                }}
              />
            ))}
          </Box>
        </Box>
      </section>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <section id="advantages-disadvantages">
        <Typography variant="h4" component="h2" gutterBottom>
          Advantages & Disadvantages
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Advantages
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Text-Safe Transmission"
              secondary="Ensures binary data can be safely transmitted through text-based protocols without corruption"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Universal Support"
              secondary="Widely supported across different platforms and programming languages"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="URL Safety"
              secondary="Can be made URL-safe with minor modifications (using '-' and '_' instead of '+' and '/')"
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" sx={{ mt: 3 }} gutterBottom>
          Disadvantages
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Increased Size"
              secondary="Encoded data is about 33% larger than the original binary data"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Processing Overhead"
              secondary="Requires encoding and decoding steps, which consume CPU resources"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Not Encryption"
              secondary="Does not provide security or encryption, just encoding"
            />
          </ListItem>
        </List>
      </section>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <section id="examples">
        <Typography variant="h4" component="h2" gutterBottom>
          Encoding Examples
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
          gap={2}
        >
          <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" gutterBottom>
              Simple String
            </Typography>
            <Box
              component="div"
              fontFamily="monospace"
              sx={{
                fontSize: { xs: 12, sm: 14 },
                wordBreak: 'break-all',
                '& div': {
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                  py: 0.5,
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
              sx={{
                fontSize: { xs: 12, sm: 14 },
                wordBreak: 'break-all',
                '& div': {
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                  py: 0.5,
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

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <section id="implementation">
        <Typography variant="h4" component="h2" gutterBottom>
          Implementation
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          JavaScript/TypeScript Example
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
              display: 'block',
              whiteSpace: 'pre',
              overflowX: 'auto',
              maxWidth: '100%',
            },
          }}
        >
          <code>{`// Encoding
const text = 'Hello, World!';
const encoded = btoa(text);
console.log(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Decoding
const decoded = atob(encoded);
console.log(decoded); // "Hello, World!"

// Handling Unicode
const unicodeText = '👋 Hello';
const encodedUnicode = btoa(unescape(encodeURIComponent(unicodeText)));
const decodedUnicode = decodeURIComponent(escape(atob(encodedUnicode)));`}</code>
        </Paper>

        <Typography variant="h5" component="h3" sx={{ mt: 3 }} gutterBottom>
          Common Pitfalls
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Unicode Handling"
              secondary="Basic Base64 encoding doesn't handle Unicode characters directly. Use encodeURIComponent/decodeURIComponent for Unicode support."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Line Length"
              secondary="Some implementations wrap Base64 output at 76 characters. Consider line breaks when processing encoded data."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Padding Characters"
              secondary="The '=' padding at the end is required for proper decoding. Don't remove it unless your implementation specifically handles unpadded Base64."
            />
          </ListItem>
        </List>
      </section>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

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
