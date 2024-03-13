import { Component } from "react";
import { v4 as uuid } from "uuid";

import TodoItem from "./components/TodoItem";

import "./App.css";

class App extends Component {
  state = { textInput: "", todoList: [], updateCount: 0, todoId: "" };

  addTodo = () => {
    const { textInput, updateCount, todoId, todoList } = this.state;
    let addTodoList = [];
    let repeater = isNaN(parseInt(textInput[textInput.length - 1]))
      ? 1
      : parseInt(textInput[textInput.length - 1]);
    let todoText = isNaN(parseInt(textInput[textInput.length - 1]))
      ? textInput
      : textInput.slice(0, textInput.length - 1);
    if (todoId === "" && textInput !== "") {
      for (let i = 0; i < repeater; i++) {
        const newTodo = {
          id: uuid(),
          todo: todoText,
          count: updateCount,
        };
        addTodoList.push(newTodo);
      }
      this.setState((prevState) => ({
        todoList: [...prevState.todoList, ...addTodoList],
        textInput: "",
        updateCount: 0,
      }));
    } else if (textInput !== "") {
      const updatedTodo = {
        id: todoId,
        todo: textInput,
        count: updateCount,
      };
      const filterList = todoList.filter((item) => item.id !== todoId);
      this.setState((prevState) => ({
        todoList: [...filterList, updatedTodo],
      }));
      this.setState({ textInput: "", todoId: "" });
    }
  };

  updateTodoItem = (id) => {
    const { todoList } = this.state;
    const targetObj = todoList.filter((item) => item.id === id);
    //console.log(targetObj);
    const { todo, count } = targetObj[0];
    console.log(count);
    this.setState({
      textInput: todo,
      updateCount: count + 1,
      todoId: id,
    });
  };

  removeTodoItem = (id) => {
    const { todoList } = this.state;
    const filteredList = todoList.filter((item) => item.id !== id);
    this.setState({ todoList: filteredList });
  };

  onChangeText = (e) => {
    this.setState({ textInput: e.target.value });
  };

  render() {
    const { textInput, todoList } = this.state;
    //console.log(todoList);
    return (
      <div className="app-container">
        <div className="todo-container">
          <h1 className="heading">Day Goals!</h1>
          <div className="input-container">
            <input
              type="text"
              value={textInput}
              onChange={this.onChangeText}
              className="text-input"
            />
            <button type="button" onClick={this.addTodo} className="add-btn">
              Add Todo
            </button>
          </div>
          <ul className="todo-list-container">
            {todoList.length !== 0 &&
              todoList.map((item) => (
                <TodoItem
                  key={item.id}
                  todoItem={item}
                  updateTodoItem={this.updateTodoItem}
                  removeTodoItem={this.removeTodoItem}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
