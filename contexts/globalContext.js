"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import useFetch from "@/hooks/useFetch";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const initialState = null;
  const [user, setUser] = useState(initialState);
  //const { data, err, doFetch } = useFetch("/api/verifyToken");

  useEffect(() => {
    const u = JSON.parse(localStorage?.getItem("user"));
    if (u) {
      setUser(u);
    }
  }, []);

  useEffect(() => {
    if (user !== initialState) {
      if (user === "logout") {
        localStorage.removeItem("user");
        setUser(initialState);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const ctx = {
    user,
    setUser,
  };

  return <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
