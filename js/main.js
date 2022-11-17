/* Arrays */
//Array con los items
const items = [];
items.push(new Item("Peines Keller", 629.99));
items.push(new Item("Perfume Snirf", 1339.99));
items.push(new Item("Kit higiene bucal", 460.00));
items.push(new Item("Labial Maybelline", 1000.00));

//Array con los productos en stock
const stock = [];
stock.push(new Producto(items[0], 20))
stock.push(new Producto(items[1], 30))
stock.push(new Producto(items[2], 50))
stock.push(new Producto(items[3], 10))

//Array del carrito de compras
const carrito = [];

/* Funciones */

//Comprobación de que la opcion del menú principal sea válida
function opcionMenu(mensaje) {
    let opcion;
    do {
        opcion = parseInt(prompt(mensaje));
        if (isNaN(opcion) || opcion < 1 || opcion > 6) {
            alert("La opción ingresada no existe, intente de nuevo.");
        }
    } while (isNaN(opcion) || opcion < 1 || opcion > 6);
    return opcion;
}

//Comprobación de que el producto seleccionado sea válido
function opcionProducto(mensaje) {
    let opcion;
    do {
        opcion = parseInt(prompt(mensaje));
        if (isNaN(opcion) || opcion < 1 || opcion > 5) {
            alert("Opción inválida, intente de nuevo.");
        }
    } while (isNaN(opcion) || opcion < 1 || opcion > 5);
    return opcion;
}

//Comprobación de que la cantidad de productos a comprar sea válida
function ingresarCantidad(producto) {
    let cantidad;
    do {
        cantidad = parseInt(prompt(`Ingrese cuantos ${producto.item.nombre} desea comprar:`));
        if (isNaN(cantidad) || cantidad < 1) {
            alert("Opción inválida, intente de nuevo.");
        }
        else if (cantidad > producto.stock) {
            alert("La cantidad ingresada excede al stock disponible, intente de nuevo.");
        }
    } while (isNaN(cantidad) || cantidad < 1 || cantidad > producto.stock);
    return cantidad;
}

//Función para desplegar el menú principal
function menuPrincipal() {
    let opcion = opcionMenu("Ingrese la opción deseada:\n\n 1- Ver artículos a la venta\n 2- Agregar artículos al carrito\n 3- Quitar artículos del carrito\n 4- Ver articulos en el carrito\n 5- Ir a pagar\n 6- Salir");
    return opcion;
}

//Función para mostrar el catálogo
function mostrarCatalogo() {
    alert(`Presione Enter para volver al menú principal\n\n${items[0].nombre} - $${items[0].precio} - Disponibles: ${stock[0].stock}\n${items[1].nombre} - $${items[1].precio} - Disponibles: ${stock[1].stock}\n${items[2].nombre} - $${items[2].precio} - Disponibles: ${stock[2].stock}\n${items[3].nombre} - $${items[3].precio} - Disponibles: ${stock[3].stock}`);
}

//Función para seleccionar un producto del catálogo
function seleccionarProducto() {
    let opcion = opcionProducto("Ingrese la opción deseada:\n\n 1- Peines Keller\n 2- Perfume Snirf\n 3- Kit higiene bucal\n 4- Labial Maybelline\n 5- Cancelar");
    return opcion;
}

//Función para agregar artículos al carrito
function agregarAlCarrito() {
    //Solicita el producto y cuánta cantidad del mismo se desea comprar
    let opcion = seleccionarProducto();
    let productoSeleccionado = stock[opcion - 1];
    if (productoSeleccionado.stock > 0) {
        if (opcion != 5) {
            let cantidad = ingresarCantidad(productoSeleccionado);
            //Se comprueba si el producto ya está en el carrito
            let repite;
            let producto;
            for (let i in carrito) {
                if (carrito[i].item.nombre == productoSeleccionado.item.nombre) {
                    producto = carrito[i];
                    repite = true;
                }
            }
            //Si el objeto ya se encuentra creado en el carrito, se le agregará la cantidad ingresada
            if (repite == true) {
                producto.agregar(cantidad)
            }
            //Si el objeto no esta en el carrito, se crea el objeto y se agrega al carrito de compras
            else {
                carrito.push(new ProductoEnCarrito(items[opcion - 1], cantidad));
            }
            productoSeleccionado.quitar(cantidad);
        }
    }
    else {
        alert("¡No hay más stock!")
    }
}

