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
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const URLEncoderGuide: React.FC = () => {
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
          fontSize: { xs: '1.25rem', md: '1.75rem' },
        },
        '& .MuiTableCell-root': {
          px: { xs: 1, md: 2 },
          py: { xs: 1, md: 1.5 },
          fontSize: { xs: '0.75rem', md: '0.875rem' },
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
          gap: { xs: 1, md: 2 },
          fontSize: { xs: '1.5rem', md: '2.2rem' },
          flexDirection: { xs: 'column', md: 'row' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <LinkIcon fontSize="large" />
        URL Encoding Guide
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Table of Contents
        </Typography>
        <List dense>
          {['What is URL Encoding?', 'Reserved Characters', 'Examples', 'Specifications'].map(
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

      <section id="what-is-url-encoding">
        <Typography variant="h4" component="h2" gutterBottom>
          What is URL Encoding?
        </Typography>
        <Typography paragraph>
          URL encoding, also known as percent-encoding, converts characters into a format that can
          be transmitted safely over the Internet. URLs can only be sent over the Internet using the
          ASCII character-set, which means special characters, spaces, and non-ASCII characters need
          to be encoded.
        </Typography>
        <Typography paragraph>
          When you encode a character, it's replaced with a percent sign (%) followed by two
          hexadecimal digits that represent the character's ASCII/UTF-8 code. This ensures that URLs
          remain valid and can be properly interpreted by web browsers and servers.
        </Typography>
        <Typography paragraph>URL encoding is essential for:</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {[
            'Pass special characters in URLs',
            'Encode form data',
            'Handle non-ASCII characters',
            'Prevent injection attacks',
          ].map((use) => (
            <Chip key={use} label={use} variant="outlined" />
          ))}
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="reserved-characters">
        <Typography variant="h4" component="h2" gutterBottom>
          Reserved Characters
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ mb: 4, minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell>Character</TableCell>
                <TableCell>Encoded</TableCell>
                <TableCell>Purpose</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['Space', '%20', 'Separating values'],
                ['!', '%21', 'Special character'],
                ['#', '%23', 'Fragment identifier'],
                ['$', '%24', 'Resource identifier'],
                ['&', '%26', 'Parameter separator'],
                ['+', '%2B', 'Space replacement in queries'],
                ['=', '%3D', 'Key-value separator'],
                ['?', '%3F', 'Query string marker'],
                ['@', '%40', 'User info separator'],
              ].map(([char, encoded, purpose]) => (
                <TableRow key={char as string}>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{char}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{encoded}</TableCell>
                  <TableCell>{purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="examples">
        <Typography variant="h4" component="h2" gutterBottom>
          Examples
        </Typography>
        <Typography paragraph>
          Here are some common URL encoding scenarios you might encounter:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[
            {
              title: 'Search Query with Special Characters',
              original: 'https://example.com/search?q=C++ Programming & Tips',
              encoded: 'https://example.com/search?q=C%2B%2B%20Programming%20%26%20Tips',
            },
            {
              title: 'Path with International Characters',
              original: 'https://example.com/café/münchen',
              encoded: 'https://example.com/caf%C3%A9/m%C3%BCnchen',
            },
            {
              title: 'Email in URL',
              original: 'https://example.com/user?email=user@example.com',
              encoded: 'https://example.com/user?email=user%40example.com',
            },
            {
              title: 'Complex Query Parameters',
              original: 'https://example.com/filter?range=100-200&tags=[new,hot]',
              encoded: 'https://example.com/filter?range=100-200&tags=%5Bnew%2Chot%5D',
            },
          ].map((example, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  color: 'primary.main',
                }}
              >
                {example.title}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 2,
                  '& > div': {
                    p: 2,
                    borderRadius: 1,
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      left: 10,
                      bgcolor: 'background.paper',
                      px: 1,
                      color: 'text.secondary',
                    }}
                  >
                    Original URL
                  </Typography>
                  {example.original}
                </Box>
                <Box
                  sx={{
                    bgcolor: 'action.hover',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      left: 10,
                      bgcolor: 'background.paper',
                      px: 1,
                      color: 'text.secondary',
                    }}
                  >
                    Encoded URL
                  </Typography>
                  {example.encoded}
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="specifications">
        <Typography variant="h4" component="h2" gutterBottom>
          Specifications
        </Typography>
        <List>
          <ListItem>
            <Link
              href="https://datatracker.ietf.org/doc/html/rfc3986"
              target="_blank"
              rel="noopener"
            >
              RFC 3986 - URI Generic Syntax
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.w3schools.com/tags/ref_urlencode.ASP"
              target="_blank"
              rel="noopener"
            >
              W3Schools URL Encoding Reference
            </Link>
          </ListItem>
        </List>
      </section>
    </Box>
  );
};

export default URLEncoderGuide;
