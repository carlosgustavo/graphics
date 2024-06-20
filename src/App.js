import './App.css';
import CustomSelect from './CustomSelect';
import LogoLaclaw from './laclaw.png'
import LogoGrafico from './grafico.png'



function App() {
  return (
    <body className="App">
      <header className="App-header">
      <img src={LogoLaclaw} alt="Logo Laclaw" className='logo-laclaw' />
        <div className='content-logo-grafico'>
        <h1> Visualizações de dados </h1>
        <img src={LogoGrafico} alt="Logo Grafico" className='logo-grafico' />
        </div>
      </header>
     <CustomSelect/>
    </body>
  );
}

export default App;
