"use client";

import Link from "next/link";
import ReactLoading from "react-loading";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { FormEvent, useState, useRef, useEffect } from "react";

interface clientes {
  nome: string;
  id: number;
}
interface motoboys {
  nome: string;
  id: number;
}
export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [motoboys, setMotoboys] = useState<motoboys[]>([]);
  const [clientes, setClientes] = useState<clientes[]>([]);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/motoboy/lista");
        const response2 = await fetch("/api/clientes/lista");
        if (!response.ok || !response2.ok) {
          throw new Error("Erro na requisição");
        }

        const result: motoboys[] = await response.json();
        const result2: clientes[] = await response2.json();
        setMotoboys(result);
        setClientes(result2);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Entrada de pedidos
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/">
                Pedidos /
              </Link>
            </li>
            <li className="font-medium text-primary">entrada</li>
          </ol>
        </nav>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-3 xl:flex-row">
          <div className="p-6.5 w-full xl:w-1/2">
            <label className="mb-3 block text-black dark:text-white">
              Selecione o motoboy
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                <MdOutlineSportsMotorsports size="1.4rem" color="black" />
              </span>
              <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                {motoboys.map((motoboy) => {
                  return (
                    <option key={motoboy.id} value={motoboy.id}>
                      {motoboy.nome}
                    </option>
                  );
                })}
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
          <div className="p-6.5 w-full xl:w-1/2">
            <label className="mb-3 block text-black dark:text-white">
              Selecione a data do pedido
            </label>

            <input
              type="date"
              className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <form ref={formRef}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Cliente
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    {clientes.map((client) => {
                      return (
                        <option key={client.id} value={client.id}>
                          {client.nome}
                        </option>
                      );
                    })}
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
  );
}
