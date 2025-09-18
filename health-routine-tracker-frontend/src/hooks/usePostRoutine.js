// src/hooks/usePostRoutine.js
import { useState } from "react";
import { createRoutine } from "../api/routines";

export default function usePostRoutine() {
  const [loading, setLoading] = useState(false);
  const [error,   setError] = useState(null);

  const submit = async (form) => {
    try {
      setLoading(true);
      setError(null);
      const saved = await createRoutine(form);
      return saved; // 저장된 루틴 객체
    } catch (e) {
      setError(e?.response?.data || e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
