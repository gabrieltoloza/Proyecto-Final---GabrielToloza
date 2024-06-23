

// ESTE FICHERO CONTIENE LA LOGICA DEL LISTADO PRINCIPAL Y EL CARRITO



// Variables de productos
const contenedorProductos = document.querySelector('.contenedor-productos')
const formularioProductos = document.querySelector('.form-search')
const input = document.querySelector('.input-search')
const categoriaHTML = document.querySelector('.categoria')
let btnCarrito = document.querySelectorAll('.btnCarrito')
let conteoProductos = document.querySelectorAll('.conteo-productos')

// variables de productos
let controladorCantidad = document.querySelector('.controlador-cantidad')
let inputCantidadCard = document.querySelectorAll('.input-producto')
let btnSumar = document.querySelectorAll('.btn-sumar')
let btnRestar = document.querySelectorAll('.btn-restar')
let valorInput;
let btnSumar2 = document.querySelectorAll('.btn-sumar2')
let btnRestar2 = document.querySelectorAll('.btn-restar2')
let cantidadCarrito = document.querySelectorAll('.cantidad-carrito')


// variables del carrito
let containerCarrito = document.querySelector('.container-carrito')

const modalCarrito = new bootstrap.Modal(document.getElementById('exampleModal'), {})
let carritoProductos = document.querySelector('.carrito-productos')
let carritoVacio = document.querySelector('.carrito-vacio')
let carritoAcciones = document.querySelector('.carrito-acciones')
let carritoComprado = document.querySelector('.carrito-comprado')
let botonEliminarCarrito = document.querySelectorAll('.carrito-producto-eliminar')
const botonVaciar = document.querySelector('.carrito-acciones-vaciar')
const totalCarrito = document.querySelector('#total')
let iconoEliminar = document.querySelector('.icono-eliminar')
const accederReprocann = document.querySelector('#btn-descuento-reprocann')


// base de datos .json
let productosDB = "./productos.json"
// base de datos MySQL
let mysqlDB = "http://localhost:3000/products"



// Listando incialmente el stock
const listandoStockMain = fetch(productosDB)
                    .then(responde => responde.json())
                        .then(data => {
                            listandoStock(data)
                        })
                        .catch(err => {
                            // el usuario ve la alerta pero el desarrollador ve el tipo de error por consola
                            console.log(err.name)
                            Swal.fire({
                                title: "Error 404",
                                text: `Ocurrio un error inesperado, vuelva a intentarlo`,
                                confirmButtonText: "Ok",
                                customClass: {
                                    popup: "estilos-alerta2"
                                }
                            })
                        })


