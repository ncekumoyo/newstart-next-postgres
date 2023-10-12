"use client";
import useFetch from "@/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import { useGlobalContext } from "@/contexts/globalContext";
import React, { useRef, useEffect } from "react";
import AuthHeader from "@/components/authHeader";

function ProfilesEditUnderOrg() {
  const { user } = useGlobalContext();
  const { orgId, profId } = useParams();

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
  const { data: profile, doFetch: getProfile } = useFetch(`/api/profiles/view/${orgId}/${profId}`);
  const {
    data: updatedProfile,
    loading,
    err,
    setErr,
    doFetch: doUpdate,
  } = useFetch(`/api/profiles/edit/${orgId}/${profId}`);

  useEffect(() => {
    if (user) {
      getProfile({ method: "GET", token: user.token });
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      genderRef.current.value = profile.gender || "";
    }
  }, [profile]);

  useEffect(() => {
    if (updatedProfile) {
      router.push(`/profiles/view/${orgId}/${profId}`);
    }
  }, [updatedProfile]);

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

    doUpdate({
      method: "PUT",
      token: user.token,
      body: JSON.stringify(form),
    });
  };

  return (
    <section className="flex-grow-1 mb-3">
      <div className="container">
        <div className="rounded bg-light p-5 mx-auto" style={{ maxWidth: "960px" }}>
          <AuthHeader title={"Edit Profile"} />
          <form>
            {err && <div className="p-3 bg-danger text-light fw-bold rounded mb-3">{err}</div>}

            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Fore Names"
                  ref={forenamesRef}
                  defaultValue={profile?.forenames}
                  required
                />
              </div>
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Last Name"
                  ref={lastnameRef}
                  defaultValue={profile?.lastname}
                  required
                />
              </div>
              <div className="col-12 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Address"
                  ref={addressRef}
                  defaultValue={profile?.address}
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="text"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Phone"
                  ref={phoneRef}
                  defaultValue={profile?.phone}
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="date"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Date of Birth"
                  ref={dobRef}
                  defaultValue={profile?.dob?.split("T")[0]}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <select className="form-control mb-3 border-0 p-2 input-control" ref={genderRef}>
                  <option value={""}>--- Select an option ---</option>
                  <option value={"female"}>Female</option>
                  <option value={"male"}>Male</option>
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Height (cm)"
                  ref={heightRef}
                  defaultValue={profile?.height}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Weight (kg)"
                  ref={weightRef}
                  defaultValue={profile?.weight}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control mb-3 border-0 p-2 input-control"
                  placeholder="Waist (cm) "
                  ref={waistRef}
                  defaultValue={profile?.waist}
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

export default ProfilesEditUnderOrg;
