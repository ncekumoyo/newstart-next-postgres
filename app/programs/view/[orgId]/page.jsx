import { executeFetch } from "@/lib/fetches";
import Link from "next/link";

const ProgramsByOrgPage = async ({ params }) => {
  const orgId = params.orgId;
  const data = executeFetch(`/api/programs/view/${orgId}`);
  const programs = await data;

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="mx-auto bg-light rounded p-3" style={{ maxWidth: 800 }}>
          <h1 className="display-6">Programs</h1>
          <div className="d-flex justify-content-end mb-3">
            <Link href={`/programs/create/${orgId}`} className="btn btn-sm btn-success">
              Add Program
            </Link>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {programs.data.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>
                    <div className="d-flex">
                      <Link href={`/activities/view/${orgId}/${p.id}`} className="btn btn-success btn-sm me-2">
                        Activities
                      </Link>
                      <Link href={`/programs/edit/${orgId}/${p.id}`} className="btn btn-warning btn-sm me-2">
                        Edit
                      </Link>
                      <Link href={`/programs/delete/${orgId}/${p.id}`} className="btn btn-danger btn-sm me-2">
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProgramsByOrgPage;
