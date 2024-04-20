import React from "react";
import { useSession } from "next-auth/react";
export const UserDashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Welcome {session?.user?.name}</h1>
    </div>
  );
};
