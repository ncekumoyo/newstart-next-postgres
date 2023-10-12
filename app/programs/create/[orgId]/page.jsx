"use client";
import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "@/contexts/globalContext";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import AuthHeader from "@/components/authHeader";

const ProgramCreatePage = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const { orgId } = useParams();
  const titleRef = useRef("");
  const { data: program, err, doFetch: createProgram } = useFetch(`/api/programs/create/${orgId}`);

  useEffect(() => {
    if (program) {
      router.back();
    }
  }, [program]);

  const handleSave = (e) => {
    e.preventDefault();
    createProgram({
      method: "POST",
      token: user?.token,
      body: JSON.stringify({
        title: titleRef.current.value,
      }),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-5 mx-auto" style={{ maxWidth: 400 }}>
          <AuthHeader title={"Create Program"} />
          <form>
            {err && <div className="p-3 bg-danger text-light fw-bold rounded mb-3">{err}</div>}
            <label className="fw-bold ms-1 mb-1">Title</label>
            <input type="text" className="form-control border-0 p-2 input-control mb-3" ref={titleRef} />
            <button className="btn btn-success w-100 mt-2" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProgramCreatePage;
