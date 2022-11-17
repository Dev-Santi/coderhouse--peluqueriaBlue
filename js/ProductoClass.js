class Producto {
    constructor (item, stock) {
        this.item = item;
        this.stock = stock;
    }

    quitar(cantidad) {
        if (cantidad > 0 && cantidad <= this.stock) {
            this.stock -= cantidad;
        }
    }

    agregar(cantidad) {
        if (cantidad > 0) {
            this.stock += cantidad;
        }
    }
}