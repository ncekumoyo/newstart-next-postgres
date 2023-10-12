"use client";
import { useCallback, useState } from "react";

export default function useToggle(initialState) {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return { value, toggle };
}
