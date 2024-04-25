
// Clase para guardar los datos del cliente que realize el descuento
// esto simula una interaccion con una base de datos

class Cliente {
    static id = 0

    constructor ( nombre, tarjeta, codigoSeguridad, email, direccion, historialDeCompras, categoria ) {
        this.id = ++Cliente.id
        this.nombre = nombre
        this.tarjeta = tarjeta
        this.codigoSeguridad = codigoSeguridad
        this.email = email
        this.direccion = direccion
        this.historialDeCompras = []
        this.categoria = []
    }

    agregarCompra(orden) {
        this.historialDeCompras.push(orden)
    }

    obtenerHistorial(orden) {
        return this.historialDeCompras
    }

    agregarCategoria(categoria) {
        this.categoria.push(categoria)
    }
}


