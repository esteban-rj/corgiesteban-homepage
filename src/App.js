import Header from './Components/Header';
import Skills from './Components/Skills';
import './App.css';

function App() {
  return (
    <div className="App flex flex-col items-center">
      <Header></Header>
      <div className='w-2/3 justify-center mt-8'>
        <Skills></Skills>
      </div>
    </div>
  );
}

export default App;
