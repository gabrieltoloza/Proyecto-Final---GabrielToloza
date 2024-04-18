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



// ?correccion del entregable?

let controladorCantidad = document.querySelector('.controlador-cantidad')
let inputCantidadCard = document.querySelectorAll('.input-producto')
let btnSumar = document.querySelectorAll('.btn-sumar')
let btnRestar = document.querySelectorAll('.btn-restar')
let valorInput;

//* COMENZAR AQUI LOS PUNTOS ROJOS

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





//variables del modal de facturacion
const btnFacturacion = document.querySelector('#abrirSegundoModal')
let inputCodigo = document.querySelector('#form-input-codigo')
const formularioFactura = document.querySelector('#formulario-validacion')
const btnConfirmarFactura = document.querySelector('#btnConfirmarFactura1')
let btnConfirmarFactura2 = document.querySelector('#btnConfirmarFactura2')
let inputsDatosFactura = document.querySelectorAll('.input-datos-factura')
const modalFactura = new bootstrap.Modal(document.getElementById('modalFacturacion'), {})




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
            console.log("Funciona el boton SUMAR");
        })
    })
    btnRestar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            inputCantidadCard[index].value--
            if (inputCantidadCard[index].value < 0) {
                inputCantidadCard[index].value = 0
                return;
            }
            console.log("Boton restar Funciona");
        })
    })
}


// evento que suma al carrito el pedido
function agregarEventosACarrito() {

    btnCarrito = document.querySelectorAll('.btnCarrito')

    btnCarrito.forEach((boton, index) => {
        boton.addEventListener("click", (event) => {
            
            
            let cantidadSeleccionada = Number(inputCantidadCard[index].value)
            console.log(cantidadSeleccionada);
            
            if (cantidadSeleccionada === 0) {
                
                Toastify({
                    text: "Debes elegir una cantidad",
                    duration: 1500,
                    // close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #C40606, #F12828)",
                        borderRadius: "2rem",
                    },
                    offset: {
                        x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
                    },
                    onClick: function(){} // Callback after click
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
                // close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #440480, #7D15DF)",
                    borderRadius: "2rem",
                },
                offset: {
                    x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
                onClick: function(){
                    window.scrollTo({top: 0, behavior: "smooth"});
                } // Callback after click
            }).showToast();

            console.log(productosEnCarrito);
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
                                            <h3>${producto.marca}</h3>
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
        duration: 3000,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #C40606, #F12828)",
            borderRadius: "2rem",
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    //? Corrigiendo a partir de la devolucion!
    const botonId = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id == botonId)
    
    productosEnCarrito[index].cantidad--
    
    if (productosEnCarrito[index].cantidad == 0) {
        productosEnCarrito.splice(index, 1)
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
    console.log(productosEnCarrito[index].cantidad);
    productosEnCarrito[index].cantidad += 1
    console.log("Boton carrito SUMAR funciona!!");

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
    cargarProductosEnCarrito()

}

function accionBtnRestarEnCarrito(e) {

    const botonId = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id == botonId)
    console.log(productosEnCarrito[index].cantidad);
    productosEnCarrito[index].cantidad -= 1
    if (productosEnCarrito[index].cantidad < 1) {
        productosEnCarrito[index].cantidad = 1
        return;
    }
    console.log("Boton carrito Restar funciona!!");
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    cargarProductosEnCarrito()

}










// evento y funcion para vaciar el carrito 
botonVaciar.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estas seguro que quieres eliminar los productos agregados al carrito?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `Don't save`,
        customClass: "estilos-alerta2"
      }).then((result) => {
        if (result.isConfirmed) {
            modalCarrito.hide()
            vaciarCarrito()
            Swal.fire({
                title: "Productos eliminados exitosamente",
                customClass: "estilos-alerta2"
            });
        } else if (result.isDenied) {
            Swal.fire({
                
            });
        }
      });
})

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






// ========Seccion Modales============>



