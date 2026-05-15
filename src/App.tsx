import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header/Header';
import Info from './Info/Info';
import Form from './Form/Form';

const isEmbedded = (): boolean => {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('embedded') === '1';
};

const App = () => {
  const embedded = isEmbedded();
  return (
    <>
      {embedded ? null : (
        <Header
          appName="Signature Generator"
          brandLink="https://signatures.makerx.tech/"
        />
      )}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box>
          <Info />
          <Form />
        </Box>
      </Container>
    </>
  );
};

export default App;
