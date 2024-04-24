// ESTE FICHERO CONTIENE LA LOGICA DE REGISTRAR EL USUARIO REPROCANN Y MOSTRAR SUS ULTIMOS PRODUCTOS COMPRADOS


// Variable para variar el contenido en el inicio el sessionStorage
const bienvenida = document.querySelector('.bienvenida')
const session = JSON.parse(sessionStorage.getItem("usuarioReprocann"))




let cliente;

// 
function crearCliente (session) {
    if (!session) {
        return
    } else {
        const [nombre, email, categoriaReprocann, dni, historialDeCompras] = session
        cliente = new Cliente(nombre, email, categoriaReprocann, dni, historialDeCompras)
        cliente.agregarCompra(historialDeCompras)
        bienvenida.innerHTML = `¡ Hola <b class="bienvenida-nombre"> ${cliente.nombre} </b>!.  Bienvenido a Verde Pampa`
    }
    return cliente
}
crearCliente(session)


