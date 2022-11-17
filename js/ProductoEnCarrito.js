class ProductoEnCarrito {
    constructor (item, cantidad) {
        this.item = item;
        this.cantidad = cantidad;
    }

    agregar(cantidad) {
        if (cantidad > 0) {
            this.cantidad += cantidad;
        }
    }

    quitar(cantidad) {
        if (cantidad > 0 && cantidad <= this.cantidad) {
            this.cantidad -= cantidad;
        }
    }

    monto() {
        return this.item.precio * this.cantidad;
    }
}