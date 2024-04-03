/*
    El trabajo esta por la mitad por temas de trabajo y de salud ( tengo dengue), 

    Abrir el archivo index.html, navegar hasta la seccion de productos, las funciones de orden superior,
    clases y objetos, dom y eventos estan aplicados al listado de productos en stock, y tambien al filtrado
    segun categoria del producto, por el momento quedo ahi.  
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



//variable booleana
const llaveDeLuz = true


// Variables de productos
const contenedorProductos = document.querySelector('.contenedor-productos')
const formularioProductos = document.querySelector('.form-search')
const input = document.querySelector('.input-search')
const categoriaHTML = document.querySelector('.categoria')
const btnCarrito = document.querySelectorAll('.btnCarrito')






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
                                        <button class="btnCarrito btnc my-2" id="${producto.id}">Agregar carrito</button>
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
}
listandoStock(stock)



// evento para filtrar productos via formulario 
formularioProductos.addEventListener('submit', (event) =>{

    event.preventDefault()
    contenedorProductos.innerHTML = ''
    const filtrado = stock.filter((producto) => producto.categoria === input.value || producto.marca.includes(input.value))
    const categoria = stock.find((producto) => producto.categoria === input.value)
    // llamando a la funcion de listado con los productos filtrados
    categoriaHTML.innerText = `${categoria.categoria}`
    listandoStock(filtrado)
    
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



function agregarCarrito() {
    let btnCarrito = document.querySelectorAll(".btnCarrito")
    btnCarrito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = e.currentTarget.id
            const productoCarrito = productos.find(producto => producto.id == productoId)
            console.log(productoCarrito);
        })
    })
} 