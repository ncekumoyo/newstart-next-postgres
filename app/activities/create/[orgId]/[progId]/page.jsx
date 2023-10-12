"use client";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const ActivitiesCreatePage = async () => {
  const router = useRouter();
  const { progId, orgId } = useParams();
  const assRef = useRef(null);
  const profRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [ass, setAss] = useState(null);
  const { data: prog, loading: progLoading, doFetch: getProg } = useFetch(`/api/programs/view/${orgId}/${progId}`);
  const { data: profs, loading: profsLoading, doFetch: getProfs } = useFetch(`/api/profiles/view/${orgId}`);
  const { data: asses, loading: assesLoading, doFetch: getAsses } = useFetch(`/api/assessments/view`);
  const { data: act, err, doFetch: creatAct } = useFetch(`/api/activities/create/${orgId}/${progId}`);
  /* const [prog, profs, asses] = await Promise.all([
    executeFetch(`/api/programs/view/${orgId}/${progId}`),
    executeFetch(`/api/profiles/view/${orgId}`),
    executeFetch(`/api/assessments/view`),
  ]); */

  useEffect(() => {
    getProg({ method: "GET" });
    getProfs({ method: "GET" });
    getAsses({ method: "GET" });
  }, []);

  useEffect(() => {
    if (act) {
      router.back();
      return;
    }
  }, [act]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("...handling click");
    creatAct({
      method: "POST",
      body: JSON.stringify({
        profId: profRef.current.value,
        assId: assRef.current.value,
      }),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-5 mx-auto" style={{ maxWidth: 600 }}>
          {!progLoading && !assesLoading && !profsLoading && (
            <form>
              {err && <div className="bg-danger mb-3 p-3 text-light fw-bold">{err}</div>}
              <div className="mb-3">
                <label>Program</label>
                <h2 className="lead">{prog?.title}</h2>
                <p className="lead">{profile && `${profile?.forenames} ${profile?.lastname}`}</p>
                <p className="lead">{ass?.title}</p>
              </div>
              <div className=" mb-3">
                <label>Profile</label>
                <select className="form-control input-control" ref={profRef}>
                  <option value={null}>--- Choose an option ---</option>
                  {profs?.map((p) => (
                    <option key={p.id} value={p.id}>{`${p.forenames} ${p.lastname}`}</option>
                  ))}
                </select>
              </div>
              <div className=" mb-3">
                <label>Assessment</label>
                <select className="form-control input-control" ref={assRef}>
                  <option value={null}>--- Choose an option ---</option>
                  {asses?.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-success w-100 mt-2" onClick={handleClick}>
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesCreatePage;

{
  /* <div className="form-check m-3 d-flex align-items-center">
                        <input
                          className="form-check-input"
                          id={a.id}
                          type="checkbox"
                          onChange={(e) => {
                            setAssList((current) => {
                              if (e.target.checked) {
                                return [...current, a?.id];
                              } else {
                                return current.filter((x) => x != a?.id);
                              }
                            });
                          }}
                        />
                        <label htmlFor={a?.id} className="form-check-label ms-3">
                          {a.title}
                        </label>
                      </div> */
}
