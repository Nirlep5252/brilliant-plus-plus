import React from "react";
import { useSession } from "next-auth/react";

export default function CreatorDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }
  if (session) {
    return (
      <div>
        <h1>Creator Dashboard</h1>
        <p>Welcome {session.user.name}</p>
      </div>
    );
  }
  return <div>Access Denied</div>;
}