//evento que cierra el primer modal para abrir el segundo modal de facturacion con Bootstrap
btnFacturacion.addEventListener("click", () => {
    document.querySelector('#exampleModal').classList.remove('show')
})



// Evento de escucha para el campo "Codigo de Seguridad" para que solo admita 5 
//   caracteres numeros y algunos comandos con el teclado para la experiencia de usuario
inputCodigo.addEventListener("keydown", (e) => {
    if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Delete", "Enter", "Tab"].includes(e.key)) {
        e.preventDefault()
    }
})



// Evento que cierra el segundo modal para abrir SweetAlert con los datos 
//   recuperados del formulario anterior modal.
btnConfirmarFactura.addEventListener("click", (event) => {

    isValid = true
    
    inputsDatosFactura.forEach(input => {
        if (!input.validity.valid) {
            isValid = false
        }else {
            formularioFactura.classList.add('was-validated')
        }
    })

    if (isValid && formularioFactura.classList.contains('was-validated')) {
        console.log("entra el evento");
        event.preventDefault()
        Swal.fire({
            title: "¿Confirma el envío de datos personasles para su facturación?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
            customClass: {
                popup: "estilos-alerta2"
            }
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                cargarProductosEnCarrito()
                actualizarTotal()
                Swal.fire({
                    title: "Datos de la factura",
                    html:`
                    <i class="estilos-alerta-key">Titular:</i> <b>${inputsDatosFactura[0].value}</b><br>
                    <i class="estilos-alerta-key">Numero de Tarjeta:</i> <b>${inputsDatosFactura[1].value}</b><br>
                    <i class="estilos-alerta-key">Codigo de Seguridad:</i> <b>${inputsDatosFactura[2].value}</b><br>
                    <i class="estilos-alerta-key">Correo electronico:</i> <b>${inputsDatosFactura[3].value}</b><br>
                    <i class="estilos-alerta-key">Direccion:</i> <b>${inputsDatosFactura[4].value}</b><br>
                    <i class="estilos-alerta-key">Total:</i> <b>${totalCarrito.textContent}</b>`,
                    confirmButtonText: "Confirme sus datos",
                    showDenyButton: true,
                    denyButtonText: "Cancelar",
                    customClass: {
                        popup: "estilos-alerta2",
                    }
                }).then((result) =>{
                    if(result.isConfirmed) {
                        modalFactura.hide();
                        inputsDatosFactura.forEach(input => {
                            input.value = ''
                            formularioFactura.classList.remove('was-validated')
                        })     
                        compraTerminada()                
                        Swal.fire({
                            title: "Compra Realizada",
                            html:`
                                  <b>Revise su correo electrónico para visualizar su factura.</b><br>  
                                  <b>El producto llegara a la dirección que indico en la misma.</b><br>
                                  <b>¡Muchas gracias por su compra!</b><br>`,
                            customClass:{
                                popup: "estilos-alerta2",
                                title: "estilos-alerta-key"
                            },
                        })
                    } else if (result.isDenied) {
                        Swal.fire({
                            title: "¡Debe confirmar sus datos para finalizar la compra!",
                            customClass: {
                                popup: "estilos-alerta2"
                            },
                            icon: "warning",
                            iconColor: "red",
                        })
                    }
                })
            } else if (result.isDenied) {
                Swal.fire({
                    title: "¡Debe proporcionar sus datos para continuar con la compra",
                    customClass: {
                        popup: "estilos-alerta"
                    },
                    icon: "warning",
                    iconColor: "red",
                })
            }
        })
    }
})



// funcion que cierra el tercer modal para abrir el modal final con la despedida!! 
function compraTerminada() {
    productosEnCarrito.length = 0
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    sumarCantidad()
    limpiarStorage()
    cargarProductosEnCarrito()
}




// funcion para limpiar el storage y que no quede ningun array vacio!
function limpiarStorage() {
    if(productosEnLocalStorage && productosEnLocalStorage.length == 0) {
        localStorage.clear()
    }
}
limpiarStorage()









// ===== SECCION DE EFECTOS DE DESPLAZAMIENTO======

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


