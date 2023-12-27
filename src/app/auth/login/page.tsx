"use client";

import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Image from "next/image";
import fundo from "@/img/login/background.jpg";
import google from "@/img/login/google.png";
import facebook from "@/img/login/facebook.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

export default function Login() {
  const router = useRouter();
  const [loadingEntrar, setLoadingEntrar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ver, setVer] = useState(false);
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
    e.preventDefault();
    setLoadingEntrar(true);
    try {
      const result = await signIn("credentials", {
        email: (e.target as any).email.value,
        password: (e.target as any).password.value,
        tipo: "login",
        redirect: false,
      });
      console.log(result);
      setLoadingEntrar(false);
      if (result?.status === 401) {
        alert("Login incorreto. Verifique suas credenciais.");
      }
      /*  if (result?.error !== null) {
       // setError(true);
      } else {
       // router.push("/");
      
      } */
    } catch (error) {
      console.log(error);
      alert("Login incorreto. Verifique suas credenciais.");
      setLoadingEntrar(false);
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
                          type={ver ? "text" : "password"}
                          placeholder="Digite sua senha"
                          className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />

                        <span
                          onClick={() => setVer(!ver)}
                          className="absolute right-3 top-2.5"
                        >
                          {ver ? (
                            <GoEyeClosed size="22px" />
                          ) : (
                            <GoEye size="22px" />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <button
                        type="submit"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 flex items-center justify-center"
                        disabled={loadingEntrar}
                      >
                        {loadingEntrar ? (
                          <ReactLoading
                            type="bubbles"
                            color="#fff"
                            height={30}
                            width={35}
                          />
                        ) : (
                          "Entrar"
                        )}
                      </button>
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
