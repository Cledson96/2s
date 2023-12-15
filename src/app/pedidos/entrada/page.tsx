"use client";

import Link from "next/link";
import ReactLoading from "react-loading";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { FormEvent, useState, useRef, useEffect, ChangeEvent } from "react";
import Home from "@/app/page";
import moment from "moment";
import { motoboys, clientes, pedidos, pedido } from "@/interface";
import TableOrders from "@/components/Tables/TableOrders";

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [motoboys, setMotoboys] = useState<motoboys[]>([]);
  const [clientes, setClientes] = useState<clientes[]>([]);
  const [pedidos, setPedidos] = useState<pedidos[]>();
  const [pedido, setPedido] = useState<pedido>({
    motoboy_id: 0,
    cliente_id: 0,
    expedido: 0,
    insucesso: 0,
    data: moment().format("YYYY-MM-DD"),
  });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pedidos/lista", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            motoboy_id: pedido.motoboy_id,
            data: pedido.data,
          }),
        });

        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [pedido.data, pedido.motoboy_id, refresh]);

  async function entrada(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (pedido.motoboy_id === 0 || pedido.cliente_id === 0) {
        setLoading(false);
        alert("Obrigatório selecionar o motoboy e o cliente.");
        return;
      }
      const response = await fetch("/api/pedidos/entrada", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (response.status === 500 || response.status === 400) {
        setLoading(false);
        throw new Error("Erro na requisição");
      }

      setRefresh(!refresh);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Erro ao cadastrar pedido");
      console.error("Erro na requisição:", error);
    }
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "data") {
      setPedido((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setPedido((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }
  };

  return (
    <Home>
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
      <div className="flex flex-col  xl:flex-row">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full xl:w-1/2">
          <form onSubmit={entrada}>
            <div className="p-6.5 pb-2 mx-auto w-full xl:w-1/2">
              <label className="mb-3 block text-black dark:text-white">
                Selecione a data do pedido
              </label>

              <input
                type="date"
                name="data"
                onChange={handleInputChange}
                defaultValue={pedido.data}
                className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="flex flex-col xl:flex-row">
              <div className="p-6.5 pr-0 w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Selecione o motoboy
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <MdOutlineSportsMotorsports size="1.4rem" color="black" />
                  </span>
                  <select
                    onChange={handleInputChange}
                    value={pedido.motoboy_id}
                    name="motoboy_id"
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  >
                    <option value={0}>Selecione o motoboy</option>
                    {motoboys.map((motoboy) => {
                      return (
                        <option key={motoboy.id} value={Number(motoboy.id)}>
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
                <label className="mb-2.5 block text-black dark:text-white">
                  Cliente
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <select
                    name="cliente_id"
                    onChange={handleInputChange}
                    value={pedido.cliente_id}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  >
                    <option value={0}>Selecione o cliente</option>
                    {clientes.map((client) => {
                      return (
                        <option key={client.id} value={Number(client.id)}>
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
            </div>
            {pedido.cliente_id !== 0 && pedido.motoboy_id !== 0 && (
              <>
                <div className="flex flex-col gap-1 xl:flex-row">
                  <div className="p-6.5 ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Pedidos expedidos
                    </label>
                    <input
                      name="expedido"
                      type="number"
                      onChange={handleInputChange}
                      value={pedido.expedido}
                      placeholder="Quantidade"
                      required
                      className="w-full max-w-45 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="p-6.5 ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Pedidos ausentes
                    </label>
                    <input
                      name="insucesso"
                      type="number"
                      placeholder="Quantidade"
                      onChange={handleInputChange}
                      value={pedido.insucesso}
                      required
                      className="w-full max-w-45 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex w-full max-w-45 items-center mx-auto mb-7 justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  {loading ? (
                    <ReactLoading
                      type="bubbles"
                      color="#fff"
                      height={30}
                      width={35}
                    />
                  ) : (
                    "Cadastrar pedido"
                  )}
                </button>
              </>
            )}
          </form>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full xl:w-1/2">
          {pedido.motoboy_id !== 0 ? (
            <TableOrders
              pedidos={pedidos}
              setPedido={setPedido}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ) : (
            <h1 className="text-lg text-center my-10 font-extrabold text-black">
              Selecione um motoboy
            </h1>
          )}
        </div>
      </div>
    </Home>
  );
}
