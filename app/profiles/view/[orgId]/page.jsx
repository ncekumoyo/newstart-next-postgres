import React from "react";
import { executeFetch } from "@/lib/fetches";
import ProfilesView from "@/components/profilesView";

async function ProfilesViewByOrg({ params }) {
  const orgId = params.orgId;
  const profsData = executeFetch(`/api/profiles/view/${orgId}`);
  const profs = await profsData;

  return <ProfilesView profs={profs} orgId={orgId} />;
}

export default ProfilesViewByOrg;
