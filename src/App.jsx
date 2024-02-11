import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // why we not passed directly
    // if do then it delete previous existing all values and add this only single value hence we by using call-back get prev all values and inject new in it , for prev we use also a spread oprator
    setTodos((prevTodo) => [{ id: Date.now(), ...todo }, ...prevTodo]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => {
        // Check if the current todo's id matches the id being updated
        if (prevTodo.id === id) {
          // Return the updated todo if the id matches
          return todo;
        } else {
          // Otherwise, return the previous todo unchanged
          return prevTodo;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    // here remember for deleteion always apply a filter , what does filter works on true statement hence if value get if id is not same ,
    // basically it returns the elements of an array that meet the condition specified in a callback function.
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    // applied callback on list of todo
    setTodos((prev) =>
      // traversed through id
      prev.map((prevTodo) =>
        // here we using spread operater take prev value and togle a completed value overided with original
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    // JSON.stringify(todos) converts to string
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    // values are most imp
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}
    >
      <div className=" bg-[url('https://source.unsplash.com/1600x900/?programming')] min-h-screen py-8">
        <div className="w-full backdrop-blur-sm max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-4xl shadow-gray-100 text-green-white  font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