//Función para quitar articulos del carrito
function quitarDelCarrito() {
    if (carrito[0] == null) {
        alert("¡Aún no hay artículos en el carrito!");
    }
    else {
        let numero = 1;
        let mensaje = "";
        for (let i in carrito) {
            mensaje += `${numero}- ${carrito[i].item.nombre} - x${carrito[i].cantidad}\n`;
            numero++;
        }
        let opcion = parseInt(prompt(`Seleccione el producto que desea quitar:\n\n${mensaje}`));
        if (carrito[opcion - 1] == null) {
            alert("Opción inválida, presione Enter para volver al menú principal");
        }
        else {
            if (carrito[opcion - 1].cantidad > 1) {
                quitarCantidad = parseInt(prompt("Ingrese cuántos desea eliminar del carrito:"))
                if (carrito[opcion - 1].cantidad >= quitarCantidad) {
                    for (let i in stock) {
                        if (stock[i].item.nombre == carrito[opcion - 1].item.nombre) {
                            stock[i].agregar(quitarCantidad);
                        }
                    }
                    carrito[opcion - 1].quitar(quitarCantidad);
                    if (carrito[opcion - 1].cantidad == 0) {
                        carrito.splice(opcion - 1, 1);
                    }
                    alert("Eliminado con éxito del carrito");
                }
                else {
                    alert("No pueden eliminarse más productos de los que se encuentran en el carrito.")
                }
            }
            else {
                for (let i in stock) {
                    if (stock[i].item.nombre == carrito[opcion - 1].item.nombre) {
                        stock[i].agregar(1);
                    }
                }
                carrito.splice(opcion - 1, 1);
            }
        }
    }
}

//Función para visualizar el carrito de compras
function verCarrito() {
    let mensaje = "";
    for (let i in carrito) {
        mensaje += `- ${carrito[i].item.nombre} - x${carrito[i].cantidad} - $${carrito[i].monto()}\n`;
    }
    alert(`Presione Enter para volver al menú principal\n\n${mensaje}`);
}

//Función para finalizar la compra abonando el total
function pagarTotal() {
    let mensaje = "";
    let total = 0;
    for (let i in carrito) {
        mensaje += `- ${carrito[i].item.nombre} - x${carrito[i].cantidad} - $${carrito[i].monto()}\n`;
        total += carrito[i].monto();
    }
    let comprar = parseInt(prompt(`Finalizar compra:\n\n${mensaje}\n\nTotal a pagar: $${total}\n1- Pagar\n2- Cancelar`));
    switch(comprar) {
        case 1:
            carrito.splice(0, carrito.length);
            if(total > 0) {
                alert("¡Pago exitoso!")
            }
            else {
                alert("El total es $0, no hay productos en el carrito")
            }
            break;
        case 2:
            alert("Operación cancelada")
            break;
        default:
            alert("Opción inválida")
            break;
    }
}



/* Programa principal */

let opcionElegida = menuPrincipal();

while (opcionElegida != 6) {
    switch (opcionElegida) {
        case 1:
            mostrarCatalogo();
            break;
        case 2:
            agregarAlCarrito();
            break;
        case 3:
            quitarDelCarrito();
            break;
        case 4:
            verCarrito();
            break;
        case 5:
            pagarTotal();
            break;
        default:
            alert("Opción inválida, intente de nuevo")
            break;
    }
    opcionElegida = menuPrincipal();
}

