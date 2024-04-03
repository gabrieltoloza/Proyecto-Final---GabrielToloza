class Productos {
    static id = 0

    constructor(marca, detalles, precio, categoria, imagenUrl) {
        this.id = ++Productos.id
        this.marca = marca
        this.detalles = detalles
        this.precio = precio
        this.categoria = categoria
        this.imagenUrl = imagenUrl
    }
    
    descuentoReprocann (categoria, precio) {
        if (categoria === 'semillas'){
            console.log(`Marca: ${categoria} | Precio: ${precio}`);
            const descuentoA = precio * 0.1
            const descuentoFinal = precio - descuentoA
            return descuentoFinal  
        } else {
            console.log(`Marca: ${categoria} | Precio: ${precio}`);
            const descuentoB = precio * 0.25
            const descuentoFinal = precio - descuentoB
            return descuentoFinal
        }
    }
}


