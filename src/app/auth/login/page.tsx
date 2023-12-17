"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import fundo from "@/img/login/background.jpg";
import google from "@/img/login/google.png";
import facebook from "@/img/login/facebook.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      if (session) {
        verifica(session.user)
          .then((res) => {
            if (res?.status === 200) {
              router.push("/");
            } else {
              alert("Usuário não cadastrado");
              signOut();
              setLoading(false);
            }
          })
          .catch((err) => console.log("er", err));
      } else {
        setLoading(false);
      }
    }
  }, [status]);

  async function verifica(user: any) {
    try {
      const resposta = await fetch("/api/admin/verifica", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email || "" }),
      });
      return resposta;
    } catch (error) {
      console.log(error);
    }
  }
  async function loginGoogle() {
    await signIn("google", {
      redirect: false,
    });
    console.log("aqui");
  }

  async function loginEntrar(e: FormEvent<HTMLFormElement>) {
    alert("aq");
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email: (e.target as any).email.value,
        password: (e.target as any).password.value,
        tipo: "login",
        redirect: false,
      });
      console.log(result);
      /*  if (result?.error !== null) {
       // setError(true);
      } else {
       // router.push("/");
      
      } */
    } catch (error) {
      console.log(error);
      alert("Login incorreto. Verifique suas credenciais.");
    }
  }
  return (
    <>
      <div className="  bg-white shadow-default  min-h-screen max-h-screen">
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div className="flex flex-wrap  min-h-screen max-h-screen">
              <div className="hidden w-full xl:block xl:w-1/2 min-h-screen max-h-screen">
                <Image src={fundo} alt="Logo" className="h-full w-full" />
              </div>

              <div className="w-full border-stroke xl:w-1/2 items-center justify-center flex xl:border-l-2 min-h-screen max-h-screen">
                <div className="w-full max-w-125 max-h-full h-full p-10">
                  <h2 className="mb-7 text-lg font-bold text-black  sm:text-title-xl2">
                    Entre com sua conta
                  </h2>

                  <form onSubmit={loginEntrar}>
                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Digite seu email"
                          className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />

                        <span className="absolute right-3 top-2.5">
                          <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.5">
                              <path
                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Senha
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="password"
                          type="password"
                          placeholder="Digite sua senha"
                          className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />

                        <span className="absolute right-3 top-2.5">
                          <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.5">
                              <path
                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                fill=""
                              />
                              <path
                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <input
                        type="submit"
                        value="Entrar"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        loginGoogle();
                      }}
                      className="mb-3 flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    >
                      <span>
                        <Image
                          src={google}
                          alt="Logo-google"
                          height={25}
                          width={25}
                        />
                      </span>
                      Entrar com Google
                    </button>
                    <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                      <span>
                        <Image
                          src={facebook}
                          alt="Logo-facebook"
                          height={25}
                          width={25}
                        />
                      </span>
                      Entrar com Facebook
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
