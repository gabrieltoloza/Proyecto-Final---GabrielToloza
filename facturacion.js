//  variables del modal de facturacion

const btnFacturacion = document.querySelector('#abrirSegundoModal')
let inputCodigo = document.querySelector('#form-input-codigo')
const formularioFactura = document.querySelector('#formulario-validacion')
const btnConfirmarFactura = document.querySelector('#btnConfirmarFactura1')
let btnConfirmarFactura2 = document.querySelector('#btnConfirmarFactura2')
let inputsDatosFactura = document.querySelectorAll('.input-datos-factura')
const modalFactura = new bootstrap.Modal(document.getElementById('modalFacturacion'), {})






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
                                  
                        Swal.fire({
                            title: "Compra Realizada",
                            html:`
                                  <b>Revise su correo electrónico para visualizar su factura.</b><br>  
                                  <b>El producto llegara a la dirección que indico en la misma.</b><br>
                                  <b>¡Muchas gracias por su compra!</b><br>`,
                            confirmButtonText: "Continuar comprando",
                            showCancelButton: true,
                            cancelButtonText: "Terminar compra",
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


