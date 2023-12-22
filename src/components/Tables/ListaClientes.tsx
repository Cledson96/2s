import { useState, Dispatch, SetStateAction } from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig } from "antd/es/table/interface";
import { cliente } from "@/interface";
import EditClient from "../modal/editClient";
import { MdOutlineEditCalendar } from "react-icons/md";

interface Props {
  cliente: cliente[] | [];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Tabela_clientes({
  cliente,
  refresh,
  setRefresh,
}: Props) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<cliente>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    telefone2: "",
  });
  const columns: ColumnsType<cliente> = [
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
      title: "Telefone alternativo",
      dataIndex: "telefone2",
      width: "130px",
    },
    {
      title: "Ação",
      key: "action",
      width: "50px",
      render: (info: cliente) => (
        <Space
          onClick={() => {
            setEdit(info);
            setOpen(true);
          }}
          size="small"
        >
          <a className="flex items-center justify-center">
            <span className="mr-2">
              <MdOutlineEditCalendar size="1.0rem" />
            </span>{" "}
            Editar
          </a>
        </Space>
      ),
    },
  ];
  const data = cliente.map((value) => {
    return {
      key: value.id,
      id: value.id,
      nome: value.nome,
      email: value.email,
      telefone: value.telefone,
      telefone2: value.telefone2,
    };
  });
  console.log(data);
  console.log(cliente);

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));

  const tableProps: TableProps<cliente> = {
    bordered: true,
    size: "small",
    showHeader: true,
  };

  return (
    <>
      <EditClient
        open={open}
        setOpen={setOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        clientes={edit}
      />
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
