//Array con los productos en stock
const stock = [];
stock.push(new Producto("Peines Keller", 629.99, 60));
stock.push(new Producto("Perfume Snirf", 1339.99, 20));
stock.push(new Producto("Kit higiene bucal", 460.00, 50));
stock.push(new Producto("Kit maquillaje Renkor", 4489.99, 30));
stock.push(new Producto("Cremas L'Oréal", 459.50, 40));
stock.push(new Producto("Labial Maybelline", 1000.00, 45));
stock.push(new Producto("Juego de brochas", 449.99, 55));

//Array del carrito
const carrito = [];

//Obtencion de los botones para añadir articulos al carrito
let boton0 = document.getElementById('btn0');
let boton1 = document.getElementById('btn1');
let boton2 = document.getElementById('btn2');
let boton3 = document.getElementById('btn3');
let boton4 = document.getElementById('btn4');
let boton5 = document.getElementById('btn5');
let boton6 = document.getElementById('btn6');

//Agregar producto al carrito
boton0.addEventListener("click", () => {
    //Comprobacion de que el articulo ya se encuentre en el carrito:
    let encontrado;
    let ubicacion;
    if (!carrito.length == 0) {
        carrito.forEach((e, indice) => {
            if (e.nombre == stock[0].nombre) encontrado = true, ubicacion = indice;
        });
    }
    //En caso de no ser encontrado:
    if (!encontrado) {
        carrito.push(new Producto(stock[0].nombre, stock[0].precio, 1));
        stock[0].cantidad--;
    }
    //En caso de que el producto se encuentre ya en el carrito:
    else {
        carrito[ubicacion].cantidad++;
        stock[0].cantidad--;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("stock", JSON.stringify(stock));
});

boton1.addEventListener("click", () => {
    //Comprobacion de que el articulo ya se encuentre en el carrito:
    let encontrado;
    let ubicacion;
    if (!carrito.length == 0) {
        carrito.forEach((e, indice) => {
            if (e.nombre == stock[1].nombre) encontrado = true, ubicacion = indice;
        });
    }
    //En caso de no ser encontrado:
    if (!encontrado) {
        carrito.push(new Producto(stock[1].nombre, stock[1].precio, 1));
        stock[1].cantidad--;
    }
    //En caso de que el producto se encuentre ya en el carrito:
    else {
        carrito[ubicacion].cantidad++;
        stock[1].cantidad--;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("stock", JSON.stringify(stock));
});

/* localStorage.clear(); */