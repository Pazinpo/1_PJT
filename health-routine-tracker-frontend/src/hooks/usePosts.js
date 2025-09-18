// src/component/hooks/usePosts.js
import { api } from "../api/axios";

export const createPosts = async (routine) => {
  try {
    const response = await api.post("/routines", routine);
    if (response.status === 201) {
      console.log(response);
      return response.status;
    } else if (response.status === 409) {
      console.log("usePosts response status : ", response.status);
      return response.status;
    }
  } catch (error) {
    console.log("usePosts error : ", error);
    return error.status;
  }
};
