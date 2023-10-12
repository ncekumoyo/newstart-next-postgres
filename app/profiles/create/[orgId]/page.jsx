"use client";
import useFetch from "@/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import { useGlobalContext } from "@/contexts/globalContext";
import React, { useRef, useEffect } from "react";
import AuthHeader from "@/components/authHeader";

function ProfilesCreateUnderOrgPage() {
  const { user } = useGlobalContext();
  const { orgId } = useParams();

  const forenamesRef = useRef(null);
  const lastnameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);
  const dobRef = useRef(null);
  const genderRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const waistRef = useRef(null);

  const router = useRouter();
  const { data: createdProfile, loading, err, setErr, doFetch } = useFetch(`/api/profiles/create/${orgId}`);

  const options = [
    { value: "", text: "--- Choose an option ---" },
    { value: "female", text: "Female" },
    { value: "male", text: "Male" },
  ];

  useEffect(() => {
    if (createdProfile) {
      router.back();
    }
  }, [createdProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      forenames: forenamesRef.current?.value,
      lastname: lastnameRef.current?.value,
      address: addressRef.current?.value,
      phone: phoneRef.current?.value,
      dob: dobRef.current?.value,
      gender: genderRef.current.value || null,
      height: heightRef.current?.value,
      weight: weightRef.current?.value,
      waist: waistRef.current?.value,
    };

    if (!form.forenames || !form.lastname) {
      setErr("Missing required fields.");
      return;
    }

    doFetch({
      method: "POST",
      token: user?.token,
      body: JSON.stringify(form),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-5 mx-auto" style={{ maxWidth: "960px" }}>
          <AuthHeader title={"Create Profile"} />
          <form>
            {err && <div className="p-3 bg-danger text-light fw-bold rounded mb-3">{err}</div>}

            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Fore Names"
                  ref={forenamesRef}
                  required
                />
              </div>
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Last Name"
                  ref={lastnameRef}
                  required
                />
              </div>
              <div className="col-md-12 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Address"
                  ref={addressRef}
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Phone"
                  ref={phoneRef}
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="date"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Date of Birth"
                  ref={dobRef}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <select className="form-control mb-3 border-0 p-2 input-control" ref={genderRef}>
                  {options.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Height (cm)"
                  ref={heightRef}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Weight (kg)"
                  ref={weightRef}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Waist (cm)"
                  ref={waistRef}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-sm btn-success w-100 fw-bold p-2" onClick={handleSubmit}>
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProfilesCreateUnderOrgPage;
