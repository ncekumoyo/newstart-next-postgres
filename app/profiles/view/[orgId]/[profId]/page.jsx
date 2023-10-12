import Link from "next/link";
import React from "react";
import { executeFetch } from "@/lib/fetches";

async function ProfilesViewSingleUnderOrg({ params }) {
  const orgId = params.orgId;
  const profId = params.profId;
  const profData = executeFetch(`/api/profiles/view/${orgId}/${profId}`);
  const prof = await profData;

  const age = (birthdate) => {
    const today = new Date();
    const age =
      today.getFullYear() -
      birthdate.getFullYear() -
      (today.getMonth() < birthdate.getMonth() ||
        (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age;
  };

  return (
    <section className="mb-3 flex-grow-1">
      <div className="container">
        <div className="rounded bg-light p-3 mx-auto" style={{ maxWidth: 600 }}>
          <h1 className="text-success">{`${prof.data.forenames} ${prof.data.lastname}`}</h1>
          <h2 className="display-6">Profile View</h2>
          <div className="d-flex justify-content-end mb-3">
            <Link href={`/profiles/activities/${orgId}/${profId}`} className="btn btn-success ms-2">
              Activities
            </Link>
            <Link href={`/profiles/edit/${orgId}/${profId}`} className="btn btn-warning ms-2">
              Edit
            </Link>
            <Link href={`/profiles/delete/${orgId}/${profId}`} className="btn btn-danger ms-2">
              Delete
            </Link>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <th>Fore name(s)</th>
                <td>{prof.data.forenames}</td>
              </tr>
              <tr>
                <th>Last name</th>
                <td>{prof.data.lastname}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{prof.data.address}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{prof.data.phone}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>
                  {prof.data.dob
                    ? new Date(prof.data.dob).toDateString() + " (" + age(new Date(prof.data.dob)) + " years old)"
                    : ""}
                </td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{prof.data.gender}</td>
              </tr>
              <tr>
                <th>Height (cm)</th>
                <td>{prof.data.height}</td>
              </tr>
              <tr>
                <th>Weight (kg)</th>
                <td>{prof.data.weight}</td>
              </tr>
              <tr>
                <th>Waist (cm)</th>
                <td>{prof.data.waist}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ProfilesViewSingleUnderOrg;
