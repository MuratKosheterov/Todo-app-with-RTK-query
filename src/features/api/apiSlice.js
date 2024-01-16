import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiTodos = createApi({
  reducerPath: "apiTodos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (res)=> res.sort((a,b)=> b.id-a.id),
      providesTags: ["Todos"],
    }),
    updateTodos: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags:["Todos"],
    }),
    addTodos: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags:["Todos"]
    }),
    deleteTodos: builder.mutation({
      query: ({id}) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["Todos"]
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = apiTodos;
