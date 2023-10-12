"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "@/contexts/globalContext";
import useFetch from "@/hooks/useFetch";
import AuthHeader from "@/components/authHeader";

const ProgramEditPage = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const { orgId, progId } = useParams();
  const titleRef = useRef("");
  const { data: program, err: perr, doFetch: getProgram } = useFetch(`/api/programs/view/${orgId}/${progId}`);
  const { data: updatedProgram, err, doFetch: updateProgram } = useFetch(`/api/programs/edit/${orgId}/${progId}`);

  useEffect(() => {
    if (user) {
      getProgram({
        method: "GET",
        token: user?.token,
      });
    }
  }, [user]);

  useEffect(() => {
    if (updatedProgram) {
      router.back();
    }
  }, [updatedProgram]);

  const handleSave = (e) => {
    e.preventDefault();
    updateProgram({
      method: "PUT",
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
          <AuthHeader title={"Edit Program"} />
          <form>
            {perr && <div className="p-3 bg-warning text-light fw-bold rounded mb-3">{perr}</div>}
            {err && <div className="p-3 bg-danger text-light fw-bold rounded mb-3">{err}</div>}
            <label className="fw-bold ms-1 mb-1">Title</label>
            <input
              type="text"
              className="form-control border-0 p-2 input-control mb-3"
              defaultValue={program?.title}
              ref={titleRef}
            />
            <button className="btn btn-success w-100 mt-2" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProgramEditPage;
