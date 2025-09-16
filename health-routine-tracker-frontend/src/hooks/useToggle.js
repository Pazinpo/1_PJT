// src/component/hooks/useToggle.js
import { useCallback, useState } from "react";

export default function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return { on, toggle, setOn };
}
