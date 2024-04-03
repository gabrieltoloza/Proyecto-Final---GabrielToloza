// importando clase de Productos
import { Productos } from "./Productos.js"


const local = JSON.parse(localStorage.getItem('stock'))


const stock = [
    new Productos('sativex',
                `Es un spray bucal que contiene una combinación de THC y CBD,
                utilizado principalmente para el tratamiento de la espasticidad 
                en pacientes con esclerosis múltiple.`,
                45000
                // Producto con 10% descuento con reprocann
    ),
    
    new Productos('epidiolex',
                `Es un medicamento aprobado por la FDA para el tratamiento de
                convulsiones asociadas con el síndrome de Lennox-Gastaut y
                el síndrome de Dravet en pacientes pediátricos.`,
                150000
                // Producto con 10% descuento con reprocann
    ),

    new Productos('marinol',
                  `(dronabinol) Es una cápsula oral que contiene THC sintético,
                  aprobada para tratar las náuseas y los vómitos asociados con 
                  la quimioterapia, así como para estimular el apetito en 
                  pacientes con VIH/SIDA.`,
                  80000
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('syndros',
                  `Medicamento de venta libre en algunos países, que contiene extracto 
                  de cannabis y se utiliza para el alivio del dolor y la inflamación 
                  en afecciones musculoesqueléticas.`,
                  95000
                  // Producto con 25% descuento con reprocann
    ),

    new Productos('epidiolex',
                  `Es un medicamento aprobado por la FDA para el tratamiento de
                  convulsiones asociadas con el síndrome de Lennox-Gastaut y
                  el síndrome de Dravet en pacientes pediátricos.`,
                  150000
                  // Producto con 15% descuento con reprocann
    ),
]


const cargarProducto = () => {
    let marca;
    while (!marca) {
        marca = prompt("Ingrese la marca del producto")
    }
    
    let detalles;
    while (!detalles) {
        detalles = prompt("Ingrese detalles del producto")
    }
    
    let precio;
    while (!precio || isNaN(precio)) {
        precio = parseFloat(prompt("Ingrese el precio del producto"))
    }

    const producto = new Productos(marca, detalles, precio)
    console.log(producto);
    stock.push(producto)
    localStorage.setItem('stock', JSON.stringify(stock))
}

//* OK
// Funcion para listar el stock de productos
const listarStock = (arr) => {
    const i = []
    arr.forEach((nombreProducto) => i.push("\n" + nombreProducto.marca))
    alert(i.join("\n"))
}

//* OK
// Funcion para aplicar el descuento segun el producto
function descuentoReprocann(marca, precio){
    if(marca === 'sativex' || marca === 'epidiolex'){
        console.log(`Marca: ${marca} | Precio: ${precio}`);
        const descuentoA = precio * 0.1
        const descuentoFinal = precio - descuentoA
        return descuentoFinal  
    }else if (marca === 'marinol' || marca === 'syndros'){
        console.log(`Marca: ${marca} | Precio: ${precio}`);
        const descuentoB = precio * 0.25
        const descuentoFinal = precio - descuentoB
        return descuentoFinal
    }else{
        console.log(`Marca: ${marca} | Precio: ${precio}`);
        const descuentoC = precio * 0.15
        const descuentoFinal = precio - descuentoC
        return descuentoFinal
    }
}

// Funcion para generar la facturacion.
const datosFactura = () => {
    let titularTarjeta = prompt("Ingrese nombre y apellido del titular de la tarjeta")
    let numerosTarjeta = parseInt(prompt("Ingrese los digitos de su tarjeta"))
    let codigoTarjeta = parseInt(prompt("Ingrese codigo de seguridad de la tarjeta"))
    let emailComprador = prompt("Ingrese su correo electronico, aqui le llegara su factura")
    let direccion = prompt("Ingrese su domicilio donde llegara el producto.")
    const factura = {
        titularTarjeta: titularTarjeta,
        numerosTarjeta: numerosTarjeta,
        codigoTarjeta: codigoTarjeta,
        emailComprador: emailComprador,
        direccion: direccion
    }
    return factura
}

// Menu de entrada a la app
let primerEntrada = parseInt(prompt("Bienvenido! \n Ingrese 1 para listar los pedidos \n Ingrese 2 para tomar su pedido \n Ingrese 3 para ingresar un nuevo producto \n Ingrese 4 para salir"))

while(primerEntrada !== 4){
    switch(primerEntrada){
        // Primero caso lista el stock de productos
        case 1:
            // Comprobamos si esta el stock en "localStorage", sino usamos el array "stock"
            if (local) {
                listarStock(local)
                console.log("Imprime localStorage");
            }else{
                listarStock(stock)
                console.log("Imprime stock");
            }
            break
        
        // Segundo caso procede a la interaccion para la compra del producto
        case 2:
            let tomarPedido = prompt("¿Que producto necesita?")
            
            if (tomarPedido === null){ // Si el producto es nulo (le da al boton cancelar) vuelve a ejecutar el while
                break
            }
            //pedido del cliente
            let pedido = []
            let productoEncontrado = false // variable para manejar el error de entrada del usuario

            // Comprobamos si esta la variable de localStorage para filtrar el pedido sino, nos agarramos del array "stock"
            if (local) {
                const resultado = local.find(producto => producto.marca === tomarPedido.toLowerCase())
                console.log(resultado);
                if (resultado) {
                    productoEncontrado = true
                    pedido.push(resultado)
                }
            }else {
                const resultado = stock.find(producto => producto.marca === tomarPedido.toLowerCase())
                console.log(resultado);
                if (resultado) {
                    productoEncontrado = true
                    pedido.push(resultado)
                }
            }
            
            // si el producto no esta en el stock, rompe el ciclo y vuelve a ejecutar el while mostrando la alerta
            if(productoEncontrado === false){
                alert("Producto no encontrado. Por favor seleccione un producto de la lista")
                break
            }
            // variable para validar proceso de compra
            let validarCompra = false

            // informacion del producto
            pedido.forEach(i => {
                let confirmar = confirm(`Producto: ${i.marca} \n Detalles: ${i.detalles} \n Precio: ${i.precio} \n \n ¿Confirma su producto?`)
                if (confirmar === true) {
                    validarCompra = true
                }
            })

            if (validarCompra === false){
                break
            }

            const usuarioReprocann = confirm("¿Esta usted registrado en el Reprocann?")
            // condicional para manejar el descuento segun el producto
            if(usuarioReprocann === true){
                alert("Usted tiene descuento segun el producto");
                for(let i of pedido){
                    console.log(i.precio);
                    // aplicando descuento con la funcion declarada
                    console.log(pedido);
                    i.precio = descuentoReprocann(i.marca ,i.precio)
                    alert(`El precio con descuento queda en ${i.precio}\n A continuacion ingrese sus datos para la facturación.`)
                    // generando la facturacion con la funcion declarada
                    const factura = datosFactura()
                    confirm(` Datos de la factura \n Pedido: \n Producto: ${i.marca} \n Precio: ${i.precio} \n Titular: ${factura.titularTarjeta} \n Numero de tarjeta: ${factura.numerosTarjeta} \n Email: ${factura.emailComprador} \n Direccion: ${factura.direccion} \n\n Confirma su compra?`)
                    alert("Se ha confirmado la compra con exito, su factura llegara a casilla de correo y el producto a la direccion proporcionada. Muchas gracias")
                
                }
                break
            }else {
                alert("Registrandose en el Reprocann puede acceder a descuentos segun el producto.\n A continuacion ingrese sus datos para la facturacion")
                for(let i of pedido){
                    // generando la facturacion con la funcion declarada
                    const factura = datosFactura()
                    confirm(` Datos de la factura \n Pedido: \n Producto: ${i.marca} \n Precio: ${i.precio} \n Titular: ${factura.titularTarjeta} \n Numero de tarjeta: ${factura.numerosTarjeta} \n Email: ${factura.emailComprador} \n Direccion: ${factura.direccion} \n\n Confirma su compra?`)
                    alert("Se ha confirmado la compra con exito, su factura llegara a casilla de correo y el producto a la direccion proporcionada. Muchas gracias")
                }
                break
            }
        case 3:
            cargarProducto()
            break

        default:
            // Controlando los errores de entrada
            alert("Opcion inválida")
            break
    }
    // volviendo a ejecutar el bucle
    primerEntrada = parseInt(prompt("Bienvenido! \n Ingrese 1 para listar los pedidos \n Ingrese 2 para tomar su pedido \n Ingrese 3 para ingresar un nuevo producto \n Ingrese 4 para salir"))

}
// finalizacion del bucle
alert("Gracias por visitarnos. Tenga excelente dia.!")

