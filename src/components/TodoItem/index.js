import "./index.css";

import { FaPencilAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const TodoItem = (props) => {
  const { todoItem, updateTodoItem, removeTodoItem } = props;
  const { id, todo, count } = todoItem;

  const updateTodo = () => {
    updateTodoItem(id);
  };

  const deleteTodo = () => {
    removeTodoItem(id);
  };

  return (
    <div className="todo-item-container">
      <div className="todo-text-card">
        <p className="todo">{todo}</p>
        <p className="update-count">{`(updated ${count} Times)`}</p>
      </div>
      <div className="update-card">
        <button type="button" onClick={updateTodo}>
          <FaPencilAlt className="edit-btn" />
        </button>
        <button type="button" onClick={deleteTodo}>
          <RxCross2 className="delete-btn" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
