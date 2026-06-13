import { redirect } from "next/navigation";

import { getCurrentUser, roleLabel } from "@/app/lib/current-user";
import { Topbar } from "@/components/layout/topbar";
import { Sidebar } from "@/components/ui/sidebar";
import { avatarCandidates } from "@/lib/avatar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  // The middleware already guards these routes; this is a defensive fallback.
  if (!user) redirect("/login");

  return (
    <div className="flex bg-[#F5F5F5]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT AREA */}
      <div className="w-full">
        <Topbar
          user={{ fullName: user.fullName, email: user.email }}
          roleLabel={roleLabel(user.role)}
          avatarSrcs={avatarCandidates({
            email: user.email,
            image: user.image,
            provider: user.provider ?? undefined,
            size: 80,
          })}
        />

        {/* PAGE CONTENT */}
        <main>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