// funcion que muestra el listado segun su parametro
function listandoStock (stock) {
    
    stock.forEach((producto) => {
        const nuevoContenedor = document.createElement('div')
        
        nuevoContenedor.classList.add('col-6', 'col-lg-3')

        nuevoContenedor.innerHTML = `
                                <div class="card p-1 text-center">
                                    <div class="card-body p-1">
                                        <div class="star">
                                            <span><i class="bi bi-star-fill"></i></span>
                                            <span><i class="bi bi-star-fill"></i></span>
                                            <span><i class="bi bi-star"></i></span>
                                            <span><i class="bi bi-star"></i></span>
                                        </div>
                                        <img src="${producto.imagenUrl}" class="img-fluid news-img" alt="${producto.categoria}">                  
                                        <h4 class="head1">${toCapital(producto.marca)}</h4>
                                        <p class="per2">${toCapital(producto.detalles)}</p>
                                        <p class="per4 fs-6 fw-bold" >Cantidad: ${producto.stock}</p>
                                        <h4 class="head1 card-h4">$${producto.precio}</h4>
                                        <div class="controlador-cantidad d-flex">
                                            <button id="${producto.id}" class="btn btn-outline-secondary btn-restar w-90 p-0 m-1"><i class="bi bi-dash-lg"></i></button>
                                            <input id="${producto.id}" class="form-control input-producto w-70 h-90 p-0 m-1 text-center" type="number" placeholder="${valorInput}">
                                            <button id="${producto.id}" class="btn btn-outline-secondary btn-sumar w-90 p-0 m-1"><i class="bi bi-plus-lg"></i></button>
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
    agregarEventosACarrito(productosEnCarrito)
    chequearInput()
}





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
    const filtrandoStock = fetch(productosDB)
                            .then(response => response.json())
                                .then(datos => {

                                    contenedorProductos.innerHTML = ''
                                    const filtrado = datos.filter((producto) => (producto.categoria === input.value ||  producto.marca.includes(input.value)))
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
                                .catch(err => {
                                    // el usuario ve la alerta pero el desarrollador ve el tipo de error por consola
                                    console.log(err.name)
                                    Swal.fire({
                                        title: "Error 404",
                                        text: `Ocurrio un error inesperado, vuelva a intentarlo`,
                                        confirmButtonText: "Ok",
                                        customClass: {
                                            popup: "estilos-alerta2"
                                        }
                                    })
                                })
})




// evento que escucha el valor del input, si esta vacio devuelve todos los elementos del stock
input.addEventListener('input', (event) =>{
    const valorInput = event.target.value

    if (valorInput === '') {
        contenedorProductos.innerHTML = ''
        categoriaHTML.innerText = 'Todos los productos'
        const escucharInput = fetch(productosDB)
                                .then(response => response.json())
                                    .then(datos => {
                                        listandoStock(datos)
                                    })
                                    .catch(err => {
                                        // el usuario ve la alerta pero el desarrollador ve el tipo de error por consola
                                        console.log(err.name)
                                        Swal.fire({
                                            title: "Error 404",
                                            text: `Ocurrio un error inesperado, vuelva a intentarlo`,
                                            confirmButtonText: "Ok",
                                            customClass: {
                                                popup: "estilos-alerta2"
                                            }
                                        })
                                    })
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




// funcion que suma o resta la cantidad de productos a agregar al carrito, solo el valor del input
function accionBotonesCantidadProducto () {

    const controlarSumaProducto = fetch(productosDB).then(response => response.json())
                                                .then(datos => {
                                                    
                                                    btnSumar.forEach((boton, index) => {
                                                        boton.addEventListener("click", (event) => {
                                                            
                                                            const id = event.currentTarget.id
                                                            inputCantidadCard[index].value++
                                                            const producto = datos.find(dato => dato.id === id)
                                                            
                                                            if (inputCantidadCard[index].value >  producto.stock) {
                                                                inputCantidadCard[index].value = producto.stock
                                                                return;
                                                            }

                                                        })
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



//array que se guarda en el localStorage

let productosEnCarrito = []
const productosEnLocalStorage = JSON.parse(localStorage.getItem("productosEnCarrito"))

// condicional para tomar los datos del localStorage
if (productosEnLocalStorage) {

    const carritoSinDescuento = productosEnLocalStorage.map(producto => {
        return {
            id: producto.id,
            marca: producto.marca,
            detalles: producto.detalles,
            precio: producto.precioOriginal,
            precioOriginal: producto.precioOriginal,
            categoria: producto.categoria,
            imagenUrl: producto.imagenUrl,
            cantidad: producto.cantidad
        }
    })
    productosEnCarrito = carritoSinDescuento
    sumarCantidad()
} else {
    productosEnCarrito = []
}



// evento que suma al carrito el pedido
function agregarEventosACarrito(carritoLocalStorage) {

    btnCarrito = document.querySelectorAll('.btnCarrito')
    btnCarrito.forEach((boton, index) => {
        boton.addEventListener("click", (event) => {

            let cantidadSeleccionada = Number(inputCantidadCard[index].value)
            
            const eventoID = Number(event.currentTarget.id)
            const id = event.currentTarget.id

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

            const stockenEventos = fetch(productosDB)
                                            .then(response => response.json())
                                                .then(datos => {
                                                    
                                                    const producto = datos.find(dato => dato.id === id)
                                                    
                                                    if (carritoLocalStorage.some(producto => producto.id == id)) {
                                                        const indexCarrito = carritoLocalStorage.findIndex(producto => producto.id == id)
                                                        carritoLocalStorage[indexCarrito].cantidad += cantidadSeleccionada
                                                        
                                                        if (carritoLocalStorage[indexCarrito].cantidad > producto.stock) {
                                                            carritoLocalStorage[indexCarrito].cantidad = producto.stock
                                                            Toastify({
                                                                text: "No puedes agregar una cantidad mas grande que el stock. Hemos reajustado la cantidad, por favor verifica tu carrito de compras",
                                                                duration: 4000,
                                                                gravity: "top", 
                                                                position: "center", 
                                                                stopOnFocus: true, 
                                                                style: {
                                                                    background: "linear-gradient(to right, #006400, #00FF00)",
                                                                    borderRadius: "2rem",
                                                                },
                                                                offset: {
                                                                    x: '1.5rem',
                                                                    y: '1.5rem' 
                                                                },
                                                                onClick: function(){} 
                                                            }).showToast();
                                                                                                            
                                                        } else {
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
                                                                onClick: function(){} 
                                                            }).showToast();
                                                        }
                                                        

                                                    } else {
                                                        producto.cantidad = cantidadSeleccionada
                                                        carritoLocalStorage.push(producto)
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
                                                            onClick: function(){} 
                                                        }).showToast();
                                                    }
                                                    console.log('llega');

                                                    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

                                                    setInterval(() => {
                                                        inputCantidadCard[index].value = 0
                                                    }, 6000)

                                                    sumarCantidad()
                                                    cargarProductosEnCarrito(productosEnCarrito)

                                                    

                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                    Swal.fire({
                                                        title: "Error 404",
                                                        text: `Ocurrio un error inesperado, vuelva a intentarlo`,
                                                        confirmButtonText: "Ok",
                                                        customClass: {
                                                            popup: "estilos-alerta2"
                                                        }
                                                    })
                                                })
                                                
        })
    }) 
}




// funcion para cargar los productos elegidos traidos del localStorage
function cargarProductosEnCarrito (productos) {
    
    if (productosEnCarrito.length > 0) {
        
        btnIniciarCompra.classList.add('d-none')
        containerCarrito.classList.remove('d-flex', 'justify-content-between')
        carritoVacio.classList.add('d-none')
        carritoComprado.classList.add('d-none')
        carritoAcciones.classList.remove('d-none')
        carritoProductos.classList.remove('d-none')
        carritoProductos.innerHTML = ''

        productos.forEach(producto => {
            
            const contenedorCarrito = document.createElement('div')
            contenedorCarrito.classList.add('carrito-producto')
            contenedorCarrito.innerHTML = `
                                        <img class="carrito-producto-img" src="${producto.imagenUrl}" alt="${producto.categoria}">
                                        <div class="carrito-producto-titulo">
                                            <small>Producto:</small>
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
                                            <p>$${Number(producto.precio).toFixed(2)}</p>
                                        </div>
                                        <div class="carrito-producto-subtotal">
                                            <small>Subtotal</small>
                                            <p>$${(Number(producto.precio) * producto.cantidad).toFixed(2)}</p>
                                        </div>
                                        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="icono-eliminar bi bi-trash"></i></button>`
            carritoProductos.append(contenedorCarrito)
        })
    } else {
        btnIniciarCompra.classList.remove('d-none')
        carritoAcciones.classList.add('d-none')
        carritoComprado.classList.add('d-none')
        carritoProductos.classList.add('d-none')
        containerCarrito.classList.add('d-flex', 'justify-content-between')
        carritoVacio.classList.remove('d-none')
    }
    
    mostrarBotonEliminar()
    actualizarTotal()
    sumarCantidad()
    mostrarBotonesCantidadCarrito()
}
cargarProductosEnCarrito(productosEnCarrito)




//funcion para mostrar los botones de eliminar producto del carrito
function mostrarBotonEliminar() {

    iconoEliminar = document.querySelector('.icono-eliminar')
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

    cargarProductosEnCarrito(productosEnCarrito)
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
    limpiarStorage()
}




// funciones para mostrar los botones cantidad del carrito
//  y escucha los eventos para que sume o reste la cantidad
function mostrarBotonesCantidadCarrito() {
    btnSumar2 = document.querySelectorAll('.btn-sumar2')
    btnRestar2 = document.querySelectorAll('.btn-restar2')
    cantidadCarrito = document.querySelectorAll('.cantidad-carrito')

    // evento y funcion para sumar cantidad en carrito con limite de stock
    btnSumar2.forEach((boton) => {
        const controlarSumaCarrito = fetch(productosDB).then(response => response.json())
                                                    .then(datos => {
                                                        
                                                        boton.addEventListener("click" ,(event) => {

                                                            console.log(datos)
                                                            const botonId = event.currentTarget.id
                                                            const producto = datos.find(dato => dato.id === botonId)
                                                            
                                                            const datoStockId = event.currentTarget.id - 1
                                                            const index = productosEnCarrito.findIndex(producto => producto.id == botonId)

                                                            productosEnCarrito[index].cantidad += 1

                                                            if (productosEnCarrito[index].cantidad > producto.stock) {
                                                                productosEnCarrito[index].cantidad = producto.stock
                                                                return
                                                            }

                                                            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
                                                            cargarProductosEnCarrito(productosEnCarrito)
                                                        })

                                                    })
    })

    btnRestar2.forEach((boton) => {
        boton.addEventListener("click", accionBtnRestarEnCarrito)
    })
}


// funcion para restar cantidad de los botones del carrito
function accionBtnRestarEnCarrito(e) {

    const botonId = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id == botonId)
    
    productosEnCarrito[index].cantidad -= 1
    if (productosEnCarrito[index].cantidad < 1) {
        botonEliminarCarrito[index].animate([
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-10px)' },
            { transform: 'translateY(6px)' },
            { transform: 'translateY(0px)' },
        ], {
          duration: 500,
          iterations: 1
        })
        productosEnCarrito[index].cantidad = 1  
        return;
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    cargarProductosEnCarrito(productosEnCarrito)
}






// funcion para mostrar la cantidad de productos en carrito
function sumarCantidad () {
    let numero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    // conteoProductos.innerText = numero
    conteoProductos.forEach(node => {
        node.innerText = numero
    })
}


// funcion para actualizar el total del pedido en el modal
function actualizarTotal () {
    const total = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    totalCarrito.textContent = `$${total.toFixed(2)}`
}



// funcion para eliminar el localStorage y actualizar datos del carrito al eliminar los productos
function vaciarCarrito() {
    productosEnCarrito.length = 0
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    cargarProductosEnCarrito(productosEnCarrito)
    sumarCantidad()
    limpiarStorage()
}


// funcion para limpiar el storage y que no quede ningun array vacio si se recarga la pagina
function limpiarStorage() {
    if(productosEnLocalStorage && productosEnLocalStorage.length == 0) {
        localStorage.clear()
    } 
}
limpiarStorage()


