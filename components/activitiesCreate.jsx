"use client";
import React, { useState } from "react";

function ActivitiesCreate({ prog, profs, asses }) {
  const [profile, setProfile] = useState(null);
  const [ass, setAss] = useState(null);
  return (
    <form>
      <div className="mb-3">
        <label>Program</label>
        <h2 className="lead">{prog.data?.title}</h2>
        <p className="lead">{profile && `${profile?.forenames} ${profile?.lastname}`}</p>
        <p className="lead">{ass?.title}</p>
      </div>
      <div className=" mb-3">
        <label>Profile</label>
        <select className="form-control input-control">
          <option
            value=""
            onSelect={() => {
              setProfile(null);
            }}
          >
            --- Choose an option ---
          </option>
          {profs.data.map((p) => (
            <option
              key={p.id}
              onSelect={() => {
                console.log("...prof selected");
                setProfile(p);
              }}
            >{`${p.forenames} ${p.lastname}`}</option>
          ))}
        </select>
      </div>
      <div className=" mb-3">
        <label>Assessment</label>
        <select className="form-control input-control">
          <option
            value=""
            onSelect={() => {
              setAss(null);
            }}
          >
            --- Choose an option ---
          </option>
          {asses.data.map((a) => (
            <option
              key={a.id}
              onSelect={() => {
                setAss(a);
              }}
            >
              {a.title}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default ActivitiesCreate;
