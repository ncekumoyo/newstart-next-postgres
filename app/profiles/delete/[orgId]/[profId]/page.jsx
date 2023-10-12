"use client";
import { useGlobalContext } from "@/contexts/globalContext";
import useFetch from "@/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ProfilesDeleteUnderOrgPage() {
  const { user } = useGlobalContext();
  const router = useRouter();
  const { orgId, profId } = useParams();
  const { data: p, doFetch: getProfile } = useFetch(`/api/profiles/view/${orgId}/${profId}`);
  const { data: dp, doFetch: deleteProfile } = useFetch(`/api/profiles/delete/${orgId}/${profId}`);

  useEffect(() => {
    if (user) {
      getProfile({
        method: "GET",
        token: user?.token,
      });
    }
  }, [user]);

  useEffect(() => {
    if (dp) {
      router.push(`/profiles/view/${orgId}`);
    }
  }, [dp]);

  const handleDelete = () => {
    deleteProfile({
      method: "DELETE",
      token: user?.token,
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-5 mx-auto" style={{ maxWidth: 400 }}>
          <h2 className="display-6 text-danger">Delete profile</h2>
          <p className="lead">Are you sure you want to delete this profile:</p>
          <table className="table">
            <thead>
              <tr>
                <th>Last name:</th>
                <td>{p?.lastname}</td>
              </tr>
              <tr>
                <th>Fore name(s):</th>
                <td>{p?.forenames}</td>
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
}

export default ProfilesDeleteUnderOrgPage;
