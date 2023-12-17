import React, { useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig } from "antd/es/table/interface";

interface DataType {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  pix: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Nome",
    dataIndex: "nome",
    width: "200px",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "200px",
  },
  {
    title: "Telefone",
    dataIndex: "telefone",
    width: "130px",
  },

  {
    title: "Ação",
    key: "action",
    width: "40px",
    render: () => (
      <Space size="small">
        <a>Editar</a>
      </Space>
    ),
  },
];

interface Props {
  motoboys: DataType[] | [];
}

export default function Tabela_boys({ motoboys }: Props) {
  const data = motoboys.map((value) => {
    return {
      key: value.id,
      id: value.id,
      nome: value.nome,
      email: value.email,
      telefone: value.telefone,
      cpf: value.cpf,
      endereco: value.endereco,
      pix: value.pix,
    };
  });
  const defaultExpandable = {
    expandedRowRender: (record: DataType) => (
      <ul>
        <li>Endereço: {record.endereco}</li>
        <li>CPF: {record.cpf}</li>
        <li>PIX: {record.pix}</li>
      </ul>
    ),
  };
  const [expandable, setExpandable] = useState<
    ExpandableConfig<DataType> | undefined
  >(defaultExpandable);

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));

  const tableProps: TableProps<DataType> = {
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
