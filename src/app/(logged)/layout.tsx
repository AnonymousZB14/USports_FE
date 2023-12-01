import { checkUser } from "@/api/user";
import type { Metadata } from "next";
import "../../styles/main.css";
// import "tailwindcss/tailwind.css";
import "../globals.css";
import { redirect } from "next/navigation";
import { UserProfile } from "@/types/user";
import Header from "@/containers/header";
import RecoilRootWrapper from "@/containers/recoilRootWrapper";
export const metadata: Metadata = {
  title: "USports",
  description: "usports",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res: UserProfile = await checkUser();
  if (!res) {
    redirect("/login");
  }
  return (
    <html>
      <body>
        <RecoilRootWrapper>
          <div id="wrap">
            <Header />
            <main id="main">{children}</main>
          </div>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
