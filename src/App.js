import Header from './Components/Header';
import AboutMe from './Components/AboutMe';
import Skills from './Components/Skills';
import Footer from './Components/Footer';
import './App.css';

function App() {
  return (
    <div className="App flex flex-col items-center">
      <Header></Header>
      <div className='w-2/3 justify-center mt-8'>
        <AboutMe />
        <div className="mb-[150px]">
          <Skills />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
