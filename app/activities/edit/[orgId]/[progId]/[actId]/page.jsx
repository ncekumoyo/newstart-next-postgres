"use client";
import AuthHeader from "@/components/authHeader";
import { useGlobalContext } from "@/contexts/globalContext";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const ActivitiesEditPage = () => {
  const router = useRouter();
  const { user } = useGlobalContext();
  const { progId, orgId, actId } = useParams();
  const { data: act, doFetch: getAct } = useFetch(`/api/activities/view/${orgId}/${progId}/${actId}`);
  const { data: ua, err, doFetch: updateAct } = useFetch(`/api/activities/edit/${orgId}/${progId}/${actId}`);
  const [qstns, setQstns] = useState([]);

  useEffect(() => {
    if (ua) {
      router.back();
    }
  }, [ua]);

  useEffect(() => {
    if (user) {
      getAct({ method: "GET" });
    }
  }, [user]);

  useEffect(() => {
    if (act) {
      const qs = JSON.parse(act.assessment.questions).map((q) => ({
        question: q.question,
        answer: null,
      }));
      setQstns(qs);
    }
  }, [act]);

  const handleClick = (e) => {
    e.preventDefault();

    let qs = JSON.parse(act.assessment.questions);
    qs = qs.map((q) => ({
      ...q,
      answer: q.type === "number" ? Number(e.target[qs.indexOf(q)].value) : e.target[qs.indexOf(q)].value,
    }));

    updateAct({
      method: "PUT",
      body: JSON.stringify({
        answers: JSON.stringify(qs),
      }),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-5 mx-auto" style={{ maxWidth: 400 }}>
          <AuthHeader title={"Do Activity"} />
          <form onSubmit={handleClick}>
            {err && <div className="bg-danger mb-3 p-3 text-light fw-bold">{err}</div>}
            {qstns?.map((q) => (
              <div className="mb-3" key={qstns.indexOf(q)}>
                <label className="mb-1 fw-bold">{q.question}</label>
                <input type={q.type} name={q.key} className="form-control input-control" />
              </div>
            ))}
            <button className="btn btn-success mt-2 w-100">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesEditPage;
