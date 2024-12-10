import { Apis } from "./api";

export const manageCreditsApi = Apis.injectEndpoints({
  endpoints: (builder) => ({
    getAllCredits: builder.query({
      query: (params) => ({
        url: `/credit/all`,
        method: "GET",
        params,
      }),
      providesTags: ["Credit"],
    }),
    addCredits: builder.mutation({
      query: (formData) => ({
        url: "/credit/add", // Specify your endpoint here
        method: "POST",
        body: formData, // Send FormData directly in the body
      }),
      invalidatesTags: ["Credit"],
    }),
    updateCredits: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/credit/update?id=${id}`, // Specify your endpoint here
        method: "PUT",
        body: formData, // Send FormData directly in the body
      }),
      invalidatesTags: ["Credit"],
    }),
    deleteCredits: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/credit/delete?id=${id}`, // Specify your endpoint here
        method: "DELETE",
      }),
      invalidatesTags: ["Credit"],
    }),

    overrideExisting: false,
  }),
});

export const {
  useGetAllCreditsQuery,
  useAddCreditsMutation,
  useUpdateCreditsMutation,
  useDeleteCreditsMutation,
} = manageCreditsApi;
