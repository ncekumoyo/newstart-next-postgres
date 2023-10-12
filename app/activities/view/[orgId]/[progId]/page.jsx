import { executeFetch } from "@/lib/fetches";
import React from "react";
import Link from "next/link";

export const ActivityPage = async ({ params }) => {
  const progId = params.progId;
  const orgId = params.orgId;
  const actsData = executeFetch(`/api/activities/view/${orgId}/${progId}`);
  const acts = await actsData;

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-3 mx-auto">
          {acts.data.length > 0 && (
            <>
              <h2 className="fw-bold">{`${acts?.data[0]?.program?.organization?.profile?.orgName}`}</h2>
              <h1 className="display-6 text-success">{`${acts?.data[0]?.program.title}`}</h1>
            </>
          )}

          <h2 className="mb-3">Activities</h2>
          <div className="d-flex justify-content-end mb-3">
            <Link href={`/activities/create/${orgId}/${progId}`} className="btn btn-sm btn-success">
              New Activity
            </Link>
          </div>
          <table className="table tale-sm table-striped">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Assessment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {acts?.data.map((a) => (
                <tr>
                  <td>{`${a?.profile.forenames} ${a?.profile.lastname}`}</td>
                  <td>{a?.assessment.title}</td>
                  <td>
                    <div className="d-flex justify-content-end">
                      <Link
                        href={`/activities/view/${orgId}/${progId}/${a?.id}`}
                        className="btn btn-success btn-sm ms-2"
                      >
                        View
                      </Link>
                      <Link
                        href={`/activities/edit/${orgId}/${progId}/${a?.id}`}
                        className="btn btn-warning btn-sm ms-2"
                      >
                        Do Assessment
                      </Link>
                      <Link
                        href={`/activities/delete/${orgId}/${progId}/${a?.id}`}
                        className="btn btn-danger btn-sm ms-2"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form></form>
      </div>
    </section>
  );
};

export default ActivityPage;
