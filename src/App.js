import logo from './logo.svg';
import './App.css';
import TwitchViewer from './components/twitchviewer.tsx';

function App() {
  return (
    <div className="App">
      <TwitchViewer streamer={"sinatraa"}/>
    </div>
  );
}

export default App;
