import { pedidos, pedido } from "@/interface";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Confirm from "../modal/confirm";
import { useState } from "react";

interface props {
  pedidos: pedidos[] | undefined;
  setPedido: React.Dispatch<React.SetStateAction<pedido>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TableOrders({
  pedidos,
  setPedido,
  refresh,
  setRefresh,
}: props) {
  const [open, setOpen] = useState(false);
  const [pedido, setPedidos] = useState<pedidos>();

  return pedidos && pedidos.length > 0 ? (
    <div className="rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-1 xl:pb-1">
      <Confirm
        open={open}
        setOpen={setOpen}
        pedido={pedido}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <h1 className="text-black text-xl font-bold mb-5 ml-5">
        {pedidos && pedidos[0] && pedidos[0].motoboy.nome} -{" "}
        {pedidos &&
          pedidos[0] &&
          moment.utc(pedidos[0].data).format("DD/MM/YYYY")}
      </h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Cliente
              </th>
              <th className="w-10 py-4 px-4 font-medium text-black dark:text-white">
                Expedido
              </th>
              <th className="w-10 py-4 px-4 font-medium text-black dark:text-white">
                Ausente
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {pedidos?.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.cliente.nome}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.expedido}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.insucesso}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() =>
                        setPedido((prevState) => ({
                          ...prevState,
                          cliente_id: item.cliente_id,
                          expedido: item.expedido,
                          insucesso: item.insucesso,
                        }))
                      }
                    >
                      <FaRegEdit size="1.4rem" />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        setPedidos(item);
                        setOpen(true);
                      }}
                    >
                      <MdOutlineDeleteOutline size="1.7rem" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <h1 className="text-lg text-center my-10 font-extrabold text-black">
      Nenhum pedido para a data e motoboy informado
    </h1>
  );
}
