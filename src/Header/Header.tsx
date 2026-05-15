import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export interface HeaderProps {
  appName: string;
  brandLink: string;
  brandLogo?: string;
  brandLogoAlt?: string;
}

const Header = ({
  appName,
  brandLink,
  brandLogo = '/logo.png',
  brandLogoAlt = 'MakerX',
}: HeaderProps) => (
  <AppBar position="static" elevation={0}>
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ gap: 2, py: 1 }}>
        <img src={brandLogo} alt={brandLogoAlt} style={{ height: 60 }} />
        <Link
          href={brandLink}
          underline="none"
          sx={{ color: 'common.white', fontSize: '1.25rem', fontWeight: 500 }}
        >
          {appName}
        </Link>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
