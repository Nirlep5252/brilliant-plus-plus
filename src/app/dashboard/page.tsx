"use client";

import { useSession } from "next-auth/react";

import UserDashboard from "~/components/user-dashboard";
import CreatorDashboard from "~/components/creator-dashboard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Access Denied</div>;
  if (!session) {
    return <div>Access Denied</div>;
  }
  if (session.user.role === "STUDENT") {
    return <UserDashboard />;
  }
  if (session.user.role === "CREATOR") {
    return <div>Admin Dashboard</div>;
  }
  return <div>Role not found</div>;
}
