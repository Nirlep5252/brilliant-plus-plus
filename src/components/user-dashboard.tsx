import React from "react";
import { useSession } from "next-auth/react";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  if (session) {
    return (
      <div>
        <h1>Welcome {session.user.name}</h1>
        <p>This is your dashboard</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Access Denied</h1>
    </div>
  );
}
