//variables de secciones para el desplazamiento
const btnEnvios = document.getElementById('btn-envios')
const btnBlog = document.querySelectorAll('.btn-blog')
const btnTienda = document.getElementById('btn-tienda')
const btnReprocann = document.querySelectorAll('.btn-reprocann')
const seccionEnvios = document.getElementById('seccion-envios')
const seccionTienda = document.getElementById('seccion-tienda')
const seccionBlog = document.getElementById('seccion-blog')
const seccionReprocann = document.getElementById('seccion-reprocann')
const navBar = document.querySelector('.navbar')
const logoHeader = document.querySelector('#logo-header')
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

desplazamientoNavLink(btnTienda, 400, seccionTienda) // Desplazamiento hacia la tienda
desplazamientoNavLink(btnEnvios, 1, seccionEnvios) // Desplazamiento hacia el envio


// desplazamiento para NodeList con los botones
function desplacamientoNodoNavLink (nodo, pixeles, seccion) {
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

desplacamientoNodoNavLink(btnBlog, 50, seccionBlog) // Desplazamiento hacia el blog (que no se usa)
desplacamientoNodoNavLink(btnReprocann, 230, seccionReprocann) // Desplazamiento hacia la seccion Reprocann






// evento que maneja el efecto del navbar
window.addEventListener("scroll", () => {
    if (scrollY > 90 && llave === false){
        navBar.classList.add("bg-light")
        llave = true;
    }else if (scrollY <= 70 && llave === true){
        navBar.classList.remove("bg-light")
        llave = false;
    }
});




// al hacer click en el logo te desplaza hacia el inicio
logoHeader.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
})