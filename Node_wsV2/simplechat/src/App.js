import { Outlet } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SimpleChat</h1>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
