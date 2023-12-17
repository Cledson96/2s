"use client";

import Link from "next/link";
import Home from "@/app/page";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Tabela_boys from "@/components/Tables/ListaMotoboys";

interface motoboy {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  pix: string;
}

export default function Lista() {
  const [loading, setLoading] = useState(true);
  const [motoboys, setMotoboys] = useState<motoboy[]>([]);

  console.log(motoboys);
  useEffect(() => {
    const getMotoboys = async () => {
      try {
        const resposta = await fetch("/api/motoboy/lista", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dados = await resposta.json();

        if (resposta.status === 200) {
          setMotoboys(dados);
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

    getMotoboys();
  }, []);

  return (
    <Home>
      <>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Lista de motoboys
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" href="/">
                  Motoboys /
                </Link>
              </li>
              <li className="font-medium text-primary">lista</li>
            </ol>
          </nav>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
          {loading ? <Loader /> : <Tabela_boys motoboys={motoboys} />}
        </div>
      </>
    </Home>
  );
}
