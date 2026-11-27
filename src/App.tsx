import Form from './Form/Form';
import Header from './Header/Header';
import Info from './Info/Info';
import './App.css';

const App = () => (
  <div className="App">
    <Header
      brandInfo={{
        appName: 'Signature Generator',
        companyName: 'MakerX',
        brandLink: 'https://makerx.com.au',
      }}
    ></Header>
    <section className="section notoppad">
      <div className="container">
        <Info />
        <Form />
      </div>
    </section>
  </div>
);

export default App;
