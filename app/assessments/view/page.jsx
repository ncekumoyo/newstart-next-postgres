import { executeFetch } from "@/lib/fetches";
import Link from "next/link";

const AssessmentsPage = async () => {
  const data = executeFetch(`/api/assessments/view`);

  const assessments = await data;

  return (
    <>
      <section className="mb-3">
        <div className="container">
          <div className="rounded p-3 mb-4 bg-light mx-auto text-center">
            <h1 className="display-6 fw-bold text-success">Assessments Hub</h1>
            <p className="lead mx-auto fw-bold" style={{ maxWidth: 600 }}>
              We offer various assessments to help you know just how well your body is doing.
            </p>
          </div>

          <div className="mb-2 row">
            <div className="col-lg-4 mb-2">
              <div className="d-flex align-itmes-start bg-success text-light rounded p-3 h-100">
                <i className="fa fa-question fa-3x m-3"></i>
                <p className="lead p-3 fw-bold">
                  Take any of our online assessments. It's as easy as answering just a few questions on our platform.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div className="d-flex align-itmes-start bg-success text-light rounded p-3 h-100">
                <i className="fa fa-line-chart fa-3x m-3"></i>
                <p className="lead p-3 fw-bold">
                  Track your perfomance on each assessment over a period to monitor your progress. Review your health
                  metrics.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div className="d-flex align-itmes-start bg-success text-light rounded p-3 h-100">
                <i className="fa fa-user-doctor fa-3x m-3"></i>
                <p className="lead p-3 fw-bold">
                  Receive recommendations based on your results and consult with some of our registered professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-grow-1 mb-3 bg-success">
        <div className="container">
          <div className="row pt-4">
            {assessments.error && <div className="bg-danger text-light p-3 fw-bold">{assessments.error}</div>}
            {assessments?.data?.map((a) => (
              <div className="col-lg-4 mb-4" key={a.id}>
                <div className="bg-light rounded h-100">
                  <Link href={`/assessments/${a.id}`} className="h-100">
                    <div className="p-3">
                      <h2 className="">{a.title}</h2>
                      <p className="lead">{a.description}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AssessmentsPage;
