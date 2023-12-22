"use client";

import { Modal } from "antd";
import { cliente } from "@/interface";
import ReactLoading from "react-loading";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientes: cliente | undefined;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditClient({
  open,
  setOpen,
  clientes,
  refresh,
  setRefresh,
}: props) {
  const hideModal = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState<Partial<cliente> | undefined>(
    clientes
  );

  useEffect(() => {
    setCliente(clientes);
  }, [clientes]);

  const refreshClient = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  async function updateCliente(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    try {
      const resposta = await fetch("/api/clientes/editar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (resposta.status === 409) {
        alert("Email já cadastrado.");
        setLoading(false);
        return;
      } else if (resposta.status === 200) {
        setRefresh(!refresh);
        alert("Cliente atualizado com sucesso.");
        setLoading(false);
        setOpen(false);
      } else if (resposta.status === 408) {
        alert("Nome já cadastrado.");
        setLoading(false);
        return;
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
      <Modal
        title="Editar cliente"
        open={open}
        onCancel={hideModal}
        okText=""
        cancelText="cancelar"
        width={"70vw"}
        style={{ zIndex: "99999" }}
      >
        <form onSubmit={updateCliente} className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Nome <span className="text-meta-1">*</span>
              </label>
              <input
                name="nome"
                type="text"
                placeholder="Nome completo"
                value={cliente?.nome}
                onChange={(e) => {
                  refreshClient(e);
                }}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                onChange={(e) => {
                  refreshClient(e);
                }}
                name="email"
                type="email"
                value={cliente?.email}
                placeholder="Email do colaborador"
                required
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
                onChange={(e) => {
                  refreshClient(e);
                }}
                name="telefone"
                value={cliente?.telefone}
                type="number"
                placeholder="Telefone"
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Telefone alternativo
              </label>
              <input
                onChange={(e) => {
                  refreshClient(e);
                }}
                name="telefone2"
                value={cliente?.telefone2}
                type="number"
                placeholder="Telefone do cliente"
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
              "Atualizar"
            )}
          </button>
        </form>
      </Modal>
    </>
  );
}
