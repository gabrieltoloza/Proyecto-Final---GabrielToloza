
// Clase para guardar los datos del cliente que realize el descuento
// esto simula una interaccion con una base de datos

class Cliente {
    static id = 0

    constructor ( nombre, email, categoriaReprocann, dni ) {
        this.id = ++Cliente.id
        this.nombre = nombre
        this.email = email
        this.categoriaReprocann = categoriaReprocann
        this.dni = dni
        this.historialDeCompras = []
    }

    agregarCompra(orden) {
        this.historialDeCompras.push(orden)
    }

    obtenerHistorial(orden) {
        return this.historialDeCompras
    }
}


