import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig } from "antd/es/table/interface";
import { pedidosBoys } from "@/interface";

interface Props {
  pedidos: pedidosBoys[] | [];
}

const columns: ColumnsType<pedidosBoys | any> = [
  {
    title: "#",
    dataIndex: "posicao",
    width: "50px",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Nome",
    dataIndex: "nome",
    width: "200px",
  },
  {
    title: "Expedidos",
    dataIndex: "expedidos",
    width: "130px",
    sorter: (a, b) => a.expedidos - b.expedidos,
  },
  {
    title: "Insucessos",
    dataIndex: "insucessos",
    width: "130px",
    sorter: (a, b) => a.insucessos - b.insucessos,
  },
  {
    title: "Total",
    dataIndex: "total",
    width: "130px",
    sorter: (a, b) => a.total - b.total,
    defaultSortOrder: "descend",
  },
];

export default function Ranking({ pedidos }: Props) {
  const data = pedidos.map((value) => {
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
    };
  });
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));
  const tableProps: TableProps<pedidosBoys | any> = {
    bordered: true,
    size: "small",
    showHeader: true,
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Ranking de entregas
      </h4>

      <div className="flex flex-col">
        <Table
          {...tableProps}
          pagination={{ position: ["none", "bottomRight"] }}
          columns={tableColumns}
          dataSource={data}
          scroll={{ x: "100%" }}
        />
      </div>
    </div>
  );
}
