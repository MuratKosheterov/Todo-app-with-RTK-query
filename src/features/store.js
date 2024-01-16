import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiTodos } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiTodos.reducerPath]: apiTodos.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiTodos.middleware),
});

setupListeners(store.dispatch)