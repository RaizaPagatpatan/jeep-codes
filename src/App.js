import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Content from './components/Content';


const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Content />
    </div>
  );
};

export default App;
