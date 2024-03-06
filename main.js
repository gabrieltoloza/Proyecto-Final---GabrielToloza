
// stock de productos
const stock = [
    {   marca: 'sativex', 
        detalles: `
        Es un spray bucal que contiene una combinación de THC y CBD,
        utilizado principalmente para el tratamiento de la espasticidad 
        en pacientes con esclerosis múltiple.`,
        precio: 45000
        // Producto con 10% descuento con reprocann
    },

    {
        marca: 'epidiolex',
        detalles: `
        Es un medicamento aprobado por la FDA para el tratamiento de
        convulsiones asociadas con el síndrome de Lennox-Gastaut y
        el síndrome de Dravet en pacientes pediátricos.`,
        precio: 150000
        // Producto con 10% descuento con reprocann
    },

    {
        marca: 'marinol',
        detalles: `
        (dronabinol) Es una cápsula oral que contiene THC sintético,
        aprobada para tratar las náuseas y los vómitos asociados con 
        la quimioterapia, así como para estimular el apetito en 
        pacientes con VIH/SIDA.`,
        precio: 80000
        // Producto con 25% descuento con reprocann
    },

    {
        marca: 'syndros',
        detalles: `
        Es una solución oral de dronabinol, similar a Marinol, pero en
        una forma líquida.`,
        precio: 95000
        // Producto con 25% descuento con reprocann
    },

    {
        marca: 'canagro',
        detalles: `
        Medicamento de venta libre en algunos países, que contiene extracto 
        de cannabis y se utiliza para el alivio del dolor y la inflamación 
        en afecciones musculoesqueléticas.`,
        precio: 70000
        // Producto con 15% descuento con reprocann
    }
]

// Funcion para listar el stock de productos
const listarStock = (arr) => {
    let i = []
    for(let producto of arr){
        i.push("\n" + producto.marca)
    }
    alert(i.join('\n'))
}

// Funcion para aplicar el descuento segun el producto
function descuentoReprocann(producto){
    if(producto === 'sativex' || producto === 'epidiolex'){
        const descuentoA = producto * 0.1
        const descuentoFinal = producto - descuentoA
        return descuentoFinal  
    }else if (producto === 'marinol' || producto === 'syndros'){
        const descuentoB = producto * 0.25
        const descuentoFinal = producto - descuentoB
        return descuentoFinal
    }else{
        const descuentoC = producto * 0.15
        const descuentoFinal = producto - descuentoC
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
let primerEntrada = parseInt(prompt("Bienvenido! \n Ingrese 1 para listar los pedidos \n Ingrese 2 para tomar su pedido \n Ingrese 3 para salir"))

while(primerEntrada !== 3){
    switch(primerEntrada){
        // Primero caso lista el stock de productos
        case 1:
            listarStock(stock)
            break
        
        // Segundo caso procede a la interaccion para la compra del producto
        case 2:
            let tomarPedido = prompt("¿Que producto necesita?")
            if (tomarPedido === null){ // Si el producto es nulo (le da al boton cancelar) vuelve a ejecutar el while
                break
            }
            let pedido = []
            console.log(pedido);
            let productoEncontrado = false // variable para manejar el error de entrada del usuario
            for(let i of stock){
                if (i.marca === tomarPedido.toLowerCase()){
                    productoEncontrado = true
                    pedido.push(i)
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
            for (let i of pedido){
                let confirmar = confirm(`Producto: ${i.marca} \n Detalles: ${i.detalles} \n Precio: ${i.precio} \n \n Confirma su producto?`)
                if(confirmar === true){
                    validarCompra = true
                }
            }
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
                    i.precio = descuentoReprocann(i.precio)
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
        default:
            // Controlando los errores de entrada
            alert("Opcion inválida")
            break
    }
    // volviendo a ejecutar el bucle
    primerEntrada = parseInt(prompt("Bienvenido! \n Ingrese 1 para listar los pedidos \n Ingrese 2 para tomar su pedido \n Ingrese 3 para salir"))

}
// finalizacion del bucle
alert("Gracias por visitarnos. Tenga excelente dia.!")

