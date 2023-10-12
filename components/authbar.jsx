"use client";
import { useGlobalContext } from "@/contexts/globalContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Authbar = () => {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    setUser("logout");
    router.push("/");
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex align-items-center justify-content-end ms-auto mt-2">
          {user && (
            <>
              <Link href={`/dashboard`} className="me-2 fw-bold">
                {user.email}
              </Link>
              <form>
                <button type="submit" className="btn btn-success btn-sm" onClick={handleLogout}>
                  LOGOUT
                </button>
              </form>
            </>
          )}
          {!user && (
            <>
              <Link href={"/signup"} className="btn btn-success btn-sm me-2">
                SIGNUP
              </Link>
              <Link href={"/login"} className="btn btn-outline-success btn-sm">
                LOGIN
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Authbar;
