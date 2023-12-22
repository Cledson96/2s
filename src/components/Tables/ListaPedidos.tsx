import { useState, Dispatch, SetStateAction } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig } from "antd/es/table/interface";

import { pedidosBoys } from "@/interface";

interface Props {
  pedidos: pedidosBoys[] | [];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Tabela_pedidos({
  pedidos,
  refresh,
  setRefresh,
}: Props) {
  const [open, setOpen] = useState(false);

  console.log("pedidos", pedidos);

  const columns: ColumnsType<pedidosBoys> = [
    {
      title: "Nome",
      dataIndex: "nome",
      width: "200px",
    },
    {
      title: "Expedidos",
      dataIndex: "expedidos",
      width: "200px",
    },
    {
      title: "Insucessos",
      dataIndex: "insucessos",
      width: "130px",
    },
    {
      title: "Total",
      dataIndex: "total",
      width: "130px",
    },
  ];
  const data = pedidos.map((value) => {
    const cli: any[] = [];
    for (let i = 0; i < value.pedidos.length; i++) {
      let verifica = cli.find(
        (ref: any) => ref.cliente_id == value.pedidos[i].cliente_id
      );
      if (!verifica) {
        cli.push({
          cliente_id: value.pedidos[i].cliente_id,
          nome: value.pedidos[i].cliente.nome,
          expedido: value.pedidos[i].expedido,
          insucesso: value.pedidos[i].insucesso,
        });
      } else {
        verifica.expedido += value.pedidos[i].expedido;
        verifica.insucesso += value.pedidos[i].insucesso;
      }
    }
    const expedidos = value.pedidos.reduce(
      (acc, value) => acc + value.expedido,
      0
    );
    const insucessos = value.pedidos.reduce(
      (acc, value) => acc + value.insucesso,
      0
    );
    return {
      key: value.id,
      id: value.id,
      nome: value.nome,
      expedidos: expedidos,
      insucessos: insucessos,
      total: expedidos - insucessos,
      clientes: cli,
    };
  });
  console.log("data", data);

  const defaultExpandable = {
    expandedRowRender: (record: any) => {
      console.log("Record:", record);

      return (
        <>
          <ul>
            {record.clientes.map((ref: any, index: any) => {
              return (
                <li className="flex flex-row">
                  <h1 className="mr-3">
                    Cliente:
                    <span className="font-bold">{ref.nome}</span>{" "}
                  </h1>
                  <h1 className="mr-3">
                    Expedido:
                    <span className="font-bold">{ref.expedido}</span>{" "}
                  </h1>
                  <h1>
                    Insucesso:
                    <span className="font-bold">{ref.insucesso}</span>{" "}
                  </h1>
                </li>
              );
            })}
          </ul>
        </>
      );
    },
  };

  const [expandable, setExpandable] = useState<
    ExpandableConfig<pedidosBoys> | undefined
  >(defaultExpandable);

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));

  const tableProps: TableProps<pedidosBoys | any> = {
    bordered: true,
    size: "small",
    expandable,
    showHeader: true,
  };

  return (
    <>
      <Table
        {...tableProps}
        pagination={{ position: ["none", "bottomRight"] }}
        columns={tableColumns}
        dataSource={data}
        scroll={{ x: "100%" }}
      />
    </>
  );
}
