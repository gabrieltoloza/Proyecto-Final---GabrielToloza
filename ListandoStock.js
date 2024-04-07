/*
    El proyecto entregable se basa en listar los productos del stock en la seccion de productos, 
    hay dos categorias, semillas y aceites. Luego de agregar al carrito, debera ir hasta arriba de todo 
    y hacer click en el carrito donde aparecera los productos agregados y sus especificaciones.
    Hay un boton para vaciar el carrito, y otro boton para comprar. Al confirmar la compra se abre 
    un modal para ingresar los datos de la factura. Al confirmar los datos de la factura se abre
    otro modal donde figura los datos ingresados pero esta vez se suma el precio total de los productos
    agregados. Al dar confirmar se abre otro modal despidiendo al usuario y eliminando los productos del carrito
    simulando que ya se efectuo la compra.

    Ademas tiene efectos de desplazamientos con DOM al hacer click en el menu del navbar.

    El resto de elementos como la minibarra de busqueda superior y secciones que no tienen relevancia 
    las deje asi porque las voy a usar mas adelante si es que las ocupo en este curso, sino quedan
    para el curso final de backend... Me tome el trabajo de hacer la pagina que voy a usar o tratar de usar
    durante toda la cursada.

    Esto que hice es toda la logica del primer proyecto Entregable aplicando los ultimos temas que vimos.
*/ 




