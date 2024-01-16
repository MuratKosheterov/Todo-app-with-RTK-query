import React, { useState } from "react";
import {
  useAddTodosMutation,
  useGetTodosQuery,
  useDeleteTodosMutation,
  useUpdateTodosMutation,
} from "../features/api/apiSlice";

function Todolist() {
  const { data, isLoading, isSuccess } = useGetTodosQuery();
  const [addTodos] = useAddTodosMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();
  const [value, setValue] = useState("");

  if (isLoading) return <h1>Loading...</h1>;

  const handleAdd = async (e) => {
    if (value) {
      e.preventDefault();
       await addTodos({ title: value, completed: false });
      setValue("");
    }
  };

  return (
    <div>
      <form>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter some todo..."
        />
        <button onClick={handleAdd}>Add</button>
      </form>
      <div>
        {isSuccess &&
          data.map((todo) => {
            return (
              <div key={todo.id} className="content">
                <input
                  checked={todo.completed}
                  onClick={() =>
                    updateTodos({ ...todo, completed: !todo.completed })
                  }
                  type="checkbox"
                  id={todo.id}
                />
                <p className={todo.completed ? "title" : "" }>{todo.title}</p>
                <div onClick={() => deleteTodos({ id: todo.id })}>Delete</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Todolist;
