import React from "react";
import { executeFetch } from "@/lib/fetches";
import ProfilesView from "@/components/profilesView";

async function ProfilesViewAllPage({ params, searchParams }) {
  const profsData = executeFetch(`/api/profiles/view`);
  const profs = await profsData;

  return <ProfilesView profs={profs} />;
}

export default ProfilesViewAllPage;
