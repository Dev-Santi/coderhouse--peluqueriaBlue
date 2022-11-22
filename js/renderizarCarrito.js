//Se importan los arrays desde el local storage:
let carrito = JSON.parse(localStorage.getItem("carrito"));
if (carrito == undefined) {
    carrito = [];
}
let stock = JSON.parse(localStorage.getItem("stock"));

//Elementos donde se renderizará el carrito:
let listaProductos = document.getElementById("productosLista");
let productosCantidad = document.getElementById("cantidadLista");
let total = document.getElementById("total");

//Renderizar carrito
carrito.forEach((e, indice) => {
    //Elementos de la columna de productos:
    let producto = document.createElement("li");
    producto.innerText = e.nombre;

    //Elementos de la columna de cantidades:
    const cantidad = document.createElement("li");
    const aumentar = document.createElement("button");
    const disminuir = document.createElement("button");

    //Botones para +- la cantidad productos en el carrito:
    aumentar.classList = "btn btn-success";
    aumentar.setAttribute("id", "aumentar");
    aumentar.innerText = "+";
    disminuir.innerText = "-";
    disminuir.classList = "btn btn-danger";
    disminuir.setAttribute("id", "disminuir");

    aumentar.onclick = () => {
        e.cantidad++;
        //
        const elemento = stock.find((el) => el.nombre == e.nombre);
        const id = stock.indexOf(elemento);
        stock[id].cantidad--;
        //
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("stock", JSON.stringify(stock));
        document.location.reload();
    };

    disminuir.onclick = () => {
        if (e.cantidad > 0) {
            e.cantidad--;

            const elemento = stock.find((el) => el.nombre == e.nombre);
            const id = stock.indexOf(elemento);
            stock[id].cantidad++;

            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("stock", JSON.stringify(stock));
            document.location.reload();
        }
    };

    //Renderizar columnas
    cantidad.innerText = `x${e.cantidad}`;
    cantidad.append(aumentar);
    cantidad.append(disminuir);
    if (e.cantidad > 0) {
        listaProductos.append(producto);
        productosCantidad.append(cantidad);
    }
});

//Mostrar total a pagar
let acum = 0;
carrito.forEach((e) => {
    acum += e.cantidad * e.precio;
});
let monto = document.createElement("p");
monto.innerText = `$${acum.toFixed(2)}`;
total.append(monto);