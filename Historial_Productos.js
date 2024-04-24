// ESTE FICHERO CONTIENE LA LOGICA DE REGISTRAR EL USUARIO REPROCANN Y MOSTRAR LOS PRODUCTOS QUE LE LLAMARON LA ATENCION
//  SIMULA UNA PERSONALIZACION AL USUARIO REGISTRADO CON REPROCANN




// Variable para variar el contenido en el inicio el sessionStorage
const bienvenida = document.querySelector('.bienvenida')
const session = JSON.parse(sessionStorage.getItem("usuarioReprocann"))

// seccion ultimas compras (codigo en este fichero) o ultimos productos agregados (simbolicamente)
const contenedorUsuario = document.querySelector('.contenedor-comprado')
const historialTitulo = document.querySelector('#historial-titulo')


let cliente;


// funcion que crea un cliente
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

let historialCliente = cliente.obtenerHistorial()
let historialAplanado = historialCliente.flat()

// obtenemos productos del archivo json
async function obtenerProductosJson () {
    const response = await fetch(productosDB)
    const datos = await response.json()
    return datos
}


// recuperamos esos datos y lo filtramos con los productos que el cliente aplico descuento.
obtenerProductosJson().then(datos => {
    let productos = []
    datos.forEach(producto => {
        historialAplanado.forEach(p => {
            if (p == producto.marca) {
                productos.push(producto)
            }
        })
    })
    
    if (!session) {
        return
    } else {
        contenedorUsuario.innerHTML = ''
        historialTitulo.textContent = "Productos que llamaron tu atencion"
        
        productos.forEach(producto => {

            const nuevoContenedor = document.createElement('div')
            nuevoContenedor.classList.add('col-lg-6')
            
            nuevoContenedor.innerHTML = `
                                        <div class="card">
                                            <div class="row ">
                                                <div class="col-lg-6"><img src="${producto.imagenUrl}" class="img-fluid news-img" alt=""></div>
                                            
                                                <div class="col-lg-6 p-5">
                                                    <span><i class="bi bi-star-fill"></i></span>
                                                    <span><i class="bi bi-star-fill"></i></span>
                                                    <span><i class="bi bi-star"></i></span>
                                                    <span><i class="bi bi-star"></i></span>
                                                    <h5 class="head1">${producto.marca}</h5>
                                                    <p class="per1">${producto.detalles}</p>
                                                    <h5 class="head1">$${producto.precioOriginal}</h5>
                                                </div>
                                            </div>
                                        </div>`
            contenedorUsuario.append(nuevoContenedor)
    
            nuevoContenedor.animate([
                {opacity: '0'},
                {opacity: '2'}
            ],{
                duration: 1000,
            })
        })
    }
})
