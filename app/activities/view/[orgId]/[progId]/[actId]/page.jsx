import AuthHeader from "@/components/authHeader";
import { executeFetch } from "@/lib/fetches";
import React from "react";

async function ActivityViewPage({ params }) {
  const { orgId, progId, actId } = params;
  const actData = executeFetch(`/api/activities/view/${orgId}/${progId}/${actId}`);
  const act = await actData;
  const ans = JSON.parse(act.data.answers);
  return (
    <section className="mb-3 flex-grow-1">
      <div className="container">
        <div className="rounded bg-light p-3 mx-auto">
          {act.error && <div className="rounded mb-3 bg-danger p-3 text-light fw-bold">{act.error}</div>}
          <h1>Activity Summary</h1>
          <table className="table">
            <tbody>
              <tr>
                <th>Program</th>
                <td>{act.data.program?.title}</td>
              </tr>
              <tr>
                <th>Profile</th>
                <td className="lead fw-bold">{`${act.data.profile?.forenames} ${act.data.profile?.lastname}`}</td>
              </tr>
              <tr>
                <th>Assessment</th>
                <td>{act.data.assessment?.title}</td>
              </tr>
              <tr>
                <th>Summary</th>
                <td>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="bg-success text-light">Question</th>
                        <th className="bg-success text-light px-3">Response</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ans?.map((a) => (
                        <tr>
                          <td className="px-3">{a.question}</td>
                          <td className="px-3 lead fw-bold">{a.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>Results</th>
                <td>{act.results}</td>
              </tr>
              <tr>
                <th>Recommendations</th>
                <td>{act.recommendations}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ActivityViewPage;