const stock = [

    // ====aceites====

    new Productos('pharma cbd serum',
                `CBD 5% Cannabidiol`,
                45.00,
                'aceites',
                './Productos/aceite6.webp'
                // Producto con 10% descuento con reprocann
    ),
    new Productos('bioactiva',
                `CBD 15% Via oral`,
                150.00,
                'aceites',
                './Productos/aceite2.webp'
                // Producto con 10% descuento con reprocann
    ),

    new Productos('Aceite de Cañamo',
                  `24% Cannabidiol Organico`,
                  80.00,
                  'aceites',
                  './Productos/aceite3.webp'
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('The Green Brand',
                  `24% Relajando Fisico`,
                  69.99,
                  'aceites',
                  './Productos/aceite5.webp'
                  // Producto con 25% descuento con reprocann
    ),
    
    new Productos('Selva',
                  `2.75%CBD `,
                  45.37,
                  'aceites',
                  './Productos/aceite7.webp'
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('Sativa',
                  `5% Solucion oral`,
                  50.00,
                  'aceites',
                  './Productos/aceite8.jpg'
                  // Producto con 25% descuento con reprocann
    ),



    // ====semillas====

    new Productos('Amnezia Haze',
                  `CBD 10% Solid`,
                  17.00,
                  'semillas',
                  './Productos/semillas1.jpg'
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('Gorila Haze',
                  `Renetik Seeds`,
                  11.00,
                  'semillas',
                  './Productos/semillas2.jpg'
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('Amnezia Haze XL',
                  `Feminizadas Autoflorecientes`,
                  35.00,
                  'semillas',
                  './Productos/semillas3.jpg'
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('Anandamida',
                  `Autocultivo organico`,
                  10.00,
                  'semillas',
                  './Productos/semillas4.webp'
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('Serious Seeds',
                  `Bumble Gum`,
                  20.00,
                  'semillas',
                  './Productos/semillas5.jpg'
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('Sensi Seeds',
                  `Mandarin Punch Fem`,
                  24.00,
                  'semillas',
                  './Productos/semillas6.jpg'
                  // Producto con 25% descuento con reprocann
    ),
    
]




// Variables de productos
const contenedorProductos = document.querySelector('.contenedor-productos')
const formularioProductos = document.querySelector('.form-search')
const input = document.querySelector('.input-search')
const categoriaHTML = document.querySelector('.categoria')
let btnCarrito = document.querySelectorAll('.btnCarrito')
let conteoProductos = document.querySelector('.conteo-productos')





// variables del carrito
let carritoProductos = document.querySelector('.carrito-productos')
let carritoVacio = document.querySelector('.carrito-vacio')
let carritoAcciones = document.querySelector('.carrito-acciones')
let carritoComprado = document.querySelector('.carrito-comprado')
let botonEliminarCarrito = document.querySelectorAll('.carrito-producto-eliminar')
const botonVaciar = document.querySelector('.carrito-acciones-vaciar')
const totalCarrito = document.querySelector('#total')





//variables del modal de facturacion
const btnFacturacion = document.querySelector('#abrirSegundoModal')
let inputTitular = document.querySelector('#form-input-titular')
let inputTarjeta = document.querySelector('#form-input-tarjeta')
let inputCodigo = document.querySelector('#form-input-codigo')
let inputEmail = document.querySelector('#form-input-email')
let inputDireccion = document.querySelector('#form-input-direccion')
const btnConfirmarFactura = document.querySelector('#btnConfirmarFactura1')
let btnConfirmarFactura2 = document.querySelector('#btnConfirmarFactura2')





//variables de secciones para el desplazamiento
const btnEnvios = document.getElementById('btn-envios')
const btnBlog = document.querySelectorAll('.btn-blog')
const btnTienda = document.getElementById('btn-tienda')
const btnReprocann = document.querySelectorAll('.btn-reprocann')

const seccionEnvios = document.getElementById('seccion-envios')
const seccionBlog = document.getElementById('seccion-blog')
const seccionTienda = document.getElementById('seccion-tienda')
const seccionReprocann = document.getElementById('seccion-reprocann')







// Listando stock de la tienda
function listandoStock (stock) {
    
    stock.forEach((producto) => {
        const nuevoContenedor = document.createElement('div')
        nuevoContenedor.classList.add('col-lg-3')


        nuevoContenedor.innerHTML = `
                                <div class="card p-2 text-center">
                                    <div class="card-body">
                                        <div class="star">
                                            <span><i class="bi bi-star-fill"></i></span>
                                            <span><i class="bi bi-star-fill"></i></span>
                                            <span><i class="bi bi-star"></i></span>
                                            <span><i class="bi bi-star"></i></span>
                                        </div>
                                        <img src="${producto.imagenUrl}" class="img-fluid news-img pb-3" alt="${producto.categoria}">                  
                                        <h4 class="head1">${producto.marca}</h4>
                                        <p class="per1">${producto.detalles}</p>
                                        <h4 class="head1">$${producto.precio}</h4>
                                        <button class="btnCarrito btnc my-2 " id="${producto.id}">Agregar carrito</button>
                                    </div>
                                </div>`            
        contenedorProductos.append(nuevoContenedor)
        
        // breve animacion para que no sea tan brusco cualquier cambio en el listado de productos hecho con DOM
        nuevoContenedor.animate([
            {opacity: '0'},
            {opacity: '1'}
        ], {
            duration: 1000,
        })
        
    })    
    mostrarBotones()
}
listandoStock(stock)





// evento para filtrar productos via formulario 
formularioProductos.addEventListener('submit', (event) =>{

    event.preventDefault()
    contenedorProductos.innerHTML = ''
    const filtrado = stock.filter((producto) => producto.categoria === input.value || producto.marca.includes(input.value))
    const categoria = stock.find((producto) => producto.categoria === input.value)

    // llamando a la funcion de listado con los productos filtrados
    listandoStock(filtrado)
    categoriaHTML.innerText = `${categoria.categoria}`
    
})




// evento que escucha el valor del input, si esta vacio devuelve todos los elementos del stock
input.addEventListener('input', (event) =>{
    const valorInput = event.target.value

    if (valorInput === '') {
        contenedorProductos.innerHTML = ''
        categoriaHTML.innerText = 'Todos los productos'
        listandoStock(stock)
    }
})



//funcion para mostrar los botones "agregar al carrito"
function mostrarBotones() {
    btnCarrito = document.querySelectorAll('.btnCarrito')
}




//array que se guarda en el localStorage

let productosEnCarrito = []
const productosEnLocalStorage = JSON.parse(localStorage.getItem("productosEnCarrito"))

// condicional para tomar los datos del localStorage
if (productosEnLocalStorage) {
    productosEnCarrito = productosEnLocalStorage
    sumarCantidad()
} else {
    productosEnCarrito = []
}


// evento que suma al carrito el pedido
btnCarrito.forEach(boton => {
    boton.addEventListener("click", (event) => {

        const productoFiltrado = stock.find(producto => producto.id == event.currentTarget.id)
        
        if (productosEnCarrito.some(producto => producto.id == event.currentTarget.id)) {
            const index = productosEnCarrito.findIndex(producto => producto.id == event.currentTarget.id)
            productosEnCarrito[index].cantidad++
        } else {
            productoFiltrado.cantidad = 1
            productosEnCarrito.push(productoFiltrado)
        }
        console.log(productosEnCarrito);
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
        sumarCantidad()
        cargarProductosEnCarrito()
    })
    
})



// funcion para sumar la cantidad de productos en carrito
function sumarCantidad () {
    let numero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    conteoProductos.innerText = numero
}





// funcion para cargar los productos elegidos traidos del localStorage
function cargarProductosEnCarrito () {

    if (productosEnCarrito.length > 0) {

        carritoVacio.classList.add('d-none')
        carritoComprado.classList.add('d-none')
        carritoAcciones.classList.remove('d-none')
        carritoProductos.classList.remove('d-none')
    
        carritoProductos.innerHTML = ''
    
        productosEnCarrito.forEach(producto => {
            const contenedorCarrito = document.createElement('div')
            contenedorCarrito.classList.add('carrito-producto')
            contenedorCarrito.innerHTML = `
                                        <img class="carrito-producto-img" src="${producto.imagenUrl}" alt="${producto.categoria}">
                                        <div class="carrito-producto-titulo">
                                            <small>Titulo</small>
                                            <h3>${producto.marca}</h3>
                                        </div>
                                        <div class="carrito-producto-cantidad">
                                            <small>Cantidad</small>
                                            <p>${producto.cantidad}</p>
                                        </div>
                                        <div class="carrito-producto-precio">
                                            <small>Precio</small>
                                            <p>$${producto.precio}</p>
                                        </div>
                                        <div class="carrito-producto-subtotal">
                                            <small>Subtotal</small>
                                            <p>$${producto.precio * producto.cantidad}</p>
                                        </div>
                                        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`
            carritoProductos.append(contenedorCarrito)
        })
    } else {
        carritoAcciones.classList.add('d-none')
        carritoComprado.classList.add('d-none')
        carritoProductos.classList.add('d-none')
        carritoVacio.classList.remove('d-none')
    }

    mostrarBotonEliminar()
    actualizarTotal()
    sumarCantidad()
    
}
cargarProductosEnCarrito()




//funcion para mostrar los botones de eliminar producto del carrito
function mostrarBotonEliminar() {
    botonEliminarCarrito = document.querySelectorAll('.carrito-producto-eliminar')

    botonEliminarCarrito.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

// funcion para eliminar el producto del carrito 
function eliminarDelCarrito(e) {
    const botonId = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id == botonId)

    productosEnCarrito.splice(index, 1)
    cargarProductosEnCarrito()

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

}

// evento y funcion para vaciar el carrito 
botonVaciar.addEventListener("click", vaciarCarrito)
function vaciarCarrito() {
    productosEnCarrito.length = 0
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
    cargarProductosEnCarrito()
    if(productosEnLocalStorage.length == 0) {
        localStorage.clear()
    }
    sumarCantidad()
}


// funcion para actualizar el total del pedido
function actualizarTotal () {
    const total = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    totalCarrito.innerText = `$${total}`
}



//evento que cierra el primer modal para abrir el segundo modal de facturacion con Bootstrap
btnFacturacion.addEventListener("click", () => {
    document.querySelector('#exampleModal').classList.remove('show')
})


//evento que cierra el segundo modal para abrir el tercer modal de confirmacion de factura con Bootstrap
btnConfirmarFactura.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById('modalFacturacion').classList.remove('show')
    const total = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    const containerDatosFactura = document.querySelector('#container-confirmar-facturacion')
    containerDatosFactura.innerHTML = `
                                    <div>
                                    <label for="form-input-name" class="form-label me-2 text-center pt-2 mx-1">Nombre y apellido: ${inputTitular.value}</label>
                                    </div>
                                    <div>
                                        <label for="form-input-tarjeta" class="form-label me-2 text-center pt-2 mx-1">Numero de tarjeta: ${inputTarjeta.value}</label> 
                                    </div>
                                    <div>
                                        <label for="form-input-codigo" class="form-label me-2 text-center pt-2 mx-1">Codigo de seguridad: ${inputCodigo.value}</label> 
                                    </div>
                                    <div>
                                        <label for="form-input-email" class="form-label me-2 text-center pt-2 mx-1">Email: ${inputEmail.value}</label>
                                    </div>
                                    <div>
                                        <label for="form-input-direccion" class="form-label me-2 text-center pt-2 mx-1">Direccion: ${inputDireccion.value}</label>
                                    </div>
                                    <div>
                                        <label for="form-input-direccion" class="form-label me-2 text-center pt-2 mx-1">Precio: $${total}</label>
                                    </div>
                                    <button id="btnConfirmarFactura2" class="mbtn1 mx-2 px-3" data-bs-toggle="modal" data-bs-target="#modalDespedida">Confirmar</button>`

    mostrarBotonConfirmarFinal()

})



// funcion para mostrar el boton confirmarFactura final!
function mostrarBotonConfirmarFinal() {
    btnConfirmarFactura2 = document.querySelector('#btnConfirmarFactura2')

    btnConfirmarFactura2.addEventListener("click", compraTerminada)
}



// funcion que cierra el tercer modal para abrir el modal final con la despedida!! 
function compraTerminada() {
    document.querySelector('#modalConfirmarFactura').classList.remove('show')
    productosEnCarrito.length = 0
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    if(productosEnLocalStorage.length == 0) {
        localStorage.clear()
    }
    sumarCantidad()
}







// seccion del DOM para el desplazamiento de los botones del Navbar

btnEnvios.addEventListener("click", (e) => {
    e.preventDefault()
    const posicionSeccionEnvios = seccionEnvios.getBoundingClientRect().top + window.scrollY
    const nuevaPosicion = posicionSeccionEnvios - 75

    window.scrollTo({
        top: nuevaPosicion,
        behavior: "smooth"
    })
})


btnBlog.forEach(boton => {
    boton.addEventListener("click", (e) => {
        e.preventDefault()
        const posicionSeccionEnvios = seccionBlog.getBoundingClientRect().top + window.scrollY
        const nuevaPosicion = posicionSeccionEnvios - 50
    
        window.scrollTo({
            top: nuevaPosicion,
            behavior: "smooth"
        })
    })
})


btnTienda.addEventListener("click", (e) => {
    e.preventDefault()
    const posicionSeccionEnvios = seccionTienda.getBoundingClientRect().top + window.scrollY
    const nuevaPosicion = posicionSeccionEnvios + 20

    window.scrollTo({
        top: nuevaPosicion,
        behavior: "smooth"
    })
})


btnReprocann.forEach(boton => {
    boton.addEventListener("click", (e) => {
        e.preventDefault()
        const posicionSeccionEnvios = seccionReprocann.getBoundingClientRect().top + window.scrollY
        const nuevaPosicion = posicionSeccionEnvios - 230
    
        window.scrollTo({
            top: nuevaPosicion,
            behavior: "smooth"
        })
    })
})