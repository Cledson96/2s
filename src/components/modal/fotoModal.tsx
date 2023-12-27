"use client";

import { Modal } from "antd";

interface props {
  openImg: boolean;
  setOpenImg: React.Dispatch<React.SetStateAction<boolean>>;
  foto: string | undefined;
}

export default function FotoModal({ openImg, setOpenImg, foto }: props) {
  return (
    <Modal
      open={openImg}
      onOk={() => setOpenImg(false)}
      onCancel={() => setOpenImg(false)}
      okText="OK"
      width={"350px"}
      style={{ zIndex: "99999" }}
    >
      <img className="w-full h-full" alt="user" src={foto || ""} />
    </Modal>
  );
}
