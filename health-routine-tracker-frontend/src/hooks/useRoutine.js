import { authApi } from "../api/axios";

export const fetchRoutines = async () => {
  try {
    const response = await authApi.get("/routines");
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("fetchRoutines response status : ", response.status);
      return [];
    }
  } catch (error) {
    console.log("fetchRoutines error : ", error);
  }
};
