import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nhom13.onrender.com" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        body: product,
        method: "POST",
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
          user_id,
        },
        method: "DELETE",
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: "PUT",
      }),
    }),

    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/products/add-to-cart",
        body: cartInfo,
        method: "POST",
      }),
    }),

    removeFromCart: builder.mutation({
      query: (body) => ({
        url: "/products/remove-from-cart",
        body,
        method: "POST",
      }),
    }),

    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/increase-cart",
        body,
        method: "POST",
      }),
    }),

    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/decrease-cart",
        body,
        method: "POST",
      }),
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/editUser/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),

    updatePassword: builder.mutation({
      query: (user) => ({
        url: `/users/change-password/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),

    createComment: builder.mutation({
      query: ({ product_id, user_id, comment }) => ({
        url: `/products/comment/${product_id}`,
        body: {
          user_id,
          comment
        },
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUpdateUserMutation,
  useCreateCommentMutation,
  useUpdatePasswordMutation
} = appApi;

export default appApi;
