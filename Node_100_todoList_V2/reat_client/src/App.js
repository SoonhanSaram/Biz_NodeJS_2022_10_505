import "./css/App.css";
import Todomain from "./comps/Todomain";
import "./css/Todo.css";
function App() {
  return (
    <div className="App">
      <header>
        <h1>오늘 할 일</h1>
      </header>
      <Todomain />
    </div>
  );
}

export default App;
