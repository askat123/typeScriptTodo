import { configureStore } from "@reduxjs/toolkit";
import TodoSLice from "./slices/TodoSLice";

export const store = configureStore({
  reducer: {
    todos: TodoSLice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
