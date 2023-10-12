"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/globalContext";
import AuthHeader from "@/components/authHeader";
import TogglablePassword from "@/components/togglablePassword";
import useFetch from "@/hooks/useFetch";

const metadata = {
  title: "Login - Newstart",
  description: "Login screen for the Newstart Health App",
};

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useGlobalContext();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { data: u, err, doFetch } = useFetch("/api/auth/login");

  useEffect(() => {
    if (u) {
      setUser(u);
      router.push("/");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    doFetch({
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        pwd: passwordRef.current.value,
      }),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="bg-light rounded p-5 mx-auto" style={{ width: 400 }}>
          <AuthHeader title={"Login"} />
          <div className="text-end p-3">
            No account?{" "}
            <Link href="/signup" className="fw-bold text-success">
              SIGNUP
            </Link>
          </div>
          <form>
            {err && <div className="p-3 bg-danger text-light fw-bold rounded mb-3">{err}</div>}
            <label className="fw-bold ms-1 mb-1">
              Email<span className="fw-bold text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control mb-3 border-0 p-2 input-control"
              placeholder="Email"
              ref={emailRef}
              required
            />
            <TogglablePassword label="Password" reference={passwordRef} />
            <button type="submit" className="btn btn-sm btn-success w-100 fw-bold p-2 mt-2" onClick={handleLogin}>
              Login
            </button>
          </form>
          {/* <div className="text-end p-3">
            Forgot your password?{" "}
            <Link href="#" className="fw-bold text-success">
              RESET
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
