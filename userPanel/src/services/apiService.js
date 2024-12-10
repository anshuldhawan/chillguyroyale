// services/apiService.js

import axiosInstance from "./axiosInstance";

// 1. userLogin (Mutation)
export const userLogin = async (credentials) => {
  console.log("called user login, credentials-->", credentials);
  const response = await axiosInstance.post("/user/sign", credentials);
  return response.data;
};

// 2. buyCredit (Mutation)
export const buyCredit = async (purchaseData) => {
  const response = await axiosInstance.post("/credit/buy", purchaseData);
  return response.data;
};

// 3. getCreditPackage (Query)
export const getCreditPackage = async () => {
  const response = await axiosInstance.get("/credit/all");
  return response.data;
};

// 4. startGame (Mutation)
export const startGame = async () => {
  const response = await axiosInstance.post("/questions/startGame");
  return response.data;
};

// 5. getQuestion (Query)
export const getQuestion = async (params) => {
  const response = await axiosInstance.get("/questions", {
    params,
  });

  return response.data;
};

// 6. totalQuestion (Query)
export const totalQuestion = async () => {
  const response = await axiosInstance.get("/questions/total");
  return response.data;
};

// 7. validateAnswer (Mutation)
export const validateAnswer = async (answerData) => {
  const response = await axiosInstance.post("/questions/validate", answerData);
  return response.data;
};

// 8. getUser (Query)
export const getUser = async () => {
  const response = await axiosInstance.get(`/user`);
  return response.data;
};

// 9. updateName (Mutation)
export const updateName = async (newName) => {
  const response = await axiosInstance.put(`/user/update`, {
    name: newName,
  });
  return response.data;
};

// 10. leaderBoard (Query)
export const leaderBoard = async () => {
  const response = await axiosInstance.get("/questions/leaderBoard");
  return response.data;
};
