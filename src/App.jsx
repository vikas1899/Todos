import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [todos, setTodos] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://source.unsplash.com/1600x900/?mountain")
      .then((response) => {
        // Check if the response is successful
        if (response.ok) {
          return response;
        }
        // If response is not ok, throw an error
        throw new Error("Failed to fetch image");
      })
      .then((response) => response.url)
      .then((imageUrl) => {
        setImageData(imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setLoading(false);
      });
  }, []);

  const addTodo = (todo) => {
    setTodos((prevTodo) => [{ id: Date.now(), ...todo }, ...prevTodo]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => {
        if (prevTodo.id === id) {
          return todo;
        } else {
          return prevTodo;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="bg-cover min-h-screen py-8 font-jost"
          style={{
            backgroundImage: `url(${imageData})`,
          }}
        >
          <div className="w-[90vw] backdrop-blur-sm bg-slate-100/20  max-w-2xl mx-auto  rounded-lg px-4 py-3 text-white">
            <h1 className="text-4xl shadow-gray-100 text-slate-700 font-bold text-center mb-8 mt-2">
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
      )}
    </TodoProvider>
  );
}

export default App;
