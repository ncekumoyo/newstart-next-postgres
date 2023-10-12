import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <main className="landing mb-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-column align-items-center rounded p-5">
            <i
              className="fa fa-heart-pulse fa-4x text-success bg-light p-2 rounded-circle mb-3"
              style={{ width: 80, height: 80 }}
            ></i>
            <h1 className="display-6 fw-bold">Newstart Health App</h1>
            <p className="lead fw-bold">CAPTURE | TRACK | REPORT</p>
            <p className="lead mx-auto text-center fw-bold" style={{ maxWidth: 500 }}>
              Take control. Make an assessment today. <br />
              Get informed on your vital metrics and how best to grow healthier.
            </p>
            <div className="d-flex justify-content-center">
              <Link href="/signup" className="btn btn-success me-3 fw-bold">
                Create an Account
              </Link>
              <Link href="/assessments" className="btn btn-light rounded fw-bold ">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>

      <section className="">
        <div className="container">
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

      <section className="mb-3 pt-3 bg-success">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="rounded bg-white p-3 h-100">
                <h2 className="display-6">Get to know us ...</h2>
                <p className="lead mb-3">
                  The Newstart Health App is brought to you by
                  <span className="fw-bold text-success"> Advent Hope Investments</span>. We conduct health research to
                  furnish our clients with the most accurate data collection and analysis.
                </p>
              </div>
            </div>

            <div className="col-lg-6 mb-3">
              <div className="rounded bg-white p-3 h-100">
                <h2 className="display-6">Our clients ...</h2>
                <p className="lead mb-3">
                  We serve <span className="text-success fw-bold">individual clients</span>, availing insights into
                  personal health metrics. We also serve
                  <span className="text-success fw-bold"> organizations</span>, providing tools to monitor the health
                  metrics of employees and attached clients.
                </p>
              </div>
            </div>

            <div className="col-12 mb-3">
              <div className="rounded bg-white p-3 h-100">
                <h2 className="display-6 mb-3">Team ...</h2>
                <div className="row">
                  <div className="col-lg-4 mb-3">
                    <div className="h-100 text-center">
                      <i
                        className="fa fa-user-tie fa-3x text-success border border-success border-5 p-2 mb-3 rounded-circle"
                        style={{ width: 80, height: 80 }}
                      ></i>
                      <h3 className="text-success">John Doe</h3>
                      <p className="lead">Chief Executive Officer</p>
                    </div>
                  </div>

                  <div className="col-lg-4 mb-3">
                    <div className="h-100 text-center">
                      <i
                        className="fa fa-user-doctor fa-3x text-success border border-success border-5 p-2 mb-3 rounded-circle"
                        style={{ width: 80, height: 80 }}
                      ></i>
                      <h3 className="text-success">Jane Doe</h3>
                      <p className="lead">Health Director</p>
                    </div>
                  </div>

                  <div className="col-lg-4 mb-3">
                    <div className="h-100 text-center">
                      <i
                        className="fa fa-user-graduate fa-3x text-success border border-success border-5 p-2 mb-3 rounded-circle"
                        style={{ width: 80, height: 80 }}
                      ></i>
                      <h3 className="text-success">Joe Doe</h3>
                      <p className="lead">Chief Technology Officer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-3">
        <div className="container">
          <div className="bg-light rounded p-3">
            <h2 className="display-6">We would love to hear from you ...</h2>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <div className="bg-success p-3 rounded text-light h-100">
                  <table>
                    <thead>
                      <tr>
                        <td className="p-3">
                          <i className="fa fa-at bg-white text-success rounded-circle p-2 "></i>
                        </td>
                        <td className="p-3">
                          <span className="fw-bold lead">newstart@adventhopeinv.org</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <i className="fa fa-phone bg-white text-success rounded-circle p-2"></i>
                        </td>
                        <td className="p-3">
                          <span className="fw-bold lead">+27 774098234</span>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>

              <div className="col-lg-6 mb-3">
                <div className="rounded bg-light">
                  <form>
                    <input
                      type="text"
                      className="form-control border-0 p-2 mb-3 input-control"
                      placeholder="Your email address..."
                    />
                    <input
                      type="text"
                      className="form-control border-0 p-2 mb-3 input-control"
                      placeholder="Title/Heading..."
                    />
                    <textarea
                      type="text"
                      className="form-control border-0 p-2 mb-3 input-control"
                      placeholder="Your message..."
                      rows={5}
                    ></textarea>
                    <button type="submit" className="btn btn-success w-100">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
