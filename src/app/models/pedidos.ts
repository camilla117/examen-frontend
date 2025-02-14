import { Articulos } from "./articulos";
import { ClienteArticulo } from "./clienteArticulo";

export interface Pedidos {
    articulo: Articulos;
    clienteArticulo: ClienteArticulo;
}