export interface cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  telefone2: string;
}
export interface motoboy {
  id: number;
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

export interface admin {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone: string;
  foto: string;
  pix: string;
  administrador: boolean | string;
  ativo: boolean | string;
}
interface pedidosTotal extends pedidos {
  cliente: cliente;
}

export interface pedidosBoys extends motoboy {
  pedidos: pedidosTotal[];
}
