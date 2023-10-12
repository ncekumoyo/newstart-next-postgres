"use client";
import { useGlobalContext } from "@/contexts/globalContext";
import useFetch from "@/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProgramDeletePAge = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const { orgId, progId } = useParams();
  const { data: p, doFetch: getProgram } = useFetch(`/api/programs/view/${orgId}/${progId}`);
  const { data: dp, doFetch: deleteProgram } = useFetch(`/api/programs/delete/${orgId}/${progId}`);

  useEffect(() => {
    if (user) {
      getProgram({
        method: "GET",
        token: user?.token,
      });
    }
  }, [user]);

  useEffect(() => {
    if (dp) {
      router.back();
    }
  }, [dp]);

  const handleDelete = () => {
    deleteProgram({
      method: "DELETE",
      token: user?.token,
    });
  };
  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light mx-auto p-5" style={{ maxWidth: 600 }}>
          <h1 className="display-6 mb-3">Delete Program</h1>
          <p className="lead">Are you sure you want to delete this program:</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <td>{p?.title}</td>
              </tr>
            </thead>
          </table>
          <button type="button" onClick={handleDelete} className="btn btn-danger me-2">
            Yes, Delete
          </button>
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
            className="btn btn-success me-2"
          >
            No, Go back
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramDeletePAge;
