"use client";

import Link from "next/link";
import ReactLoading from "react-loading";

import { FormEvent, useState, useRef } from "react";

interface motoboy {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  pix: string;
}

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  async function cadastro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const dados: motoboy = {
      nome: (e.target as any).nome.value,
      email: (e.target as any).email.value,
      telefone: (e.target as any).telefone.value,
      cpf: (e.target as any).cpf.value,
      endereco: (e.target as any).endereco.value,
      pix: (e.target as any).pix.value,
    };

    try {
      const resposta = await fetch("/api/motoboy/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (resposta.status === 409) {
        alert("Motoboy já cadastrado.");
        setLoading(false);
        return;
      } else if (resposta.status === 200) {
        alert("Motoboy cadastrado com sucesso.");
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
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Cadastro de motoboys
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/">
                Motoboys /
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
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  CPF
                </label>
                <input
                  name="cpf"
                  type="number"
                  placeholder="CPF do colaborador"
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
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Endereço
              </label>
              <input
                name="endereco"
                type="text"
                placeholder="Endereco completo"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
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
  );
}
