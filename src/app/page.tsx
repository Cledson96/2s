"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

import Home from "./home";

import CardDataStats from "@/components/CardDataStats";
import Ranking from "@/components/Tables/Ranking";

import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/pt_BR";
import "dayjs/locale/pt-br";

import { CiDeliveryTruck } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { LiaMotorcycleSolid } from "react-icons/lia";
import { BsBuildings } from "react-icons/bs";

import { pedidosBoys } from "@/interface";

export default function Dashboard() {
  const [diaInicial, setDiaInicial] = useState(
    moment().startOf("month").format("DD/MM/YYYY")
  );
  const [diaFinal, setDiaFinal] = useState(moment().format("DD/MM/YYYY"));
  const [data, setData] = useState<pedidosBoys[]>([]);
  const [infos, setInfos] = useState({
    expedidos: 0,
    insucessos: 0,
    motoboys: 0,
    clientes: 0,
  });
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

        const data: pedidosBoys[] = await response.json();
        setData(data);
        const boys = data.length || 0;
        let pedidos = 0;
        let insucesso = 0;
        let clientes: number[] = [];
        for (const inf of data) {
          inf.pedidos.map((value) => clientes.push(value.cliente_id));
          let criados = inf.pedidos.reduce(
            (acc, curr) => acc + curr.expedido,
            0
          );
          let insuc = inf.pedidos.reduce(
            (acc, curr) => acc + curr.insucesso,
            0
          );
          pedidos += criados;
          insucesso += insuc;
        }
        const clientesSemRepeticao = Array.from(new Set(clientes));

        setInfos({
          ...infos,
          motoboys: boys,
          expedidos: pedidos,
          insucessos: insucesso,
          clientes: clientesSemRepeticao.length,
        });
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [diaInicial, diaFinal]);

  return (
    <>
      <Home>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white flex items-center">
            Dashboard -
            <RangePicker
              className="ml-2"
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
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" href="/">
                  Dashboard
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Pedidos expedidos" total={infos.expedidos}>
            <CiDeliveryTruck size="1.8rem" color="#3C50E0" />
          </CardDataStats>
          <CardDataStats title="Insucessos" total={infos.insucessos}>
            <IoWarningOutline size="1.8rem" color="#3C50E0" />
          </CardDataStats>
          <CardDataStats title="Motoboys utilizados" total={infos.motoboys}>
            <LiaMotorcycleSolid size="1.8rem" color="#3C50E0" />
          </CardDataStats>
          <CardDataStats title="Clientes atendidos" total={infos.clientes}>
            <BsBuildings size="1.8rem" color="#3C50E0" />
          </CardDataStats>
        </div>
        <div className="mt-4 flex">
          <div className="w-full ">
            <Ranking pedidos={data} />
          </div>
        </div>
      </Home>
    </>
  );
}
