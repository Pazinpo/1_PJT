import api from "./client";

// R-01: 루틴 생성 (PostPage)
export const createRoutine = async (payload) => {
  // { date, sleepHours, exerciseType, exerciseMinutes, meals, waterMl, note }
  const { data } = await api.post("/routines", payload);
  return data;
};

// R-02: 루틴 목록 (Detail에서 '목록으로' 이동 전후 리스트 필요 시)
export const listRoutines = async (params = {}) => {
  const { data } = await api.get("/routines", { params });
  return data; // { page, size, totalElements, totalPages, content: [...] }
};

// R-03: 루틴 상세 (DetailPage)
export const getRoutine = async (id) => {
  const { data } = await api.get(`/routines/${id}`);
  return data;
};
