"use client";

import Link from "next/link";
import ReactLoading from "react-loading";
import Home from "@/app/home";

import { FormEvent, useState, useRef } from "react";

interface clientes {
  nome: string;
  email: string;
  telefone: string;
  telefone2: string;
}

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  async function cadastro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const dados: clientes = {
      nome: (e.target as any).nome.value,
      email: (e.target as any).email.value,
      telefone: (e.target as any).telefone.value,
      telefone2: (e.target as any).telefone2.value,
    };

    try {
      const resposta = await fetch("/api/clientes/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (resposta.status === 409) {
        alert("Cliente já cadastrado.");
        setLoading(false);
        return;
      } else if (resposta.status === 200) {
        alert("Cliente cadastrado com sucesso.");
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
            Cadastro de clientes
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" href="/">
                  Clientes /
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
                    Nome <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="nome"
                    type="text"
                    placeholder="Nome cliente"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email do cliente"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
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

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Telefone alternativo
                  </label>
                  <input
                    name="telefone2"
                    type="number"
                    placeholder="Telefone alternativo"
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
                  "Cadastrar cliente"
                )}
              </button>
            </div>
          </form>
        </div>
      </>
    </Home>
  );
}
