/* Objetivo: Crear un simulador de carrito de compras */

// Funciones

function menuPrincipal() {
    let opcion = parseInt(prompt("Ingrese la opción deseada:\n\n 1- Agregar artículos al carrito\n 2- Quitar Artículos del carrito\n 3- Ir a pagar\n 4- Salir"));
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

function mostrarArticulos() {
    let peinesKeller;
    let perfumeSnirf;
    let kitHigiene;
    let labialMaybelline;
    let salida;

    if (contadorValor1 > 0) {
        peinesKeller = '1- Peines Keller x' + contadorValor1;
    }
    else {
        peinesKeller = '1-';
    }

    if (contadorValor2 > 0) {
        perfumeSnirf = '2- Perfume Snirf x' + contadorValor2;
    }
    else {
        perfumeSnirf = '2-';
    }

    if (contadorValor3 > 0) {
        kitHigiene = '3- Kit higiene bucal x' + contadorValor3;
    }
    else {
        kitHigiene = '3-';
    }

    if (contadorValor4 > 0) {
        labialMaybelline = '4- Labial Maybelline x' + contadorValor4;
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
    contadorValor1 = 0;
    contadorValor2 = 0;
    contadorValor3 = 0;
    contadorValor4 = 0;
    alert("¡El pago ha sido exitoso!")
}

// Principal

// Precio de los artículos
const valor1 = 629.99;
const valor2 = 1339.99;
const valor3 = 460.00;
const valor4 = 1000.00;

// Contador de artículos en el carrito
let contadorValor1 = 0;
let contadorValor2 = 0;
let contadorValor3 = 0;
let contadorValor4 = 0;

let total = 0;
let opcion = menuPrincipal();

while (opcion != 4) {
    let articulo;
    switch (opcion) {
        case 1:
            articulo = seleccionarArticulo();
            switch (articulo) {
                case 1:
                    total += valor1;
                    contadorValor1++;
                    break;
                case 2:
                    total += valor2;
                    contadorValor2++;
                    break;
                case 3:
                    total += valor3;
                    contadorValor3++;
                    break;
                case 4:
                    total += valor4;
                    contadorValor4++;
                    break;
            }
            if (articulo != 5) {
                alert("¡Artículo agregado con éxito!")
                mostrarTotal();
            }
            break;
        case 2:
            articulo = seleccionarArticulo();
            switch (articulo) {
                case 1:
                    if (contadorValor1 > 0) {
                        total -= valor1;
                        contadorValor1--;
                    }
                    else (
                        alert("El articulo seleccionado no se encuentra en el carrito.")
                    )
                    break;
                case 2:
                    if (contadorValor2 > 0) {
                        total -= valor2;
                        contadorValor2--;
                    }
                    else (
                        alert("El articulo seleccionado no se encuentra en el carrito.")
                    )
                    break;
                case 3:
                    if (contadorValor3 > 0) {
                        total -= valor3;
                        contadorValor3--;
                    }
                    else (
                        alert("El articulo seleccionado no se encuentra en el carrito.")
                    )
                    break;
                case 4:
                    if (contadorValor4 > 0) {
                        total -= valor4;
                        contadorValor4--;
                    }
                    else (
                        alert("El articulo seleccionado no se encuentra en el carrito.")
                    )
                    break;
            }
            if (articulo != 5) {
                alert("¡Artículo quitado con éxito!")
                mostrarTotal();
            }
            break;
        case 3:
            if (total > 0) {
                mostrarTotal();
                if (opcionPagar() == 1) {
                    pagoExitoso();
                }
            }
            else {
                alert("¡Aún no hay articulos en el carrito!")
            }
            break;
        default:
            alert("Opción inválida, intente nuevamente.")
            break;
    }
    opcion = menuPrincipal();
}