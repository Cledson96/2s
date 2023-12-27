"use client";

import { Modal } from "antd";
import { admin } from "@/interface";
import { FaEye } from "react-icons/fa";

import ReactLoading from "react-loading";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import FotoModal from "./fotoModal";

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: admin | undefined;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditUser({
  open,
  setOpen,
  user,
  refresh,
  setRefresh,
}: props) {
  const hideModal = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [usuario, setUsuario] = useState<Partial<admin> | undefined>(user);

  useEffect(() => {
    setUsuario(user);
  }, [user]);

  const refreshUser = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  async function updateUser(
    e: FormEvent<HTMLFormElement> | ChangeEvent<HTMLSelectElement>
  ) {
    /*  setLoading(true); */
    e.preventDefault();
    console.log(usuario);

    try {
      const resposta = await fetch("/api/admin/editar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (resposta.status === 409) {
        alert("Email já cadastrado.");
        setLoading(false);
        return;
      } else if (resposta.status === 200) {
        setRefresh(!refresh);
        alert("Usuário atualizado com sucesso.");
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
        title="Editar usuario"
        open={open}
        onCancel={hideModal}
        okText=""
        cancelText="cancelar"
        width={"70vw"}
        style={{ zIndex: "999" }}
      >
        <form onSubmit={updateUser} className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-2/6 ">
              <label className="mb-2.5 block text-black dark:text-white">
                Nome completo <span className="text-meta-1">*</span>
              </label>
              <input
                name="nome"
                type="text"
                placeholder="Nome completo"
                value={usuario?.nome}
                onChange={(e) => {
                  refreshUser(e);
                }}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-2/6">
              <label className="mb-2.5 block text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                onChange={(e) => {
                  refreshUser(e);
                }}
                name="email"
                type="email"
                value={usuario?.email}
                placeholder="Email do colaborador"
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/6">
              <label className="mb-2.5 block text-black dark:text-white">
                Administrador
              </label>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  name="administrador"
                  onChange={(e) => {
                    refreshUser(e);
                  }}
                  value={String(usuario?.administrador) || "Não"}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
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
            <div className="w-full xl:w-1/6">
              <label className="mb-2.5 block text-black dark:text-white">
                Ativo
              </label>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  name="ativo"
                  onChange={(e) => {
                    refreshUser(e);
                  }}
                  value={String(usuario?.ativo) || "Não"}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
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
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Telefone
              </label>
              <input
                onChange={(e) => {
                  refreshUser(e);
                }}
                name="telefone"
                value={usuario?.telefone}
                type="number"
                placeholder="Telefone"
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                PIX
              </label>
              <input
                onChange={(e) => {
                  refreshUser(e);
                }}
                name="pix"
                value={usuario?.pix}
                type="text"
                placeholder="PIX do colaborador"
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Foto
              </label>
              <div className="flex items-center">
                {" "}
                <input
                  onChange={(e) => {
                    refreshUser(e);
                  }}
                  name="foto"
                  value={usuario?.foto ?? ""}
                  type="text"
                  placeholder="Foto do usuário"
                  className=" w-5/6 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <span
                  onClick={() => {
                    setOpenImg(true);
                  }}
                  className="text-gray-500 sm:text-sm w-1/6 ml-2"
                >
                  <FaEye size="1.8rem" />
                </span>
              </div>
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
      <FotoModal
        openImg={openImg}
        setOpenImg={setOpenImg}
        foto={usuario?.foto}
      />
    </>
  );
}
