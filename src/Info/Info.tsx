import { useState, type ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Container disableGutters>
          <Box sx={{ py: 2 }}>{children}</Box>
        </Container>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Info = () => {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
        Create your signature
      </Typography>
      <Box component="ol" sx={{ pl: 3 }}>
        <li>Enter your details below</li>
        <li>Click the &ldquo;Copy Signature&rdquo; button</li>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={(_, newValue: number) => setValue(newValue)}
            aria-label="Email client instructions"
          >
            <Tab label="Gmail Instructions" {...a11yProps(0)} />
            <Tab label="Outlook instructions" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box component="ol" sx={{ pl: 3 }}>
            <li>Open Gmail</li>
            <li>
              <a
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                href="https://support.google.com/mail/answer/8395?hl=en&co=GENIE.Platform%3DDesktop#:~:text=Add%20or%20change%20a%20signature&text=Open%20Gmail.,or%20changing%20the%20text%20style"
                rel="noopener noreferrer"
                target="_blank"
              >
                Follow the instructions provided by Google.
              </a>
              <Box component="ul" sx={{ m: 0, pl: 2, pt: 1 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Settings icon and then See all settings.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  &ldquo;Signature&rdquo; section, add your signature text in
                  the box.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  At the bottom of the page, click Save Changes.
                </li>
              </Box>
            </li>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box component="ol" sx={{ pl: 3 }}>
            <li>Open Outlook</li>
            <li>
              <a
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                href="https://support.office.com/en-us/article/create-and-add-a-signature-to-messages-8ee5d4f4-68fd-464a-a1c1-0e1c80bb27f2"
                rel="noopener noreferrer"
                target="_blank"
              >
                Follow the instructions provided by Microsoft.
              </a>
              <Box
                component="ul"
                sx={{ m: 0, pl: 2, pt: 1, listStyleType: 'none' }}
              >
                <li style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>Windows: </span>
                  File &gt; Options &gt; Mail &gt; Signatures
                </li>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Mac: </span>
                  Outlook &gt; Preferences &gt; Signatures
                </li>
                <li>
                  <span style={{ fontWeight: 'bold' }}>
                    Outlook web access (OWA):{' '}
                  </span>
                  Cog (top-right) &gt; &ldquo;View all Outlook settings&rdquo;
                  link (bottom) &gt; Mail &gt; Compose and reply &gt; Email
                  signature
                </li>
              </Box>
            </li>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Info;
