"use client";

import { useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
interface HomeProps {
  children: ReactNode | Element | any;
}
export default function Home({ children }: HomeProps) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, status } = useSession();

  console.log(session);

  useEffect(() => {
    const verificarLogin = async () => {
      if (status === "loading") {
        return;
      }

      if (!session) {
        router.push("/api/auth/signin");
      }
    };

    const timeout = setTimeout(() => {
      verificarLogin();
    }, 1000);
  }, [session, status, router]);

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {status === "loading" ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                user={session?.user}
              />

              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
