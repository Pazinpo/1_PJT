import api from "./client";

// 좋아요 토글 (DetailPage)
export const toggleLike = async (routineId) => {
  const { data } = await api.post(`/routines/${routineId}/like`);
  // BE가 {liked, likeCount} 형태로 주면 그대로 사용
  return data;
};

// 좋아요 개수/내 상태 조회 (DetailPage 진입 시)
export const getLikeInfo = async (routineId) => {
  const { data } = await api.get(`/routines/${routineId}/likes`);
  // 예: { likeCount: number, meLiked: boolean }
  return data;
};
