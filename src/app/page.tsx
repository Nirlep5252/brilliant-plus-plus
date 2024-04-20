import { getServerAuthSession } from "~/server/auth";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const user = await getServerAuthSession();
  return (
    <div>
      {!user ? (
        <Link href={"/api/auth/signin"}>
          <Button>Sign In</Button>
        </Link>
      ) : (
        JSON.stringify(user)
      )}
    </div>
  );
}
