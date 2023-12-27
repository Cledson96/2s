"use client";

import { useState, useEffect } from "react";
import DropdownUser from "./DropdownUser";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

interface users {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
interface dados {
  ativo?: boolean | undefined;
  permissao?: boolean | undefined;
  user?: users;
}
interface sessions {
  dados?: dados;
  user?: users;
}
interface HeaderProps {
  session: sessions | null;
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}

export default function Header({
  session,
  sidebarOpen,
  setSidebarOpen,
}: HeaderProps) {
  const [currentDate, setCurrentDate] = useState(
    moment().format("DD [de] MMMM [de] YYYY - h:mm:ss a")
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(moment().format("DD [de] MMMM [de] YYYY - h:mm:ss a"));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden mr-auto ">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>
        <h1 className="flex hidden sm:flex">{currentDate}</h1>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <DropdownUser user={session?.dados?.user} />
        </div>
      </div>
    </header>
  );
}
