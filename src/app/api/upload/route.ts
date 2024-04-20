import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
}
