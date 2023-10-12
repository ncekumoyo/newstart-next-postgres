"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/contexts/globalContext";
import AuthHeader from "@/components/authHeader";
import TogglablePassword from "@/components/togglablePassword";
import useFetch from "@/hooks/useFetch";

const SignupPage = () => {
  const { setUser } = useGlobalContext();
  const router = useRouter();
  const orgNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const { data, loading, err, setErr, doFetch } = useFetch("/api/auth/signup");

  useEffect(() => {
    if (data) {
      setUser(data);
      router.push("/dashboard");
    }
  }, [data]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (passwordRef.current?.value !== confirmRef.current?.value) {
      setErr("Passwords must match.");
      return;
    }

    const oname = orgNameRef.current.value;

    doFetch({
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current?.value,
        pwd: passwordRef.current?.value,
        type: "organization", // not to be hardset in future
        orgName: oname || null,
      }),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="bg-light rounded p-5 mx-auto" style={{ maxWidth: 800 }}>
          <AuthHeader title={"Signup"} />
          <div className="text-end p-3 mb-3">
            Already have an account?{" "}
            <Link href="/login" className="fw-bold text-success">
              LOGIN
            </Link>
          </div>
          <form>
            {err && <div className="p-3 bg-danger text-light fw-bold rounded mb-3">{err}</div>}
            <div className="row">
              <div className="col-md-6">
                <label className="fw-bold ms-1 mb-1">
                  Name of Organization<span className="fw-bold text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control mb-3 border-0 p-2 input-control"
                  ref={orgNameRef}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="fw-bold ms-1 mb-1">
                  Email<span className="fw-bold text-danger">*</span>
                </label>
                <input type="email" className="form-control mb-3 border-0 p-2 input-control" ref={emailRef} required />
              </div>
              <div className="col-md-6">
                <TogglablePassword label={"Password"} reference={passwordRef} />
              </div>
              <div className="col-md-6">
                <TogglablePassword label={"Confirm Password"} reference={confirmRef} />
              </div>
            </div>

            <button type="submit" className="btn btn-sm btn-success w-100 fw-bold p-2 mt-2" onClick={handleSignup}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
