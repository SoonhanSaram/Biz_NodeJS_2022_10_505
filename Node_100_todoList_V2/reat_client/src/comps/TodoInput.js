import { useTodoContext } from "../context/TodoContext";
const TodoInput = () => {
  const { todoInsert, todoContent, setTodoContent } = useTodoContext();
  const onClickHandler = () => {
    todoInsert(todoContent.t_content);
  };
  const onChangeHandler = (e) => {
    const value = e.target.value;
    setTodoContent({ ...todoContent, t_content: value });
  };
  return (
    <div className="input">
      <input
        placeholder="할 일 입력"
        onChange={onChangeHandler}
        value={todoContent.t_content}
      ></input>
      <button
        onClick={onClickHandler}
        disabled={todoContent.t_content.length < 2}
      >
        Enter
      </button>
    </div>
  );
};

export default TodoInput;
