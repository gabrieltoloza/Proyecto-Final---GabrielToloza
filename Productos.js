class Productos {
    static id = 0

    constructor(marca, detalles, precio, categoria, imagenUrl) {
        this.id = ++Productos.id
        this.marca = marca
        this.detalles = detalles
        this.precio = precio
        this.categoria = categoria
        this.imagenUrl = imagenUrl
    }
    
}



// clase para guardar los datos del cliente que realize la compra
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


const bienvenida = document.querySelector('.bienvenida')
const session = JSON.parse(sessionStorage.getItem("usuarioReprocann"))

let cliente;

function crearCliente (session) {
    
    if (!session) {
        return
    } else {

        const [nombre, email, categoriaReprocann, dni, historialDeCompras] = session
        cliente = new Cliente(nombre, email, categoriaReprocann, dni, historialDeCompras)
        cliente.agregarCompra(historialDeCompras)
        bienvenida.innerHTML = `Bienvenido <b class="bienvenida-nombre"> ${cliente.nombre} </b> a Verde Pampa`
    }
    return cliente
}
crearCliente(session)


