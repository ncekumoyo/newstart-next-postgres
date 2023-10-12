"use client";
import CountBox from "@/components/countBox";
import { useGlobalContext } from "@/contexts/globalContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const { user } = useGlobalContext();
  //const { id } = useParams();

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="d-flex rounded">
          <div style={{ width: 200 }}>
            <div className="rounded bg-success text-center text-white p-3 mb-2">
              <i
                className="fa fa-user fa-3x text-success bg-white rounded-circle p-3 mb-3"
                style={{ width: 90, height: 90 }}
              ></i>
              <h2 className="display-6 fw-bold">{user?.orgName}</h2>
            </div>
            <div className="rounded bg-light mb-2 p-3"></div>
          </div>
          <div className="flex-grow-1 ms-3">
            <div className="d-flex bg-light rounded p-2 mb-2">
              <h1 className="display-6 me-auto">Dashboard</h1>
              <div className="d-flex align-items-center ms-auto">
                {/* <Link href={"#"} className="btn btn-success ms-2">
                  Program
                </Link> */}
              </div>
            </div>

            <div className="d-flex justify-content-end flex-wrap">
              <CountBox count={3} title={"Programs"} route={`/programs/${user?.id}`} />
              <CountBox count={47} title={"Clients"} route={`/profiles/${user?.id}`} />
              <CountBox count={132} title={"Activities"} route={`/activities/${user?.id}`} />
              <CountBox count={8} title={"Clerks"} route={`#`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
