import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  addTodo,
  deleteTodo,
  editTodo,
  setTodo,
} from "./store/slices/TodoSLice";
import { UssAppDispatch, UssAppSelector } from "./store/hooks";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [editTodoTitle, setEditTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const dispatch = UssAppDispatch();
  const { todos } = UssAppSelector((state) => state.todos);
  useEffect(() => {
    axios
      .get("https://6717b8ffb910c6a6e029a941.mockapi.io/todo/todos")
      .then((res) => {
        dispatch(setTodo(res.data));
      })
      .catch((error) => {
        return console.log(error);
      });
  }, []);
  console.log(todos);

  function handleAddTodo() {
    if (newTodo.trim()) {
      axios
        .post("https://6717b8ffb910c6a6e029a941.mockapi.io/todo/todos", {
          title: newTodo,
        })
        .then((res) => {
          dispatch(addTodo(res.data));
          setNewTodo("");
        });
    }
  }

  function handleDelete(id: number) {
    axios
      .delete(`https://6717b8ffb910c6a6e029a941.mockapi.io/todo/todos/${id}`)
      .then((res) => {
        dispatch(deleteTodo(id));
      })
      .catch((res) => console.log(res));
  }

  function handleEdit(id: number, title: string) {
    setEditTodo(title);
    setEditTodoId(id);
  }
  function handleSave() {
    if (editTodoTitle.trim() && editTodoId !== null) {
      axios
        .put(
          `https://6717b8ffb910c6a6e029a941.mockapi.io/todo/todos/${editTodoId}`,
          { title: editTodoTitle }
        )
        .then((res) => {
          dispatch(editTodo(res.data));
          setEditTodoId(null);
          setEditTodo("");
        });
    }
  }
  return (
    <>
      <h1>To Do List</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        type="text"
      />
      <button onClick={handleAddTodo}>+ITEM</button>
      <ul>
        {todos.map((el) => (
          <li key={el.id}>
            {editTodoId === el.id ? (
              <>
                <input
                  value={editTodoTitle}
                  onChange={(e) => setEditTodo(e.target.value)}
                  type="text"
                />
                <button onClick={handleSave}>save</button>
              </>
            ) : (
              <>
                <span>{el.title}</span>
                <button onClick={() => handleEdit(el.id, el.title)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(el.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
