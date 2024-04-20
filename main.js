
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




// logica de productos
let controladorCantidad = document.querySelector('.controlador-cantidad')
let inputCantidadCard = document.querySelectorAll('.input-producto')
let btnSumar = document.querySelectorAll('.btn-sumar')
let btnRestar = document.querySelectorAll('.btn-restar')
let valorInput;


let btnSumar2 = document.querySelectorAll('.btn-sumar2')
let btnRestar2 = document.querySelectorAll('.btn-restar2')
let cantidadCarrito = document.querySelectorAll('.cantidad-carrito')




// variables del carrito
const modalCarrito = new bootstrap.Modal(document.getElementById('exampleModal'), {})
let carritoProductos = document.querySelector('.carrito-productos')
let carritoVacio = document.querySelector('.carrito-vacio')
let carritoAcciones = document.querySelector('.carrito-acciones')
let carritoComprado = document.querySelector('.carrito-comprado')
let botonEliminarCarrito = document.querySelectorAll('.carrito-producto-eliminar')
const botonVaciar = document.querySelector('.carrito-acciones-vaciar')
const totalCarrito = document.querySelector('#total')





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
                                        <p class="per2">${producto.detalles}</p>
                                        <h4 class="head1">$${producto.precio}</h4>
                                        <div class="controlador-cantidad d-flex">
                                            <button id="${producto.id}" class="btn btn-outline-secondary btn-restar"><i class="bi bi-dash-lg"></i></button>
                                            <input id="${producto.id}" class="form-control input-producto" type="number" placeholder="${valorInput}">
                                            <button id="${producto.id}" class="btn btn-outline-secondary btn-sumar"><i class="bi bi-plus-lg"></i></button>
                                        </div>
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
    agregarEventosACarrito()
    chequearInput()
}
listandoStock(stock)


// Funcion para chequear el valor del input y cambiarlo a 0,
// tambien sirve para inhabilitar el acceso al input con el teclado.
function chequearInput() {
    inputCantidadCard = document.querySelectorAll('.input-producto')
    inputCantidadCard.forEach(input => {
        input.addEventListener("keydown", (e) => {
            e.preventDefault()
        })
        if (input.value === '') {
            input.value = 0
        }
    })
}


// evento para filtrar productos via formulario 
formularioProductos.addEventListener('submit', (event) =>{

    event.preventDefault()
    contenedorProductos.innerHTML = ''
    const filtrado = stock.filter((producto) => producto.categoria === input.value || producto.marca.includes(input.value))
    // llamando a la funcion de listado con los productos filtrados
    listandoStock(filtrado)
    
    let categorias = new Set()


    if (input.value == '') {
        event.preventDefault()
    } else if (filtrado && !filtrado.length < 1) {
        filtrado.forEach(producto => {
            categorias.add(producto.categoria)
        })
        categoriaHTML.textContent = `Categorias: ${Array.from(categorias).join(",")}`
    } else {
        categoriaHTML.textContent = `Producto no encontrado`
    }
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




//funcion para mostrar los botones "agregar al carrito" y variables de cantidades
function mostrarBotones() {
    btnCarrito = document.querySelectorAll('.btnCarrito')
    controladorCantidad = document.querySelector('.controlador-cantidad')
    inputCantidadCard = document.querySelectorAll('.input-producto')
    btnSumar = document.querySelectorAll('.btn-sumar')
    btnRestar = document.querySelectorAll('.btn-restar')
    
    accionBotonesCantidadProducto()
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





// funcion que suma o resta la cantidad de productos a agregar al carrito, solo el valor del input
function accionBotonesCantidadProducto () {
    btnSumar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            inputCantidadCard[index].value++
        })
    })
    btnRestar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            inputCantidadCard[index].value--
            if (inputCantidadCard[index].value < 0) {
                inputCantidadCard[index].value = 0
                return;
            }
        })
    })
}


