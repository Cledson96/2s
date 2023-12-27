"use client";

import Link from "next/link";
import Home from "@/app/home";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Tabela_pedidos from "@/components/Tables/ListaPedidos";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/pt_BR";
import "dayjs/locale/pt-br";
import moment from "moment";
import { DatePicker } from "antd";
import { pedidosBoys } from "@/interface";

const { RangePicker } = DatePicker;

export default function Lista() {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [diaInicial, setDiaInicial] = useState(
    moment().startOf("month").format("DD/MM/YYYY")
  );
  const [diaFinal, setDiaFinal] = useState(moment().format("DD/MM/YYYY"));
  const [pedido, setPedido] = useState<pedidosBoys[]>([]);
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    const parteInicial = diaInicial.split("/");
    const dataIni = `${parteInicial[2]}-${parteInicial[1]}-${parteInicial[0]}`;

    const parteFinal = diaFinal.split("/");
    const dataFim = `${parteFinal[2]}-${parteFinal[1]}-${parteFinal[0]}`;

    const fetchData = async () => {
      try {
        const response = await fetch("/api/pedidos/listaBoys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataInicial: dataIni,
            dataFinal: dataFim,
          }),
        });

        const data = await response.json();
        setPedido(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [diaInicial, diaFinal, refresh]);
  return (
    <Home>
      <>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Lista de pedidos
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" href="/">
                  Pedidos /
                </Link>
              </li>
              <li className="font-medium text-primary">lista</li>
            </ol>
          </nav>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
          <h1 className="mb-5 text-lg font-bold text-black">
            Pedidos do dia:{" "}
            <span className="mb-5 font-normal">
              {" "}
              <RangePicker
                locale={locale}
                value={[
                  dayjs(diaInicial, dateFormat),
                  dayjs(diaFinal, dateFormat),
                ]}
                format={dateFormat}
                onChange={(date, dateString) => {
                  setDiaInicial(dateString[0]);
                  setDiaFinal(dateString[1]);
                }}
              />
            </span>
          </h1>

          {loading ? (
            <Loader />
          ) : (
            <Tabela_pedidos
              pedidos={pedido}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </>
    </Home>
  );
}
