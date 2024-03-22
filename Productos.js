export class Productos {
    static id = 0

    constructor(marca, detalles, precio) {
        this.id = ++Productos.id
        this.marca = marca
        this.detalles = detalles
        this.precio = precio
    }
    
}