// evento que suma al carrito el pedido
function agregarEventosACarrito() {

    btnCarrito = document.querySelectorAll('.btnCarrito')
    btnCarrito.forEach((boton, index) => {
        boton.addEventListener("click", (event) => {
            let cantidadSeleccionada = Number(inputCantidadCard[index].value)
            if (cantidadSeleccionada === 0) {
                Toastify({
                    text: "Debes elegir una cantidad",
                    duration: 1500,
                    gravity: "top", 
                    position: "center",
                    stopOnFocus: true, 
                    style: {
                        background: "linear-gradient(to right, #C40606, #F12828)",
                        borderRadius: "2rem",
                    },
                    offset: {
                        x: '1.5rem',
                        y: '1.5rem' 
                    },
                    onClick: function(){}
                }).showToast();
                return;
            }
            const productoFiltrado = stock.find(producto => producto.id == event.currentTarget.id)
            
            if (productosEnCarrito.some(producto => producto.id == event.currentTarget.id)) {
                const index = productosEnCarrito.findIndex(producto => producto.id == event.currentTarget.id)
                productosEnCarrito[index].cantidad += cantidadSeleccionada
            } else {
                productoFiltrado.cantidad = cantidadSeleccionada
                productosEnCarrito.push(productoFiltrado)
            }

            // script que maneja el mensaje del producto agregado al carrito hecho con Toastify JS
            Toastify({
                text: "Producto agregado!",
                duration: 1500,
                gravity: "top", 
                position: "center", 
                stopOnFocus: false, 
                style: {
                    background: "linear-gradient(to right, #440480, #7D15DF)",
                    borderRadius: "2rem",
                },
                offset: {
                    x: '1.5rem',
                    y: '1.5rem' 
                },
                onClick: function(){
                    window.scrollTo({top: 0, behavior: "smooth"});
                } 
            }).showToast();

            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

            setInterval(() => {
                inputCantidadCard[index].value = 0
            }, 6000)
            sumarCantidad()
            cargarProductosEnCarrito()
        })
    })
}





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
                                            <h6>${producto.marca}</h6>
                                        </div>
                                        <div class="carrito-producto-cantidad">
                                            <small>Cantidad</small>
                                            <div class="container-cantidad-carrito">
                                                <button id="${producto.id}" class="btn-restar2 pb-1">-</button>
                                                <p class="cantidad-carrito py-2 m-0">${producto.cantidad}</p>
                                                <button id="${producto.id}" class="btn-sumar2 pb-1">+</button>
                                            </div>
                                        </div>
                                        <div class="carrito-producto-precio">
                                            <small>Precio</small>
                                            <p>$${producto.precio}</p>
                                        </div>
                                        <div class="carrito-producto-subtotal">
                                            <small>Subtotal</small>
                                            <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                                        </div>
                                        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="icono-eliminar-${producto.id} bi bi-trash"></i></button>`
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
    mostrarBotonesCantidadCarrito()
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

    Toastify({
        text: "Producto Eliminado!",
        duration: 1500,
        gravity: "top",
        position: "center",
        stopOnFocus: false, 
        style: {
            background: "linear-gradient(to right, #C40606, #F12828)",
            borderRadius: "2rem",
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem' 
        },
        onClick: function(){} 
    }).showToast();

    const botonId = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id == botonId)
    
    productosEnCarrito[index].cantidad--
    
    if (productosEnCarrito[index].cantidad == 0) {
        productosEnCarrito.splice(index, 1)

        Toastify({
            text: "Haz eliminado el producto del carrito de compras",
            duration: 3000,
            gravity: "top",
            position: "center",
            stopOnFocus: false, 
            style: {
                background: "linear-gradient(to right, #C40606, #F12828)",
                borderRadius: "2rem",
            },
            offset: {
                x: '1.5rem',
                y: '1.5rem' 
            },
            onClick: function(){} 
        }).showToast();
    }

    cargarProductosEnCarrito()
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
    limpiarStorage()
}




// funciones para mostrar los botones cantidad del carrito
//  y escucha los eventos para que sume o reste la
function mostrarBotonesCantidadCarrito() {
    btnSumar2 = document.querySelectorAll('.btn-sumar2')
    btnRestar2 = document.querySelectorAll('.btn-restar2')
    cantidadCarrito = document.querySelectorAll('.cantidad-carrito')

    btnSumar2.forEach((boton) => {
        boton.addEventListener("click", accioBtnSumarEnCarrito)
    })

    btnRestar2.forEach((boton) => {
        boton.addEventListener("click", accionBtnRestarEnCarrito)
    })
}


// funciones de sumar o restar cantidad de los botones del carrito
function accioBtnSumarEnCarrito(e) {
    
    const botonId = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id == botonId)
    
    productosEnCarrito[index].cantidad += 1
    
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
    cargarProductosEnCarrito()

}

function accionBtnRestarEnCarrito(e) {

    const botonId = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id == botonId)
    
    productosEnCarrito[index].cantidad -= 1
    if (productosEnCarrito[index].cantidad < 1) {
        productosEnCarrito[index].cantidad = 1
        return;
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    cargarProductosEnCarrito()
}




// funcion para eliminar el localStorage y actualizar datos del carrito al eliminar los productos
function vaciarCarrito() {
    productosEnCarrito.length = 0
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    cargarProductosEnCarrito()
    sumarCantidad()
    limpiarStorage()
}


// funcion para actualizar el total del pedido
function actualizarTotal () {
    const total = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    totalCarrito.textContent = `$${total.toFixed(2)}`
}

// funcion para limpiar el storage y que no quede ningun array vacio!
function limpiarStorage() {
    if(productosEnLocalStorage && productosEnLocalStorage.length == 0) {
        localStorage.clear()
    }
}
limpiarStorage()