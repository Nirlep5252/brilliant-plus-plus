"use client";

import { GraduationCap } from "lucide-react";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import Img from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <div className="flex h-screen w-72 flex-col justify-between bg-accent text-foreground">
      <div className="flex flex-col">
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2">
          <div>
            <GraduationCap size={60} />
          </div>
          <div className="text-center text-3xl font-bold text-foreground">
            Edtech
          </div>
        </div>
        <div className="flex h-52 w-full flex-col gap-2 p-6">
          <Link href="/studio">
            <Button className="w-full">Dashboard</Button>
          </Link>
          <Link href="/studio/content">
            <Button className="w-full">Content</Button>
          </Link>
        </div>
      </div>
      <div>
        <div>
          {status == "loading" ? (
            <div>
              <Skeleton className="h-12 w-full" />
            </div>
          ) : session ? (
            <div className="flex w-full items-center justify-between border-t-2 border-border p-2">
              <div className="flex w-full items-center gap-4">
                <Img
                  src={session.user.image ?? ""}
                  alt="user"
                  className="h-8 w-8 rounded-full"
                  width={32}
                  height={32}
                />
                <div>{session.user.name}</div>
              </div>
              <Button variant={"ghost"} onClick={() => signOut()}>
                <LogOut />
              </Button>
            </div>
          ) : (
            <div>not logged in</div>
          )}
        </div>
      </div>
    </div>
  );
}
