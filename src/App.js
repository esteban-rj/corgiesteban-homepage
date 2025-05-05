import Header from './Components/Header';
import Carrousel from './Components/Carrousel';
import './App.css';

function App() {
  return (
    <div className="App flex flex-col items-center">
      <Header></Header>
      <div className='w-2/3 justify-center mt-8'>
        <Carrousel></Carrousel>
      </div>
    </div>
  );
}

export default App;
