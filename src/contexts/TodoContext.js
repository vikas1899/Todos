import { useContext, createContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo Msg",
      completed: false,
    },
  ],
  // methods / functionalaties
  addTodo: () => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});
export const useTod = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
