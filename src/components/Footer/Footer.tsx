import {
  alpha,
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.main, 0.1)
            : alpha(theme.palette.primary.main, 0.05),
        py: 6,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              SwiftUtils
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Making developers' lives easier with essential tools and utilities.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="https://github.com" target="_blank" color="inherit">
                <GitHubIcon />
              </Link>
              <Link href="https://twitter.com" target="_blank" color="inherit">
                <TwitterIcon />
              </Link>
              <Link href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedInIcon />
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="/guides/markdown" color="inherit">
                Documentation
              </Link>
              <Link href="/guides/base64" color="inherit">
                Guides
              </Link>
              <Link
                href="https://github.com/yourusername/swiftutils"
                target="_blank"
                color="inherit"
              >
                GitHub Repository
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="/privacy" color="inherit">
                Privacy Policy
              </Link>
              <Link href="/terms" color="inherit">
                Terms of Service
              </Link>
              <Link href="/cookies" color="inherit">
                Cookie Policy
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {year} SwiftUtils. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for developers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
