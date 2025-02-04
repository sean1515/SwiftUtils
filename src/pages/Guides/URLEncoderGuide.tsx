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
          URL encoding, also known as percent-encoding or URL escaping, is a critical mechanism for
          converting characters into a format that can be transmitted safely over the Internet. This
          encoding method is fundamental to web development and ensures that URLs remain functional
          across different systems, browsers, and platforms.
        </Typography>
        <Typography paragraph>
          In the context of web development and Internet protocols, URLs can only be sent over the
          Internet using the ASCII character-set. This limitation means that special characters,
          spaces, and non-ASCII characters (such as é, ñ, or 漢字) need to be encoded into a format
          that uses only ASCII characters. This encoding ensures universal compatibility and
          prevents data corruption during transmission.
        </Typography>
        <Typography paragraph>
          When you encode a character, it's replaced with a percent sign (%) followed by two
          hexadecimal digits that represent the character's ASCII/UTF-8 code. This ensures that URLs
          remain valid and can be properly interpreted by web browsers and servers. For example, a
          space character becomes '%20', and the '@' symbol becomes '%40'.
        </Typography>
        <Typography paragraph>
          The encoding process is crucial for maintaining URL integrity and preventing errors in web
          applications. When special characters are not properly encoded, it can lead to broken
          links, security vulnerabilities, or incorrect data transmission. Proper URL encoding is
          especially important in modern web applications that handle international characters,
          complex query parameters, and structured data in URLs.
        </Typography>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Why is URL Encoding Important?
        </Typography>
        <Typography paragraph>
          URL encoding serves multiple critical purposes in web development and internet
          communications. Understanding these purposes helps developers create more robust and
          secure applications:
        </Typography>

        <List>
          <ListItem>
            <ListItemText
              primary="Data Integrity"
              secondary="Ensures that complex data can be transmitted without corruption or loss of information, maintaining the exact intended meaning of each character."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Cross-Platform Compatibility"
              secondary="Guarantees that URLs work consistently across different operating systems, browsers, and devices, regardless of their native character encoding support."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Security Enhancement"
              secondary="Helps prevent various types of injection attacks and security vulnerabilities by properly encoding potentially dangerous characters."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="International Support"
              secondary="Enables websites to handle multilingual content and international character sets, making the web truly global and accessible."
            />
          </ListItem>
        </List>

        <Typography paragraph>URL encoding is essential for:</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {[
            'Pass special characters in URLs',
            'Encode form data',
            'Handle non-ASCII characters',
            'Prevent injection attacks',
            'Support multilingual content',
            'Ensure data integrity',
          ].map((use) => (
            <Chip key={use} label={use} variant="outlined" />
          ))}
        </Box>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Technical Implementation Details
        </Typography>
        <Typography paragraph>
          When implementing URL encoding in your applications, consider these technical aspects:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Character Encoding Standards"
              secondary="URLs typically use UTF-8 encoding before percent-encoding. This ensures proper handling of international characters and maintains compatibility with existing web infrastructure."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Encoding Contexts"
              secondary="Different parts of a URL (path, query, fragment) may have different encoding requirements. For example, spaces in the query string can be encoded as either '%20' or '+', but only '%20' is valid in the path component."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Performance Considerations"
              secondary="While encoding is necessary, it increases URL length and processing overhead. Consider this when designing APIs or systems that handle large amounts of encoded data."
            />
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Common Use Cases
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Form Submissions"
              secondary="When submitting forms with special characters or non-ASCII text, URL encoding ensures the data is properly transmitted to the server."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="API Requests"
              secondary="REST APIs often require URL encoding for query parameters and path segments containing special characters."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Multilingual Websites"
              secondary="URLs containing non-English characters need encoding to work correctly across different browsers and systems."
            />
          </ListItem>
        </List>
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

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Advanced URL Encoding Concepts
        </Typography>
        <Typography paragraph>
          Beyond basic character encoding, there are several advanced concepts that developers
          should understand:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Normalization"
              secondary="URLs should be normalized before encoding to ensure consistent results. This includes converting to proper case, removing unnecessary port numbers, and resolving relative paths."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Idempotent Encoding"
              secondary="A properly implemented URL encoder should be idempotent - encoding an already encoded URL should not change it further. This prevents issues with multiple encoding passes."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Reserved vs. Unreserved Characters"
              secondary="Some characters have special meaning in URLs and must be encoded in certain contexts, while others (A-Z, a-z, 0-9, -, _, ., ~) are considered unreserved and safe to use unencoded."
            />
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Important Notes About URL Encoding
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Case Sensitivity"
              secondary="Percent-encoded sequences are case-sensitive. For example, %2a and %2A both represent the '*' character, but %2A is the conventional format."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Double Encoding"
              secondary="Be careful not to encode already encoded URLs, as this can lead to double encoding issues (e.g., %20 becoming %2520)."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Encoding vs. Escaping"
              secondary="URL encoding is different from HTML escaping. Make sure to use the appropriate encoding method for your specific use case."
            />
          </ListItem>
        </List>
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
        <Typography paragraph>
          URL encoding follows specific standards and specifications to ensure consistency across
          the web. These documents provide detailed information about the implementation and usage
          of URL encoding:
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
            <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
              The primary specification that defines the generic syntax for URIs
            </Typography>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.w3schools.com/tags/ref_urlencode.ASP"
              target="_blank"
              rel="noopener"
            >
              W3Schools URL Encoding Reference
            </Link>
            <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
              A practical guide with examples and character reference tables
            </Typography>
          </ListItem>
          <ListItem>
            <Link
              href="https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding"
              target="_blank"
              rel="noopener"
            >
              MDN Web Docs - Percent Encoding
            </Link>
            <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
              Mozilla's comprehensive guide to percent-encoding
            </Typography>
          </ListItem>
        </List>
      </section>
    </Box>
  );
};

export default URLEncoderGuide;
