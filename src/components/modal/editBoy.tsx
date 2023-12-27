"use client";

import { Modal } from "antd";
import { motoboy } from "@/interface";
import ReactLoading from "react-loading";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  motoboy: motoboy | undefined;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditBoy({
  open,
  setOpen,
  motoboy,
  refresh,
  setRefresh,
}: props) {
  const hideModal = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [boy, setBoy] = useState<Partial<motoboy> | undefined>(motoboy);

  useEffect(() => {
    setBoy(motoboy);
  }, [motoboy]);

  const refreshBoy = (e: ChangeEvent<HTMLInputElement>) => {
    setBoy({ ...boy, [e.target.name]: e.target.value });
  };

  async function updateBoy(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    try {
      const resposta = await fetch("/api/motoboy/editar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boy),
      });

      if (resposta.status === 409) {
        alert("Email já cadastrado.");
        setLoading(false);
        return;
      } else if (resposta.status === 200) {
        setRefresh(!refresh);
        alert("Motoboy atualizado com sucesso.");
        setLoading(false);
        setOpen(false);
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
        title="Editar motoboy"
        open={open}
        onCancel={hideModal}
        okText=""
        cancelText="cancelar"
        width={"70vw"}
        style={{ zIndex: "99999" }}
      >
        <form onSubmit={updateBoy} className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Nome completo <span className="text-meta-1">*</span>
              </label>
              <input
                name="nome"
                type="text"
                placeholder="Nome completo"
                value={boy?.nome}
                onChange={(e) => {
                  refreshBoy(e);
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
                  refreshBoy(e);
                }}
                name="email"
                type="email"
                value={boy?.email}
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
                onChange={(e) => {
                  refreshBoy(e);
                }}
                name="telefone"
                value={boy?.telefone}
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
                onChange={(e) => {
                  refreshBoy(e);
                }}
                name="cpf"
                value={boy?.cpf}
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
                onChange={(e) => {
                  refreshBoy(e);
                }}
                name="pix"
                value={boy?.pix}
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
              onChange={(e) => {
                refreshBoy(e);
              }}
              defaultValue={boy?.endereco}
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
              "Atualizar"
            )}
          </button>
        </form>
      </Modal>
    </>
  );
}
