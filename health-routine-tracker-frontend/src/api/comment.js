import api from "./client";

// C-02: 댓글 목록 (DetailPage)
export const getComments = async (routineId) => {
  const { data } = await api.get(`/routines/${routineId}/comments`);
  return data; // [ {id, user:{nickname}, content, createdAt}, ... ]
};

// C-01: 댓글 작성 (DetailPage)
export const addComment = async (routineId, content) => {
  const { data } = await api.post(`/routines/${routineId}/comments`, { content });
  return data;
};
