import React from "react";
import Link from "next/link";

function ProfilesView({ orgId, profs }) {
  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="bg-light rounded p-3 mx-auto" style={{ maxWidth: 800 }}>
          <h1 className="text-success">{profs.data[0]?.organization?.profile.orgName}</h1>
          <h2 className="display-6">Profile List</h2>
          <div className="d-flex justify-content-end">
            <Link href={`/profiles/create/${orgId}`} className="btn btn-success mb-3">
              New Profile
            </Link>
          </div>
          {profs.error && <div className="bg-danger p-5 text-center text-light fw-bold">{profs.error}</div>}
          {profs.data ? (
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th className="px-2">Fore Names</th>
                  <th className="px-2">Last Name</th>
                  <th className="px-2">Org Name</th>
                  <th className="px-2"></th>
                </tr>
              </thead>
              <tbody>
                {profs.data?.map((p) => (
                  <tr key={p.id}>
                    <td className="px-2">{p.forenames}</td>
                    <td className="px-2">{p.lastname}</td>
                    <td className="px-2">{p.orgName}</td>
                    <td className="px-2">
                      <div className="d-flex justify-content-end">
                        <Link href={`/profiles/view/${p.orgId}/${p.id}`} className="btn btn-sm btn-success mx-1">
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-5 display-6 text-center">No profiles registered.</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilesView;
