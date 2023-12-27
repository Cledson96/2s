import { useState, Dispatch, SetStateAction } from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { admin } from "@/interface";
import EditUser from "../modal/editUser";
import { MdOutlineEditCalendar } from "react-icons/md";
import FotoModal from "../modal/fotoModal";

interface Props {
  user: admin[] | [];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Tabela_users({ user, refresh, setRefresh }: Props) {
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [img, setImg] = useState();
  const [edit, setEdit] = useState<admin>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    foto: "",
    senha: "",
    pix: "",
    administrador: "",
    ativo: "",
  });
  console.log(edit);

  const columns: ColumnsType<admin> = [
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
      title: "Foto",
      dataIndex: "foto",
      width: "120px",
      render: (info) => (
        <Space size="small">
          <button
            onClick={() => {
              setImg(info);
              setOpenImg(true);
            }}
            disabled={info ? false : true}
            className={`flex items-center justify-center w-full font-bold  ${
              info ? "text-primary" : "text-danger"
            }`}
          >
            {info ? "Abrir" : "Não possui"}
          </button>
        </Space>
      ),
    },
    {
      title: "Pix",
      dataIndex: "pix",
      width: "130px",
    },
    {
      title: "Ativo",
      dataIndex: "ativo",
      width: "130px",
    },
    {
      title: "Administrador",
      dataIndex: "administrador",
      width: "130px",
    },
    {
      title: "Ação",
      key: "action",
      width: "50px",
      render: (info: admin) => (
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
  const data = user.map((value) => {
    return {
      key: value.id,
      id: value.id,
      nome: value.nome,
      email: value.email,
      telefone: value.telefone,
      foto: value.foto,
      pix: value.pix,
      ativo: `${value.ativo ? "Sim" : "Não"}`,
      administrador: `${value.administrador ? "Sim" : "Não"}`,
    };
  });

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));

  const tableProps: TableProps<admin> = {
    bordered: true,
    size: "small",

    showHeader: true,
  };

  return (
    <>
      <EditUser
        open={open}
        setOpen={setOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        user={edit}
      />
      <Table
        {...tableProps}
        pagination={{ position: ["none", "bottomRight"] }}
        columns={tableColumns}
        dataSource={data}
        scroll={{ x: "100%" }}
      />
      <FotoModal openImg={openImg} setOpenImg={setOpenImg} foto={img} />
    </>
  );
}
