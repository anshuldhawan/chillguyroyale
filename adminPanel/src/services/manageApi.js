import { Apis } from "./api";

export const manageApi = Apis.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: (params) => ({
        url: `/questions/all`,
        method: "GET",
        params,
      }),
      providesTags: ["Question"],
    }),
    addQuestion: builder.mutation({
      query: (formData) => ({
        url: "/questions/add", // Specify your endpoint here
        method: "POST",
        body: formData, // Send FormData directly in the body
      }),
      invalidatesTags: ["Question"],
    }),
    updateQuestion: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/questions/update?id=${id}`, // Specify your endpoint here
        method: "PUT",
        body: formData, // Send FormData directly in the body
      }),
      invalidatesTags: ["Question"],
    }),
    deleteQuestion: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/questions/delete?id=${id}`, // Specify your endpoint here
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

    overrideExisting: false,
  }),
});

export const {
  useGetAllQuestionsQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = manageApi;
