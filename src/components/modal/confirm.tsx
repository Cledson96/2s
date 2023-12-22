"use client";

import { Modal } from "antd";
import { pedidos } from "@/interface";
import moment from "moment";

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pedido: pedidos | undefined;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Confirm({
  open,
  setOpen,
  pedido,
  refresh,
  setRefresh,
}: props) {
  const hideModal = () => {
    setOpen(false);
  };

  async function deletar(id: number | undefined) {
    try {
      const response = await fetch(`/api/pedidos/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Erro na requisição");
      }
      setRefresh(!refresh);
    } catch (error) {
      alert("Erro ao deletar pedido");
      console.error("Erro na requisição:", error);
    }
  }
  return (
    <>
      <Modal
        title="Deletar pedido"
        open={open}
        onOk={() => deletar(pedido?.id)}
        onCancel={hideModal}
        okText="deletar"
        cancelText="cancelar"
      >
        <p>Tem certeza que deseja excluir o pedido:</p>
        <p>
          Motoboy:
          <span className="ml-2 font-bold">
            {pedido ? pedido.motoboy.nome : "Carregando"}
          </span>{" "}
        </p>
        <p>
          Cliente:{" "}
          <span className="ml-2 font-bold">
            {pedido ? pedido.cliente.nome : "Carregando"}
          </span>{" "}
        </p>
        <p>
          Data:{" "}
          <span className="ml-2 font-bold">
            {" "}
            {pedido
              ? moment.utc(pedido.data).format("DD/MM/YYYY")
              : "Carregando"}
          </span>
        </p>
      </Modal>
    </>
  );
}
