//  variables del modal de facturacion
const btnFacturacion = document.querySelector('#abrirSegundoModal')
let inputCodigo = document.querySelector('#form-input-codigo')
const formularioFactura = document.querySelector('#formulario-validacion')
const btnConfirmarFactura = document.querySelector('#btnConfirmarFactura1')
let btnConfirmarFactura2 = document.querySelector('#btnConfirmarFactura2')
const modalFactura = new bootstrap.Modal(document.getElementById('modalFacturacion'), {})
let inputsDatosFactura = document.querySelectorAll('.input-datos-factura')

// variables Reprocann
let inputsReprocann = document.querySelectorAll('.input-datos-factura-reprocann')
const reprocannDescuento = document.querySelector('#btn-descuento-reprocann')
const formularioReprocann = document.querySelector('#formulario-reprocann')
const btnConfirmarReprocann = document.querySelector('#btnConfirmarReprocann')
const colorPrecioActializado = document.querySelectorAll('.card-h4')







//evento que cierra el primer modal para abrir el segundo modal de facturacion con Bootstrap
btnFacturacion.addEventListener("click", () => {
    document.querySelector('#exampleModal').classList.remove('show')
})




// evento y consumo de funcion para vaciar el carrito 
botonVaciar.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estas seguro que quieres eliminar todos los productos agregados al carrito?",
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



// Evento de escucha para el campo "Codigo de Seguridad" para que solo admita 5 
//   caracteres numericos y algunos comandos con el teclado para la experiencia de usuario
inputCodigo.addEventListener("keydown", (e) => {
    if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Delete", "Enter", "Tab"].includes(e.key)) {
        e.preventDefault()
    }
})






