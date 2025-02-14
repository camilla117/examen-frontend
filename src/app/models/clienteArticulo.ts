export interface ClienteArticulo {
    id?: string;
    clienteId?: string;
    articuloId?: string;
    cantidad: number;
    total: number;
    fecha?: string;
    idCompra: string;
}