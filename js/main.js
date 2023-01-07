//Api para Newsletter
(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('w_mHVS6aJz-q1XKPo');
})();
let a
if (a = document.getElementById('contact') != null) {
    window.onload = function () {
        document.getElementById('contact').addEventListener('submit', function (event) {
            event.preventDefault();
            // these IDs from the previous steps
            emailjs.sendForm('service_ozhg8t9', 'template_m1pclqw', this)
                .then(function () {
                    swal("¡Te has registrado!");;
                }, function (error) {
                    swal("Ocurrió un error... intente de nuevo");;
                });
        });
    }
}

//Array del carrito:
//De existir un carrito, recuperarlo:
let carrito = JSON.parse(localStorage.getItem("carrito"));
if (carrito == undefined) {
    carrito = [];
}

//Array del stock:
//El stock se simula y guarda en el local storage:
let stock = JSON.parse(localStorage.getItem("stock"));
if (stock == undefined || stock.length == 0) {
    stock = [];
    stock.push(new Producto("Peines Keller", 629.99, 15));
    stock.push(new Producto("Perfume Snirf", 1339.99, 20));
    stock.push(new Producto("Kit higiene bucal", 460.00, 5));
    stock.push(new Producto("Kit maquillaje Renkor", 4489.99, 30));
    stock.push(new Producto("Cremas L'Oréal", 459.50, 10));
    stock.push(new Producto("Labial Maybelline", 1000.00, 12));
    stock.push(new Producto("Juego de brochas", 449.99, 4));
}

//Obtencion de los botones para añadir articulos al carrito
let boton0 = document.getElementsByClassName('0');
let boton1 = document.getElementsByClassName('1');
let boton2 = document.getElementsByClassName('2');
let boton3 = document.getElementsByClassName('3');
let boton4 = document.getElementsByClassName('4');
let boton5 = document.getElementsByClassName('5');
let boton6 = document.getElementsByClassName('6');

//Funcion agregar producto al carrito
function agregarAlCarrito(id) {
    //Comprobacion de que haya stock del producto
    if (stock[id].cantidad > 0) {
        //Comprobacion de que el articulo ya se encuentre en el carrito:
        let encontrado;
        let ubicacion;
        if (!carrito.length == 0) {
            carrito.forEach((e, indice) => {
                if (e.nombre == stock[id].nombre) encontrado = true, ubicacion = indice;
            });
        }
        //En caso de no ser encontrado:
        if (!encontrado) {
            carrito.push(new Producto(stock[id].nombre, stock[id].precio, 1));
            stock[id].cantidad--;
        }
        //En caso de que el producto se encuentre ya en el carrito:
        else {
            carrito[ubicacion].cantidad++;
            stock[id].cantidad--;
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("stock", JSON.stringify(stock));
        swal("¡Agregado al carrito con éxito!");
    }
    else {
        swal("Ya no nos quedan más unidades! :c");
    }
}

//icono carrito
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



//Agregar producto al carrito
/* Como solo existe un boton de añadir al carrito por producto en cada página,
se puede acceder a cualquier boton utilizando botonX[0] */
//Antes de definir las funciones se verifica que el boton exista en la página
if (boton0.length != 0) {
    boton0[0].onclick = () => {
        agregarAlCarrito(0);
        isIcono();
    }
}
if (boton1.length != 0) {
    boton1[0].onclick = () => {
        agregarAlCarrito(1);
        isIcono();
    }
}
if (boton2.length != 0) {
    boton2[0].onclick = () => {
        agregarAlCarrito(2);
        isIcono();
    }
}
if (boton3.length != 0) {
    boton3[0].onclick = () => {
        agregarAlCarrito(3);
        isIcono();
    }
}
if (boton4.length != 0) {
    boton4[0].onclick = () => {
        agregarAlCarrito(4);
        isIcono();
    }
}
if (boton5.length != 0) {
    boton5[0].onclick = () => {
        agregarAlCarrito(5);
        isIcono();
    }
}
if (boton6.length != 0) {
    boton6[0].onclick = () => {
        agregarAlCarrito(6);
        isIcono();
    }
}



