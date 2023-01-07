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
let vaciarCarrito = document.getElementById('vaciar');
let finalizarCompra = document.getElementById('finalizar');

//Renderizar carrito
carrito.forEach((e) => {
    //Elementos de la columna de productos:
    let producto = document.createElement("li"); producto.innerText = e.nombre;

    //Elementos de la columna de cantidades:
    const cantidad = document.createElement("li");
    const cantidadValor = document.createElement("span");
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
            
            cantidadValor.innerText = e.cantidad;

            //Mostrar total a pagar
            let a = 0;
            carrito.forEach((e) => {
                a += e.cantidad * e.precio;
            });
            monto.innerText = `$${a.toFixed(2)}`;
        }
        else {
            swal("Ya no nos quedan más unidades! :c");
        }
    };

    disminuir.onclick = () => {
        let cantidadAnterior = e.cantidad;
        if (e.cantidad > 1) {
            e.cantidad--;

            const elemento = stock.find((el) => el.nombre == e.nombre);
            const id = stock.indexOf(elemento);
            stock[id].cantidad++;

            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("stock", JSON.stringify(stock));

            cantidadValor.innerText = e.cantidad;
        }
        if (cantidadAnterior == 1) {
            e.cantidad--;
            const elemento = stock.find((el) => el.nombre == e.nombre);
            const id = stock.indexOf(elemento);
            stock[id].cantidad++;

            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("stock", JSON.stringify(stock));
        }
        if (e.cantidad == 0) {
            carrito.splice(carrito.indexOf(e), 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("stock", JSON.stringify(stock));

            document.location.reload();
        }

        //Mostrar total a pagar
        let a = 0;
        carrito.forEach((e) => {
            a += e.cantidad * e.precio;
        });
        monto.innerText = `$${a.toFixed(2)}`;
    };

    //Renderizar columnas
    cantidadValor.innerText = e.cantidad;
    cantidad.append(cantidadValor);
    cantidad.append(aumentar);
    cantidad.append(disminuir);
    if (e.cantidad > 0) {
        listaProductos.append(producto);
        productosCantidad.append(cantidad);
    }
});


//Vaciar carrito:
vaciarCarrito.onclick = () => {
    if(carrito.length != 0){
        stock.forEach((el) => {
            carrito.forEach((e) => {
                let vaciar = el.nombre == e.nombre ? el.cantidad += e.cantidad : "";
                vaciar;
            });
        });
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("stock", JSON.stringify(stock));
        document.location.reload();
    }
    else {
        swal("No hay artículos en el carrito...");
    }
}

//Finalizar compra
//Simula una compra, limpia el carrito y refleja la falta en el stock:
finalizarCompra.onclick = () => {
    if(carrito.length != 0) {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        document.location.reload();
    }
    else {
        swal("No hay artículos en el carrito...");
    }
}

//Mostrar total a pagar
let acum = 0;
carrito.forEach((e) => {
    acum += e.cantidad * e.precio;
});
let monto = document.createElement("p");
monto.innerText = `$${acum.toFixed(2)}`;
total.append(monto);

//

let cant = 0

carrito.map((e) => {
    cant += e.cantidad;
});

if (cant < 1) {
    localStorage.clear();
}

let iconoCarro = document.getElementsByClassName('carro')[0];
let icono = localStorage.getItem('carritoActivo')

if(icono == 'true') {
    iconoCarro.classList.toggle('active');
}

function isIcono() {
    if (!iconoCarro.classList.contains('active')) {
        iconoCarro.classList.toggle('active');
        localStorage.setItem('carritoActivo', true);
    }
}
