import { TodoContextProvider } from "../context/TodoContext";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
const Todomain = () => {
  return (
    <div className="Todo">
      <TodoContextProvider>
        <TodoInput />
        <TodoList />
      </TodoContextProvider>
    </div>
  );
};

export default Todomain;
