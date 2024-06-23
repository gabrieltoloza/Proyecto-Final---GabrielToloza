
// ESTE FICHERO CONTIENEN LA LOGICA DE DESPLAZAMIENTO GENERALES


//variables de secciones para el desplazamiento
const btnEnvios = document.getElementById('btn-envios')
const btnBlog = document.querySelectorAll('.btn-blog')
const btnTienda = document.querySelectorAll('.btn-tienda')
const btnReprocann = document.querySelectorAll('.btn-reprocann')
const seccionEnvios = document.getElementById('seccion-envios')
const seccionTienda = document.getElementById('seccion-tienda')
const seccionBlog = document.getElementById('seccion-blog')
const seccionReprocann = document.getElementById('seccion-reprocann')
const navBar = document.querySelector('.navbar')
const navBarCollapse = document.querySelector('.navbar-collapse')
const logoHeader = document.querySelector('#logo-header')
const btnIniciarCompra = document.querySelector('#btn-iniciar-carrito')
const modaDelCarrito = new bootstrap.Modal(document.getElementById('exampleModal'), {})
let llave = false




// desplazamiento para botones individuales
function desplazamientoNavLink(boton, pixeles, destino) {
    boton.addEventListener("click", (e) => {
        e.preventDefault()
        const posicionSeccionEnvios = destino.getBoundingClientRect().top + window.scrollY
        const nuevaPosicion = posicionSeccionEnvios + pixeles
        
        window.scrollTo({
            top: nuevaPosicion,
            behavior: "smooth"
        })
    })
}

desplazamientoNavLink(btnEnvios, 1, seccionEnvios) // Desplazamiento hacia el envio


// desplazamiento para NodeList con los botones
function desplazamientoNodoNavLink (nodo, pixeles, seccion) {
    nodo.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault()
            const posicionSeccionEnvios = seccion.getBoundingClientRect().top + window.scrollY
            const nuevaPosicion = posicionSeccionEnvios - pixeles
        
            window.scrollTo({
                top: nuevaPosicion,
                behavior: "smooth"
            })
        })
    })
}

desplazamientoNodoNavLink(btnBlog, 50, seccionBlog) // Desplazamiento hacia el blog (que no se usa)
desplazamientoNodoNavLink(btnReprocann, 230, seccionReprocann) // Desplazamiento hacia la seccion Reprocann
desplazamientoNodoNavLink(btnTienda, -230, seccionTienda) // Desplazamiento hacia la tienda



function iniciarCompraCarrito (boton, pixeles, destino) {
    
    boton.addEventListener("click", (e) => {
        e.preventDefault()
        btnIniciarCompra.toggleAttribute("data-bs-dismiss", "modal")
        const posicionSeccionEnvios = destino.getBoundingClientRect().top + window.scrollY
        const nuevaPosicion = posicionSeccionEnvios + pixeles
        
        setTimeout(() => {
            window.scrollTo({
                top: nuevaPosicion,
                behavior: "smooth"
            })
        }, 500)
        btnIniciarCompra.toggleAttribute("data-bs-dismiss", "modal")
    })
}
iniciarCompraCarrito(btnIniciarCompra, 230, seccionTienda)




// evento que maneja el efecto del navbar
window.addEventListener("scroll", () => {
    if (scrollY > 90 && llave === false){
        
        navBar.style.backgroundColor = "rgb(171, 97, 240)"
        llave = true;
    }else if (scrollY <= 70 && llave === true){
        navBar.style.backgroundColor = "transparent"
        
        llave = false;
    }
});




// al hacer click en el logo te desplaza hacia el inicio
logoHeader.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
})



// funcion para convertir el primer indica de un stirng a mayuscula
function toCapital (str) {
    return str[0].toUpperCase() + str.slice(1)
}