"use client";

import Link from "next/link";
import ReactLoading from "react-loading";
import Home from "@/app/home";
import { FormEvent, useState, useRef } from "react";
import { admin } from "@/interface";

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  async function cadastro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      (e.target as any).senha.value !== (e.target as any).senha_verifica.value
    ) {
      alert("As senhas precisam ser iguais!");
      return;
    }
    setLoading(true);

    const dados: Omit<Omit<admin, "foto">, "ativo"> = {
      nome: (e.target as any).nome.value,
      email: (e.target as any).email.value,
      telefone: (e.target as any).telefone.value,
      senha: (e.target as any).senha.value,
      pix: (e.target as any).pix.value,
      administrador: (e.target as any).administrador.value,
    };

    try {
      const resposta = await fetch("/api/admin/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (resposta.status === 409) {
        alert("Usuário já cadastrado.");
        setLoading(false);
        return;
      } else if (resposta.status === 200) {
        alert("Usuário cadastrado com sucesso.");
        if (formRef.current) {
          (formRef.current as HTMLFormElement).reset();
        }
        setLoading(false);
      } else {
        alert("Estamos com problemas no servidor, favor tente mais tarde!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Estamos com problemas no servidor, favor tente mais tarde!");
    }
  }
  return (
    <Home>
      <>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Cadastro de usuários
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" href="/">
                  Usuários /
                </Link>
              </li>
              <li className="font-medium text-primary">cadastro</li>
            </ol>
          </nav>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form ref={formRef} onSubmit={cadastro}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nome completo <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="nome"
                    type="text"
                    placeholder="Nome completo "
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email do colaborador"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Telefone
                  </label>
                  <input
                    name="telefone"
                    type="number"
                    placeholder="Telefone"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    PIX
                  </label>
                  <input
                    name="pix"
                    type="text"
                    placeholder="PIX do colaborador"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Administrador
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="administrador"
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option value="false">Não</option>
                      <option value="true">Sim</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Senha <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="senha"
                    type="password"
                    minLength={8}
                    placeholder="Digite sua senha"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Repetir senha <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="senha_verifica"
                    type="password"
                    minLength={8}
                    placeholder="Repetir a senha"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                {loading ? (
                  <ReactLoading
                    type="bubbles"
                    color="#fff"
                    height={30}
                    width={35}
                  />
                ) : (
                  "Cadastrar"
                )}
              </button>
            </div>
          </form>
        </div>
      </>
    </Home>
  );
}
