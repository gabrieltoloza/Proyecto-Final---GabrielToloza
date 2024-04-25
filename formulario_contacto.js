const formularioContacto = document.querySelector('.formulario-contacto')


formularioContacto.addEventListener("submit", event => {
    event.preventDefault()

    const datos = Object.fromEntries(
        new FormData(event.target)
    )
    
    const alertaContacto = Swal.fire({
                                
                                html: `<i><b>Hemos recibido tu formulario con exito ${datos.nombre}, en la brevedad un profesional estara en contacto a ${datos.email} o ${datos.telefono}. Hecha un vistazo al blog sobre medicina alternativa y sus nuevos descubrimientos mientras tanto!.</b></i>`,
                                footer: "",
                                customClass: {
                                    popup: "estilos-alerta4",

                                }
                            }).then(result => {
                                if (result.isConfirmed) {
                                    event.target.reset()
                                }
                            })
    
})