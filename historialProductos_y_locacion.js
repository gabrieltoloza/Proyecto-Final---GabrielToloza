// ESTE FICHERO CONTIENE LA LOGICA DE REGISTRAR EL USUARIO QUE REALIZO LA COMPRA Y MOSTRAR LOS PRODUCTOS QUE COMPRO
//  SIMULA UNA PERSONALIZACION AL USUARIO SI COMPRO ALGO.




// Variable para variar el contenido en el inicio el sessionStorage
const bienvenida = document.querySelector('.bienvenida')
const session = JSON.parse(sessionStorage.getItem("usuarioReprocann"))
const registroCompra = JSON.parse(sessionStorage.getItem("registroCompra"))

// seccion ultimas compras (codigo en este fichero) o ultimos productos agregados (simbolicamente)
const contenedorUsuario = document.querySelector('.contenedor-comprado')
const historialTitulo = document.querySelector('#historial-titulo')

// variable de localizacion envio
const enlaceEnvio = document.querySelector('.enlace-envio')


let cliente;


// funcion que crea un cliente
function crearCliente (historialCompra) {
    if (!historialCompra) {
        return
    } else {
        const [nombre, tarjeta, codigoSeguridad, email, direccion, historialDeCompras, categoria] = registroCompra
        cliente = new Cliente(nombre, tarjeta, codigoSeguridad, email, direccion, historialDeCompras)
        cliente.agregarCompra(historialDeCompras)
        bienvenida.innerHTML = `¡ Hola <b class="bienvenida-nombre"> ${cliente.nombre} </b>!.  Bienvenido a Verde Pampa`
        
    }
    return cliente
}
crearCliente(registroCompra)

let historialCliente;

if (!registroCompra) {
    historialCliente = "No hay session Storage"
} else {
    historialCliente = cliente.obtenerHistorial()
    let historialAplanado = historialCliente.flat()
    historialCliente = historialAplanado
}


// obtenemos productos del archivo json
async function obtenerProductosJson () {
    const response = await fetch(productosDB)
    const datos = await response.json()
    return datos
}


// recuperamos esos datos y lo filtramos con los productos que el cliente aplico descuento.
obtenerProductosJson().then(datos => {
    
    if (!registroCompra) {
        return

    } else {

        let productos = datos.filter(producto => historialCliente.includes(producto.marca))
        

        contenedorUsuario.innerHTML = ''
        historialTitulo.textContent = "Productos que llamaron tu atencion"
        
        productos.forEach(producto => {

            const nuevoContenedor = document.createElement('div')
            nuevoContenedor.classList.add('col-lg-10', 'g-4')
            
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
                                                    <p class="per4">${producto.descripcion}</p>
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


// funcion para mostrar la supuesta localizacion del envio del producto
function mostrarLocalizacion(registroCompra) {

    enlaceEnvio.addEventListener("click", (event) => {
        event.preventDefault()
        if (!registroCompra) {
            Swal.fire({
                html: "<i>¡Hecha un vistazo a los<b> productos </b>! Cuando compres podras ver aqui por donde se encuentra tu pedido. </i>",
                showConfirmButton: true,
                confirmButtonText: "Entiendo",
                customClass: {
                    popup: "estilos-alerta-envios",
                    confirmButton: '',
                },
                
            }).then(result => {
                if (result.isConfirmed) {
                    
                    const posicionSeccionEnvios = seccionTienda.getBoundingClientRect().top + window.scrollY
                    const nuevaPosicion = posicionSeccionEnvios + 230

                    setTimeout(() => {
                        window.scrollTo({
                            top: nuevaPosicion,
                            behavior: "smooth"
                        })
                    }, 300)
                }
            })
        } else {
            Swal.fire({
                html: "<i>¡Su producto se encuentra en <b> Usuahia, Argentina </b>! Cuando este cerca de tu domicilio, indicado en la factura, seras notificado. Muchas gracias por tu compra!</i>",
                showConfirmButton: true,
                confirmButtonText: "Entiendo",
                customClass: {
                    popup: "estilos-alerta-envios",
                },
                
            })
           
        }
        
    })
}
mostrarLocalizacion(registroCompra)

