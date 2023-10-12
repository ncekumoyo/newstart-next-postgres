"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/contexts/globalContext";

const Navbar = () => {
  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  return (
    <nav className="mt-2 mb-4">
      <div className="container">
        <div className="d-flex bg-white rounded">
          {/* Brand/Home link */}
          <Link href={"/"} className="fw-bold me-auto bg-success p-3 rounded">
            <div className="d-flex align-items-center text-light">
              <i className="fa fa-heart-pulse fa-2x me-2"></i>
              NEWSTART
            </div>
          </Link>
          {/* navigation links */}
          <div className="flex-grow-1 d-flex align-items-center justify-content-end flex-wrap ms-auto px-3 fw-bold text-success">
            {user?.type === "organization" && (
              <>
                <Link href={`/dashboard`} className="mx-2">
                  Dashboard
                </Link>
                <Link href={`/profiles/view/${user.id}`} className="mx-2">
                  Profiles
                </Link>
                <Link href={`/programs/view/${user?.id}`} className="mx-2">
                  Programs
                </Link>
                <Link href={`/activities/view/${user?.id}`} className="mx-2">
                  Activities
                </Link>
              </>
            )}
            <Link href={"/assessments/view"} className="mx-2">
              Assessments
            </Link>
            {user?.type === "admin" && (
              <>
                <Link href={`/assessments/create`} className="mx-2">
                  Add Assessment
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
