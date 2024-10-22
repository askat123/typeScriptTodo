import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Todo {
  id: number;
  title: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const TodoSLice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((el) => el.id === action.payload.id);
      state.todos[index] = action.payload;
    },
  },
});

export const { setTodo, addTodo, deleteTodo, editTodo } = TodoSLice.actions;
export default TodoSLice.reducer;
