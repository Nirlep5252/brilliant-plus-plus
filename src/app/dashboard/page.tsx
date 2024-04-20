"use client";

import { useSession } from "next-auth/react";
import { UserFeedPage } from "~/components/student/user-feed";
import { StudioDashboard } from "~/components/studio/dashboard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Access Denied</div>;
  if (!session || session.user.role === "UNSET") {
    return <div>Access Denied</div>;
  }

  if (session.user.role === "STUDENT") return <UserFeedPage />;
  if (session.user.role === "CREATOR") return <StudioDashboard />;
}
