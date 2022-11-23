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
        const elemento = stock.find((el) => el.nombre == e.nombre);
        const id = stock.indexOf(elemento);
        //Comprobamos si existe stock
        if (stock[id].cantidad > 0) {
            e.cantidad++;
            stock[id].cantidad--;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("stock", JSON.stringify(stock));
            document.location.reload();
        }
        else {
            alert("Ya no nos quedan más unidades! :c");
        }
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

//Vaciar carrito:
let vaciarCarrito = document.getElementById('vaciar');
vaciarCarrito.onclick = () => {
    stock.forEach((el, indice) => {
        carrito.forEach((e, i) => {
            if (el.nombre == e.nombre) el.cantidad += e.cantidad;
        });
    });
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("stock", JSON.stringify(stock));
    document.location.reload();
}

//Finalizar compra
//Simula una compra, limpia el carrito y refleja la falta en el stock:
let finalizarCompra = document.getElementById('finalizar');
finalizarCompra.onclick = () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Compra Realizada!")
    document.location.reload();
}

//Mostrar total a pagar
let acum = 0;
carrito.forEach((e) => {
    acum += e.cantidad * e.precio;
});
let monto = document.createElement("p");
monto.innerText = `$${acum.toFixed(2)}`;
total.append(monto);

/* localStorage.clear(); */