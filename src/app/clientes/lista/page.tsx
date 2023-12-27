"use client";

import Link from "next/link";
import Home from "@/app/home";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Tabela_clientes from "@/components/Tables/ListaClientes";

interface cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  telefone2: string;
}

export default function Lista() {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [clientes, setClientes] = useState<cliente[]>([]);

  useEffect(() => {
    const getClientes = async () => {
      try {
        const resposta = await fetch("/api/clientes/lista", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dados = await resposta.json();

        if (resposta.status === 200) {
          setClientes(dados);
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
    };

    getClientes();
  }, [refresh]);

  return (
    <Home>
      <>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Lista de clientes
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" href="/">
                  Clientes /
                </Link>
              </li>
              <li className="font-medium text-primary">lista</li>
            </ol>
          </nav>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
          {loading ? (
            <Loader />
          ) : (
            <Tabela_clientes
              cliente={clientes}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </>
    </Home>
  );
}
