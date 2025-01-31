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
  Grid,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import CodeIcon from '@mui/icons-material/Code';

const markdownExample = `# Heading 1
## Heading 2
### Heading 3

**Bold text**  
*Italic text*  
~~Strikethrough~~  

- Unordered list item
- Another item
  - Nested item

1. Ordered list
2. Second item

[Link text](https://example.com)
![Alt text](https://via.placeholder.com/150)

\`inline code\`

\`\`\`javascript
// Code block
function hello() {
  console.log('Hello Markdown!');
}
\`\`\`

> Blockquote text

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
`;

const MarkdownGuide: React.FC = () => {
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
        Markdown Formatting Guide
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
          {[
            'What is Markdown?',
            'Basic Syntax',
            'Extended Syntax',
            'Examples',
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

      <section id="what-is-markdown">
        <Typography variant="h4" component="h2" gutterBottom>
          What is Markdown?
        </Typography>
        <Typography paragraph>
          Markdown is a lightweight markup language created by John Gruber in 2004, designed to be
          easy to read and write while being convertible to HTML and other formats. It uses simple,
          intuitive syntax that makes it accessible to both technical and non-technical users.
        </Typography>
        <Typography paragraph>
          Unlike complex word processing applications, Markdown allows you to format text using
          simple characters like asterisks, underscores, and hashtags. This simplicity makes it
          perfect for quick documentation, readme files, and content creation where the focus should
          be on writing rather than formatting.
        </Typography>
        <Typography paragraph>
          The philosophy behind Markdown is that formatted text should be readable in its source
          form, without tags or formatting instructions getting in the way. This makes it ideal for:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {['Documentation', 'Readme files', 'Blog posts', 'Forum posts', 'Technical writing'].map(
            (use) => (
              <Chip key={use} label={use} variant="outlined" />
            )
          )}
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="basic-syntax">
        <Typography variant="h4" component="h2" gutterBottom>
          Basic Syntax
        </Typography>

        <Table sx={{ mb: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>Element</TableCell>
              <TableCell>Syntax</TableCell>
              <TableCell>Example</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              ['Heading 1', '# Heading', '# Main Title'],
              ['Heading 2', '## Heading', '## Section Title'],
              ['Bold', '**text**', '**Important**'],
              ['Italic', '*text*', '*Emphasis*'],
              ['Link', '[text](url)', '[Google](https://google.com)'],
              ['Image', '![alt](url)', '![Logo](logo.png)'],
              ['List', '- Item', '- First item\n- Second item'],
              ['Code', '`code`', '`const x = 5`'],
            ].map(([element, syntax, example]) => (
              <TableRow key={element as string}>
                <TableCell>{element}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>{syntax}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>{example}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="extended-syntax">
        <Typography variant="h4" component="h2" gutterBottom>
          Extended Syntax
        </Typography>

        <Box sx={{ '& h5': { mt: 3 } }}>
          <Typography variant="h5">Tables</Typography>
          <ReactMarkdown>{`
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |
          `}</ReactMarkdown>

          <Typography variant="h5">Code Blocks</Typography>
          <ReactMarkdown>{`
\`\`\`javascript
function test() {
  console.log("Code block");
}
\`\`\`
          `}</ReactMarkdown>

          <Typography variant="h5">Footnotes</Typography>
          <ReactMarkdown>{`
Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.
          `}</ReactMarkdown>

          <Typography variant="h5">Task Lists</Typography>
          <ReactMarkdown>{`
- [x] Completed task
- [ ] Incomplete task
          `}</ReactMarkdown>
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="examples">
        <Typography variant="h4" component="h2" gutterBottom>
          Live Example
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" gutterBottom>
                Markdown Input
              </Typography>
              <Box
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  p: 2,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                }}
              >
                {markdownExample}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" gutterBottom>
                Rendered Output
              </Typography>
              <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                <ReactMarkdown>{markdownExample}</ReactMarkdown>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </section>

      <Divider sx={{ my: 4 }} />

      <section id="specifications">
        <Typography variant="h4" component="h2" gutterBottom>
          Specifications & Resources
        </Typography>
        <List>
          <ListItem>
            <Link href="https://commonmark.org/" target="_blank" rel="noopener">
              CommonMark Specification
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.markdownguide.org/" target="_blank" rel="noopener">
              Markdown Guide
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.github.com/gfm/" target="_blank" rel="noopener">
              GitHub Flavored Markdown Spec
            </Link>
          </ListItem>
        </List>
      </section>
    </Box>
  );
};

export default MarkdownGuide;
