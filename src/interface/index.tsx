export interface cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  teledone2: string;
}
export interface motoboy {
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  pix: string;
}
export interface clientes {
  nome: string;
  id: number;
}
export interface motoboys {
  nome: string;
  id: number;
}

export interface pedido {
  motoboy_id: number;
  cliente_id: number;
  expedido: number;
  insucesso: number;
  data: any;
}
export interface pedidos {
  id: number;
  cliente_id: number;
  expedido: number;
  insucesso: number;
  data: any;
  entrada: string;
  motoboy: motoboy;
  cliente: cliente;
}
