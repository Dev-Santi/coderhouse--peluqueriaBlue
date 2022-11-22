class Producto {
    constructor (nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    quitar(monto) {
        if (monto > 0 && monto <= this.cantidad) {
            this.cantidad -= monto;
        }
    }

    agregar(monto) {
        if (monto > 0) {
            this.cantidad += monto;
        }
    }

    total() {
        return this.cantidad * this.precio;
    }
}