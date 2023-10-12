"use client";
import { useGlobalContext } from "@/contexts/globalContext";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const AssessmentsCreatePage = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const qstnRef = useRef(null);
  const { data: ass, doFetch: createAss } = useFetch("/api/assessments/create");

  useEffect(() => {
    if (ass) {
      router.push("/assessments/view");
    }
  }, [ass]);

  const handleSave = (e) => {
    e.preventDefault();
    let questions = qstnRef.current.value;
    questions = questions.split("\n\n");
    questions = questions.map((q) => {
      const qobj = q.split("\n");
      return { question: qobj[0], type: qobj[1] };
    });

    createAss({
      method: "POST",
      token: user?.token,
      body: JSON.stringify({
        title: titleRef.current.value,
        description: descRef.current.value,
        questions,
      }),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-5 mx-auto" style={{ maxWidth: 400 }}>
          <h1 className="display-6 mb-3">Create Assessment</h1>
          <form>
            <label className="fw-bold ms-1 mb-1">Title</label>
            <input type="text" className="form-control border-0 p-2 input-control mb-3" ref={titleRef} />
            <label className="fw-bold ms-1 mb-1">Description</label>
            <textarea className="form-control border-0 p-2 input-control mb-3" ref={descRef}></textarea>
            <label className="fw-bold ms-1 mb-1">Questions</label>
            <textarea className="form-control border-0 p-2 input-control mb-3" rows={10} ref={qstnRef}></textarea>
            <button className="btn btn-success w-100" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsCreatePage;