// Evento que cierra el segundo modal para abrir SweetAlert con los datos 
//   recuperados del formulario/modal  anterior.

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
        
        event.preventDefault()
        Swal.fire({
            title: "¿Confirma el envío de datos personales para su facturación?",
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
                    confirmButtonText: "Confirmar y comprar",
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
                        // cliente.agregarCompra(productosEnCarrito.marca)          
                        Swal.fire({
                            title: "Compra Realizada",
                            html:`
                                  <b>Revise su correo electrónico para visualizar su factura.</b><br>  
                                  <b>El producto llegara a la dirección que indico en la misma.</b><br>
                                  <b>¡Muchas gracias por su compra!</b><br>`,
                            confirmButtonText: "Continuar comprando",
                            showDenyButton: true,
                            denyButtonText: "Terminar compra",
                            customClass:{
                                popup: "estilos-alerta2",
                                title: "estilos-alerta-key"
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {

                                const posicionSeccionTienda = seccionTienda.getBoundingClientRect().top + window.scrollY
                                const nuevaPosicion = posicionSeccionTienda + 400
                            
                                setTimeout(() => {
                                    window.scrollTo({
                                        top: nuevaPosicion,
                                        behavior: "smooth",
                                    })
                                }, 500)
                            }
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




// funcion para borrar el localStorage y actualizar interfaz del carrito al concluir la compra
function compraTerminada() {
    productosEnCarrito.length = 0
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
    

    sumarCantidad()
    limpiarStorage()
    cargarProductosEnCarrito()
}


// evento para manejar el descuento Reprocann con su funcion.
reprocannDescuento.addEventListener("click", handlerReprocann, true)



// funcion que controla el descuento Reprocann
function handlerReprocann (event) {

    formularioReprocann.animate([
        {opacity: '0'},
        {opacity: '1'}
    ], {
        duration: 700,
    })

    Toastify({
        text: "Completa con tus datos reales",
        duration: 3000,
        gravity: "top", 
        position: "left",
        stopOnFocus: false, 
        className: "centrar-toasty",
        style: {
            background: "linear-gradient(to right, #C40606, #F12828)",
            borderRadius: "2rem",
            width: "300px",
            height: "60px",
        },
        offset: {
            x: '1.5rem',
            y: '4rem' 
        },
        onClick: function(){}
    }).showToast();


    btnConfirmarReprocann.addEventListener("click", (event) => {
        
        isValid = true

        //! Datos del usuario registrado
        let usuarioReprocann = []
        let productosMarca = []

        inputsReprocann.forEach(input => {
            if (!input.validity.valid) {
                isValid = false
            }else {
                formularioReprocann.classList.add('was-validated')
                usuarioReprocann.push(input.value)
            }
        })

        productosEnCarrito.forEach(producto => {
            productosMarca.push(producto.marca)
        })
        usuarioReprocann.push(productosMarca)

        if (isValid && formularioReprocann.classList.contains('was-validated')) {
            event.preventDefault()

            Swal.fire({
                title: "¿Confirma sus datos de Reprocann??",
                showDenyButton: true,
                confirmButtonText: "Confirmar",
                denyButtonText: `Cancelar`,
                customClass: {
                    popup: "estilos-alerta2"
                }
            

            }).then(result => {
                if (result.isConfirmed) {
                    //! GUARDAR COMPRA EN LOCAL STORAGE
                    sessionStorage.setItem("usuarioReprocann", JSON.stringify(usuarioReprocann))
                    aplicarDescuentoReprocann()
                }
            })
        }
    })
}


//  Funcion para aplicar el descuento Reprocann
function aplicarDescuentoReprocann () {

    let jsonDb = fetch('./categorias_reprocann.json')
    jsonDb.then(response => response.json()
            .then(datos => {
                
                const categoria = datos.find((obj) => obj.categoria == inputsReprocann[2].value.toLowerCase())
                
                if (!categoria) {
                    Swal.fire({
                        title: "Categoria no encontrada",
                        html:   `Debe seleccionar una categoria que exista. Las opciones son: 
                                <strong> consumidor </strong>, 
                                <strong> paciente </strong>, 
                                <strong> productor </strong>, 
                                <strong> profesional </strong>.
                                    Vuelva a intentarlo agregando una opcion disponible`,
                        confirmButtonText: "Confirmar",
                        customClass: {
                            popup: "estilos-alerta2"
                        }
                    })
                    return;
                }
                
                stock.forEach(producto => {
                    const precioProductoCarrito = producto.precio
                    const valorDescuento = (categoria.descuento / 100) * precioProductoCarrito
                    
                    producto.precio -= valorDescuento
                }) 
                cargarProductosEnCarrito()
                contenedorProductos.innerHTML = ''
                listandoStock(stock)
                
                

                Swal.fire({
                    title: "Descuentos aplicados",
                    text: `Se ha aplicado la rebaja de precios en su carrito de compras.
                            Segun su categoria usted tiene un ${categoria.descuento}% 
                            de descuento en todos los productos. Por favor verifique 
                            su nueva cotizacion en el carrito de compras`,
                    confirmButtonText: "Confirmar",
                    customClass: {
                        popup: "estilos-alerta2"
                    }
                }).then(result => {
                    if (result.isConfirmed) {
                        //
                    }
                })
                
                reprocannDescuento.removeEventListener("click", handlerReprocann, true)
                reprocannDescuento.toggleAttribute("data-bs-toggle")
                reprocannDescuento.textContent = "Descuento aplicado"
                reprocannDescuento.classList.remove("dbtn", "dropdown-toggle")
                reprocannDescuento.classList.add("dbtn-confirmado")


                inputsReprocann.forEach(input => {
                    input.value = ''
                    formularioReprocann.classList.remove('was-validated')
                })   

                
            })
            .catch(err => {
                Swal.fire({
                    title: "Error 404",
                    text: `Ocurrio un error inesperado, vuelva a intentarlo`,
                    confirmButtonText: "Ok",
                    customClass: {
                        popup: "estilos-alerta2"
                    }
                })
            })  
    )
}



function reloadCarrito() {
    const storage = JSON.parse(localStorage.getItem("productosEnCarrito"))
    
}