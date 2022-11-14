/* Objetivo: Crear un simulador de carrito de compras */

// Funciones

function menuPrincipal() {
    let opcion = parseInt(prompt("Ingrese la opción deseada:\n\n 1- Agregar artículos al carrito\n 2- Quitar artículos del carrito\n 3- Ver cantidad de articulos en el carrito\n 4- Ir a pagar\n 5- Salir"));
    return opcion;
}

function seleccionarArticulo() {
    let articulo = parseInt(prompt("Ingrese la opción deseada:\n\n 1- Peines Keller\n 2- Perfume Snirf\n 3- Kit higiene bucal\n 4- Labial Maybelline\n 5- Cancelar"));
    let finalizar;
    do {
        if (articulo > 0 && articulo < 6) {
            finalizar = true;
            return articulo;
        }
        else {
            finalizar = false;
            alert("Opción inválida, intente nuevamente.");
            articulo = parseInt(prompt("Ingrese la opción deseada:\n\n 1- Peines Keller\n 2- Perfume Snirf\n 3- Kit higiene bucal\n 4- Labial Maybelline\n 5- Cancelar"));
        }
    } while (finalizar == false);
}

function agregarArticulo (n) {
    total += precios[n];
    carrito[n]++;
}

function quitarArticulo(n) {
    if (carrito[n] > 0) {
        total -= precios[n];
        carrito[n]--;
        alert("¡Artículo quitado con éxito!")
    }
    else {
        alert("El articulo seleccionado no se encuentra en el carrito.");
    }
}

function verCarrito () {
    if (total > 0) {
        let cantidad = 0;
        for (const producto of carrito){
            cantidad += producto;
        }
        alert("Hay " + cantidad + " articulo/s por un total de $" + total);
    }
    else {
        alert("¡Aún no hay articulos en el carrito!");
    }
}

function mostrarArticulos() {
    let peinesKeller;
    let perfumeSnirf;
    let kitHigiene;
    let labialMaybelline;
    let salida;

    if (carrito[0] > 0) {
        peinesKeller = '1- Peines Keller x' + carrito[0];
    }
    else {
        peinesKeller = '1-';
    }

    if (carrito[1] > 0) {
        perfumeSnirf = '2- Perfume Snirf x' + carrito[1];
    }
    else {
        perfumeSnirf = '2-';
    }

    if (carrito[2] > 0) {
        kitHigiene = '3- Kit higiene bucal x' + carrito[2];
    }
    else {
        kitHigiene = '3-';
    }

    if (carrito[3] > 0) {
        labialMaybelline = '4- Labial Maybelline x' + carrito[3];
    }
    else {
        labialMaybelline = '4-';
    }

    /* salida = peinesKeller + perfumeSnirf + kitHigiene + labialMaybelline; */
    salida = `${peinesKeller}\n ${perfumeSnirf}\n ${kitHigiene}\n ${labialMaybelline}`;
    return salida;
}

function mostrarTotal() {
    alert(`Monto total en el carrito: $${total.toFixed(2)}\n\n ${mostrarArticulos()}`);
}

function opcionPagar() {
    let pagar = parseInt(prompt("Ingrese la opcion deseada:\n\n 1- Pagar\n 2- Cancelar"));
    let finalizar;
    do {
        if (pagar == 1 || pagar == 2) {
            finalizar = true;
            return pagar;
        }
        else {
            finalizar = false;
            alert("Opción inválida, intente nuevamente.");
            pagar = parseInt(prompt("Ingrese la opcion deseada:\n\n -1 Pagar\n 2- Cancelar"));
        }
    } while (finalizar == false);
}

function pagoExitoso() {
    total = 0;
    carrito[0, 1, 2, 3] = 0;
    alert("¡El pago ha sido exitoso!")
}

// Principal

//Stock de artículos

// Precio de los artículos
const precios = [629.99, 1339.99, 460.00, 1000.00];

// Contadores
let carrito = [0, 0, 0, 0];
let total = 0;

//Comienza el programa
let opcion = menuPrincipal();

while (opcion != 5) {
    let articulo;
    switch (opcion) {
        case 1:
            articulo = seleccionarArticulo();
            switch (articulo) {
                case 1:
                    agregarArticulo(0);
                    break;
                case 2:
                    agregarArticulo(1);
                    break;
                case 3:
                    agregarArticulo(2);
                    break;
                case 4:
                    agregarArticulo(3);
                    break;
            }
            if (articulo != 5) {
                alert("¡Artículo agregado con éxito!")
            }
            break;
        case 2:
            if (total > 0) {
                articulo = seleccionarArticulo();
                switch (articulo) {
                    case 1:
                        quitarArticulo(0);
                        break;
                    case 2:
                        quitarArticulo(1);
                        break;
                    case 3:
                        quitarArticulo(2);
                        break;
                    case 4:
                        quitarArticulo(3);
                        break;
                }
            }
            else {
                alert("¡Aún no hay articulos en el carrito!");
            }
            break;
        case 3:
            verCarrito();
            break;
        case 4:
            if (total > 0) {
                mostrarTotal();
                if (opcionPagar() == 1) {
                    pagoExitoso();
                }
            }
            else {
                alert("¡Aún no hay articulos en el carrito!");
            }
            break;
        default:
            alert("Opción inválida, intente nuevamente.");
            break;
    }
    opcion = menuPrincipal();
}