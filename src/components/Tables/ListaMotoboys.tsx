import { useState, Dispatch, SetStateAction } from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig } from "antd/es/table/interface";
import { motoboy } from "@/interface";
import EditBoy from "../modal/editBoy";
import { MdOutlineEditCalendar } from "react-icons/md";

interface Props {
  motoboys: motoboy[] | [];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Tabela_boys({ motoboys, refresh, setRefresh }: Props) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<motoboy>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    endereco: "",
    pix: "",
  });
  const columns: ColumnsType<motoboy> = [
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
      width: "50px",
      render: (info: motoboy) => (
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
    expandedRowRender: (record: motoboy) => (
      <ul>
        <li>
          Endereço:
          <span className="font-bold">
            {record.endereco ?? "Não informado"}
          </span>{" "}
        </li>
        <li>
          CPF:<span className="font-bold">{record.cpf ?? "Não informado"}</span>{" "}
        </li>
        <li>
          PIX:<span className="font-bold">{record.pix ?? "Não informado"}</span>{" "}
        </li>
      </ul>
    ),
  };
  const [expandable, setExpandable] = useState<
    ExpandableConfig<motoboy> | undefined
  >(defaultExpandable);

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));

  const tableProps: TableProps<motoboy> = {
    bordered: true,
    size: "small",
    expandable,
    showHeader: true,
  };

  return (
    <>
      <EditBoy
        open={open}
        setOpen={setOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        motoboy={edit}
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
