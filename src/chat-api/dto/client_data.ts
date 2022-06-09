export interface ClientData {
  cliente: Cliente;
  tipoEnvio: string;
  direccion: Direccion;
  idOrden: string;
  fechaDelPedido: string;
  productos: Producto[];
  idPoc: string;
  pago: string;
  comentario: string;
  cupon: string;
  envio: string;
  total: string;
}

export interface Cliente {
  nombre: string;
  celular: string;
  correo: string;
}

export interface Direccion {
  primaria: string;
  ciudad: string;
  coordenadas: string;
}

export interface Producto {
  nombre: string;
  cantidad: string;
  precio: number;
  id: string;
}
