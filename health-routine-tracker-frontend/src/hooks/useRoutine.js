import { api } from "../api/axios";

export const fetchRoutines = async (user) => {
  try {
    const response = await api.get("/routines", {
      params: {
        userId: user.id,
      },
    });
    console.log("fetchRoutines ", response);
    if (response.status === 200) {
      return response.data.data.content;
    } else {
      console.log("fetchRoutines response status : ", response.status);
      return [];
    }
  } catch (error) {
    console.log("fetchRoutines error : ", error);
  }
};

export const fetchRoutineDetail = async (id) => {
  try {
    const response = await api.get(`/routines/${id}`);
    console.log("fetchRoutine detail ", response);
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log("fetchRoutine detail response status : ", response.status);
      return [];
    }
  } catch (error) {
    console.log("fetchRoutine detail error : ", error);
  }
};
