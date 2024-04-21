import { Inter } from "next/font/google";
import StudioSidebar from "~/components/studio/sidebar";
import { getServerAuthSession } from "~/server/auth";
import StudentSidebar from "~/components/student/sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Brilliant++",
  description: "~ Team Formality",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <div className="flex">
          <StudioSidebar />
          {children}
        </div>
      </body>
    </html>
  );
}

function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <div className="flex">
          <StudentSidebar />
          <div className="ml-72">{children}</div>
        </div>
      </body>
    </html>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session || session.user.role === "UNSET") {
    return <p>Access Denied</p>;
  }

  if (session.user.role === "STUDENT") {
    return <StudentLayout>{children}</StudentLayout>;
  }
  if (session.user.role === "CREATOR") {
    return <StudioLayout>{children}</StudioLayout>;
  }
}
