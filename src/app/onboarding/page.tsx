"use client";

import { UserRole } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";

export default function Onboarding() {
  const { data: session, status, update } = useSession();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  const { mutate } = api.user.setRole.useMutation();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="absolute flex h-screen w-screen items-center justify-center gap-4 text-5xl font-bold">
        Loading... <Loader2Icon className="h-20 w-20 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return router.push("/api/auth/signin");
  }

  if (session?.user.role !== UserRole.UNSET) {
    return router.push(callbackUrl ?? "/");
  }

  return (
    <div className="fixed z-50 flex h-screen w-screen flex-col items-center justify-center gap-10">
      <div className="text-xl">
        Welcome to Edtech Platform! Please select your role.
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant={"ghost"}
          className="flex h-40 flex-col items-center justify-center"
          onClick={async () => {
            mutate({ role: "student" });
            await update();
            router.push(callbackUrl ?? "/");
          }}
        >
          <div className="text-3xl">Learner</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-40 w-40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
        </Button>
        <Separator orientation="vertical" />
        <Button
          variant={"ghost"}
          className="flex h-40 flex-col items-center justify-center"
          onClick={async () => {
            mutate({ role: "creator" });
            await update();
            router.push(callbackUrl ?? "/");
          }}
        >
          <div className="text-3xl">Creator</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-40 w-40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
