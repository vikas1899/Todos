import { useState } from "react";
import { useTod } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTod();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    // we have spread values in app.jsx add fun
    // we will pass a object {}
    addTodo({ todo, completed: false });
    setTodo("");
  };
  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border   border-black/10 rounded-l-lg px-3 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-slate-500 outline-none text-slate-800 font-semibold duration-150 bg-white/8 0 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg hover:scale-105  px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
