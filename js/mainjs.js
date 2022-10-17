///////////////////////////
/// VARIABLES INICIALES ///
///////////////////////////

let usuario = "CoderUser";
let password = "helloworld";
let filtro = ["no", "no", "no"];
let carrito_inicial;
let monto_inicial;

///////////
/// API ///
///////////

let myHeaders = new Headers();
    myHeaders.append("apikey", "APlPfUQSPtUJwfxrmODu7A7FT8Jw6p5z");
    
let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

fetch("https://api.apilayer.com/currency_data/live?source=USD&currencies=UYU", requestOptions)
    .then(response => response.json())
    .then(result => {
        let precio = result.quotes.USDUYU;
        precio = parseFloat(precio.toFixed(2));
        valor_dolar.innerText = `${precio}`;
    })

/////////////////
/// PRODUCTOS ///
/////////////////

let mates = [{imagen: "img/productos/mate1.webp", nombre: "Mate de vidrio con diseño", precio: 150}, {imagen: "img/productos/mate2.webp", nombre: "Mate de vidrio con cuero", precio: 200}, {imagen: "img/productos/mate3.webp", nombre: "Mate de cerámica con diseño", precio: 250}, {imagen: "img/productos/mate4.webp", nombre: "Mate de cerámica con cuero", precio: 450}, {imagen: "img/productos/mate5.webp", nombre: "Mate de calabaza con cuero", precio: 600}, {imagen: "img/productos/mate6.webp", nombre: "Mate imperial de cerámica con alpaca", precio: 1000}];
let bombillas = [{imagen: "img/productos/bombi1.webp", nombre: "Bombillas de aluminio en color", precio: 80}, {imagen: "img/productos/bombi2.webp", nombre: "Bombilla de bronce con anillo", precio: 220}, {imagen: "img/productos/bombi3.webp", nombre: "Bombilla de bronce con alpaca", precio: 300}, {imagen: "img/productos/bombi4.webp", nombre: "Bombilla labrada de alpaca", precio: 600}, {imagen: "img/productos/bombi5.webp", nombre: "Bombillón de alpaca rosada", precio: 800}, {imagen: "img/productos/bombi6.webp", nombre: "Bombillón de acero quirúrgico", precio: 1000}];
let termos = [{imagen: "img/productos/termo1.webp", nombre: "Termo 1 Lt de vidrio Arriero", precio: 300}, {imagen: "img/productos/termo2.webp", nombre: "Termo 1 Lt de vidrio Invicta", precio: 400}, {imagen: "img/productos/termo3.webp", nombre: "Termo 500 ml de acero Comet", precio: 450}, {imagen: "img/productos/termo4.webp", nombre: "Termo 750 ml de acero Eternal", precio: 650}, {imagen: "img/productos/termo5.webp", nombre: "Termo Termo 1,25 Lt de acero Comet", precio: 1500}, {imagen: "img/productos/termo6.webp", nombre: "Termo 1 Lt Termolar R-Evolution", precio: 2500}];
let productos_completos = [...mates, ...bombillas, ...termos];

/////////////
/// NODOS ///
/////////////

let login = document.getElementsByClassName("cajaLogin")[0];
let login_form = login.getElementsByTagName("form")[0]
let boton_login = document.getElementsByClassName("cajaLogin")[0].getElementsByTagName("form")[0].getElementsByTagName("button")[0];
let boton_filtrar = document.getElementsByClassName("botonFiltro")[0];
let boton_agregar = document.getElementsByClassName("botonAgregar");
let boton_limpiar = document.getElementsByClassName("botonLimpiar")[0];
let boton_ocultar = document.getElementsByClassName("botonOcultar")[0];
let boton_compra = document.getElementsByClassName("botonComprar")[0];
let boton_atras = document.getElementsByClassName("botonAtras");
let boton_adelante = document.getElementsByClassName("botonAdelante");
let seccion_catalogo = document.getElementById("comprar");
let seccion_pago = document.getElementById("pagar");
let autorizacion = document.getElementById("autorizacion");
let mostrar_carrito = document.getElementsByClassName("botonCarrito")[0];
let catalogo = document.getElementById("catalogo").getElementsByTagName("section")[1];
let checkbox_bombillas = document.getElementsByClassName("form-check-input")[0];
let checkbox_mates = document.getElementsByClassName("form-check-input")[1];
let checkbox_termos = document.getElementsByClassName("form-check-input")[2];
let checkboxes = [checkbox_bombillas, checkbox_mates, checkbox_termos];
let preview_carrito = document.getElementsByClassName("prevCarrito")[0].getElementsByTagName("span")[0];
let total_carrito = document.getElementsByClassName("total")[0];
let tabla_carrito = document.getElementById("carrito").getElementsByTagName("tbody")[0];
let carrito = document.getElementById("carrito");
let menu_pago_uno = document.getElementsByClassName("menuPago")[0];
let menu_pago_dos = document.getElementsByClassName("menuPago")[1];
let menu_pago_tres = document.getElementsByClassName("menuPago")[2];
let menu_pago_cuatro = document.getElementsByClassName("menuPago")[3];
let valor_dolar = document.getElementById("dolar").getElementsByTagName("span")[0];
let nombre_usuario = document.getElementById("usuario");

////////////////////////////
/// SWEETALERT & TOASTFY ///
////////////////////////////

function compra_inhabilitada(){
    Swal.fire({
        icon: `error`,
        title: `Mantenimiento`,
        text: `Disculpe los inconvenientes. Por mantenimiento las compras están inhabilitadas.`,
        color:`rgb(242, 242, 242)`,
        background:`rgb(102, 102, 102)`,
        iconColor:`rgb(204, 0, 0)`,
        confirmButtonText:`Atrás`,
        confirmButtonColor:`rgb(77, 0, 0)`
    })
}

function toast_compra(articulo){
    Toastify({
        text: `Usted agregó un/a ${articulo}`,
        duration: 1500,
        className: "btnComprar",
        style: {
            background: "rgb(0, 51, 0)",
            color: "rgb(242, 242, 242)",
        }
    }).showToast();
}

function toast_borrar(articulo){
    Toastify({
        text: `Usted borró un/a ${articulo}`,
        duration: 1500,
        className: "btnVaciar",
        style: {
            background: "rgb(77, 0, 0)",
            color: "rgb(242, 242, 242)",
        }
    }).showToast();
}

function toast_vaciar(){
    Toastify({
        text: "Usted vació el carrito.",
        duration: 1500,
        className: "btnVaciar",
        style: {
            background: "rgb(77, 0, 0)",
            color: "rgb(242, 242, 242)",
        }
    }).showToast();
}

/////////////////
/// FUNCIONES ///
/////////////////

function guardar_sesion(){
    let sesion_abierta = "abierta";
    let sesion_abierta_JSON = JSON.stringify(sesion_abierta);
    localStorage.setItem("recordar sesion", sesion_abierta_JSON);
}

function recordar_sesion(){
    let sesion_abierta = localStorage.getItem("recordar sesion");
    sesion_abierta = JSON.parse(sesion_abierta);
    if(sesion_abierta == "abierta"){
        autorizacion.classList.remove("ocultar");
        login.classList.add("ocultar");
    }
}

function organizador (a, b){
    if(a.nombre < b.nombre){
        return -1
    }
    else if(a.nombre > b.nombre){
        return 1
    }
    else{
        return 0
    }
}

function sumar_carrito (total, monto){
    total = total + monto;
    return total
};

function cargar_catalogo(){
    for (articulo of productos_completos){
        let {imagen, nombre, precio} = articulo;
        let nueva_tarjeta = document.createElement("div");
        nueva_tarjeta.className = "tarjeta";
        nueva_tarjeta.innerHTML = ` <img src="${imagen}" alt="">
                                    <h4>${nombre}</h4>
                                    <p class="costo">$ <span>${precio}</span></p>
                                    <button class="botonAgregar">Agregar al carrito</button>`
        catalogo.append(nueva_tarjeta);
    }
    for (let boton of boton_agregar){
        boton.addEventListener("click", actualizar_cantidad);
        boton.addEventListener("click", comprar_articulo);
        boton.addEventListener("click", actualizar_monto);
    };
}

function filtrar_bombillas(){
    if(filtro[0] != "no"){
        for(articulo of bombillas){
            let {imagen, nombre, precio} = articulo;
            let nueva_tarjeta = document.createElement("div");
            nueva_tarjeta.className = "tarjeta";
            nueva_tarjeta.innerHTML = ` <img src="${imagen}" alt="">
                                        <h4>${nombre}</h4>
                                        <p class="costo">$ <span>${precio}</span></p>
                                        <button class="botonAgregar">Agregar al carrito</button>`
            catalogo.append(nueva_tarjeta);
        }
        for (let boton of boton_agregar){
            boton.addEventListener("click", actualizar_cantidad);
            boton.addEventListener("click", comprar_articulo);
            boton.addEventListener("click", actualizar_monto);
        };
    }
}

function filtrar_mates(){
    if(filtro[1] != "no"){
        for(articulo of mates){
            let {imagen, nombre, precio} = articulo;
            let nueva_tarjeta = document.createElement("div");
            nueva_tarjeta.className = "tarjeta";
            nueva_tarjeta.innerHTML = ` <img src="${imagen}" alt="">
                                        <h4>${nombre}</h4>
                                        <p class="costo">$ <span>${precio}</span></p>
                                        <button class="botonAgregar">Agregar al carrito</button>`
            catalogo.append(nueva_tarjeta);
        }
        for (let boton of boton_agregar){
            boton.addEventListener("click", actualizar_cantidad);
            boton.addEventListener("click", comprar_articulo);
            boton.addEventListener("click", actualizar_monto);
        };
    }
}

function filtrar_termos(){
    if(filtro[2] != "no"){
        for(articulo of termos){
            let {imagen, nombre, precio} = articulo;
            let nueva_tarjeta = document.createElement("div");
            nueva_tarjeta.className = "tarjeta";
            nueva_tarjeta.innerHTML = ` <img src="${imagen}" alt="">
                                        <h4>${nombre}</h4>
                                        <p class="costo">$ <span>${precio}</span></p>
                                        <button class="botonAgregar">Agregar al carrito</button>`
            catalogo.append(nueva_tarjeta);
        }
        for (let boton of boton_agregar){
            boton.addEventListener("click", actualizar_cantidad);
            boton.addEventListener("click", comprar_articulo);
            boton.addEventListener("click", actualizar_monto);
        };
    }
}

function actualizar_cantidad(e){
    let articulos_carrito = localStorage.getItem("carrito");
    articulos_carrito = JSON.parse(articulos_carrito);
    let tarjeta = e.target.parentNode;
    let imagen = tarjeta.getElementsByTagName("img")[0].src;
    let nombre = tarjeta.getElementsByTagName("h4")[0].innerText;
    let costo = tarjeta.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerText;
    if (articulos_carrito == null){
        let nuevo_producto = {
            imagen:imagen,
            nombre:nombre,
            costo:costo,
            cantidad:1,
            subtotal:costo
        }
        articulos_carrito = [nuevo_producto];
        let articulos_carrito_JSON = JSON.stringify(articulos_carrito);
        localStorage.setItem("carrito", articulos_carrito_JSON);
    }
    else{
        let articulo_comprado = articulos_carrito.find((articulo) => articulo.nombre == nombre);
        if (articulo_comprado == undefined){
            let nuevo_producto = {
                imagen:imagen,
                nombre:nombre,
                costo:costo,
                cantidad:1,
                subtotal:costo
            }
            articulos_carrito.push(nuevo_producto);
            articulos_carrito.sort(organizador);
            let articulos_carrito_JSON = JSON.stringify(articulos_carrito);
            localStorage.setItem("carrito", articulos_carrito_JSON);
        }
        else{
            articulo_comprado.cantidad = articulo_comprado.cantidad + 1;
            articulo_comprado.subtotal = parseInt(articulo_comprado.cantidad * articulo_comprado.costo);
            articulos_carrito.sort(organizador);
            let articulos_carrito_JSON = JSON.stringify(articulos_carrito);
            localStorage.setItem("carrito", articulos_carrito_JSON);
        }
    }
    nombre = nombre.toLowerCase();
    toast_compra(nombre);
}

function actualizar_monto(){
    let monto_carrito = 0;
    let precios_carrito = [];
    let articulos_carrito = localStorage.getItem("carrito");
    articulos_carrito = JSON.parse(articulos_carrito);
    if (articulos_carrito == null){
        window.localStorage.removeItem("monto_carrito");
        total_carrito.innerHTML = "$ 0";
        preview_carrito.innerText = "$ 0";
    }
    else{
        for (producto of articulos_carrito){
            precios_carrito.push(parseInt(producto.subtotal));
        }
        monto_carrito = precios_carrito.reduce(sumar_carrito);
        monto_carrito_JSON = JSON.stringify(monto_carrito);
        localStorage.setItem("monto_carrito", monto_carrito_JSON);
        total_carrito.innerHTML = `$ ${monto_carrito}`;
        preview_carrito.innerText = `$ ${monto_carrito}`;
    }
}                           

function comprar_articulo(){
    let articulos_carrito = localStorage.getItem("carrito");
    articulos_carrito = JSON.parse(articulos_carrito);
    tabla_carrito.innerHTML = "";
for(articulo of articulos_carrito){
        let nuevo_tr = document.createElement("tr");
        nuevo_tr.innerHTML =   `<td><img src="${articulo.imagen}" alt=""></td>
                                <td>${articulo.nombre}</td>
                                <td>${articulo.costo}</td>
                                <td>${articulo.cantidad}</td>
                                <td>$${articulo.subtotal}</td>
                                <td><button class="botonBorrar">Borrar</button></td>`;
        tabla_carrito.append(nuevo_tr);
    }
    let boton_borrar = document.getElementsByClassName("botonBorrar")
    for(borrador of boton_borrar){
        borrador.addEventListener("click", borrar_articulo);
        borrador.addEventListener("click", actualizar_monto);
    }
}

function borrar_articulo(e){
    let articulos_carrito = localStorage.getItem("carrito");
    articulos_carrito = JSON.parse(articulos_carrito);
    let tr_objetivo = e.target.parentNode.parentNode;
    let articulo_objetivo = tr_objetivo.getElementsByTagName("td")[1].innerText;
    let articulo_borrado = articulos_carrito.find((articulo) => articulo.nombre == articulo_objetivo);
    if (articulo_borrado.cantidad > 1){
        articulo_borrado.cantidad = articulo_borrado.cantidad - 1;
        articulo_borrado.subtotal = articulo_borrado.cantidad * articulo_borrado.costo;
        let articulos_carrito_JSON = JSON.stringify(articulos_carrito);
        localStorage.setItem("carrito", articulos_carrito_JSON);
        tr_objetivo.getElementsByTagName("td")[3].innerText = `${articulo_borrado.cantidad}`
        tr_objetivo.getElementsByTagName("td")[4].innerText = `$${articulo_borrado.subtotal}`
    }
    else{
        let indice_articulo_borrado = articulos_carrito.indexOf(articulo_borrado);
        articulos_carrito.splice(indice_articulo_borrado, 1);
        let articulos_carrito_JSON = JSON.stringify(articulos_carrito);
        localStorage.setItem("carrito", articulos_carrito_JSON);
        tr_objetivo.remove();
    }
    if(articulos_carrito.length == 0){
        localStorage.removeItem("carrito");
    }
    articulo_objetivo = articulo_objetivo.toLowerCase();
    toast_borrar(articulo_objetivo);
}

function vaciar_carrito(){
    Swal.fire({
        icon: `warning`,
        title: `¡Cuidado!`,
        text: `Está por vaciar su carrito. Esta acción no se podrá revertir. ¿Desea continuar?`,
        color:`rgb(242, 242, 242)`,
        background:`rgb(102, 102, 102)`,
        iconColor:`rgb(255, 191, 0)`,
        confirmButtonText:`Vaciar`,
        confirmButtonColor:`rgb(77, 0, 0)`,
        showDenyButton:true,
        denyButtonText:`No vaciar`,
        denyButtonColor:`rgb(77, 0, 0)`
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.clear();
            tabla_carrito.innerHTML = "";
            total_carrito.innerHTML = "$ 0";
            preview_carrito.innerText = "$ 0";
            toast_vaciar()
        }
    })
}

function monto_pendiente(){
    total_carrito.innerHTML = `$ ${monto_inicial}`;
    preview_carrito.innerHTML = `$ ${monto_inicial}`;
};

function monto_vacio(){
    total_carrito.innerHTML = `$ 0`;
    preview_carrito.innerHTML = `$ 0`;
};

function adelante_uno(){
    seccion_catalogo.classList.add("ocultar")
    seccion_pago.classList.remove("ocultar")
    let nuevo_texto = document.createElement("div");
    nuevo_texto.innerHTML = `   <p>El monto total de su compra es de <span>$${preview_carrito.innerText}</span>.</p>
                                    <p>¿Desea que la compra le sea enviada a su domicilio? Tenga presente que dicho envío tendrá un costo adicional de <span> $250</span>.</p>`
    menu_pago_uno.append(nuevo_texto);
    let nuevos_botones = document.createElement("div");
    nuevos_botones.classList.add("d-flex", "flex-column", "w-100");
    nuevos_botones.innerHTML = `<button class="botonAdelante my-2">Con envío</button>
                                <button class="botonAdelante my-2">Sin envío</button>
                                <button class="botonAtras mt-2">Atrás</button>`
    menu_pago_uno.append(nuevos_botones);
}

function adelante_dos(e){
    menu_pago_dos.innerHTML = ""
    menu_pago_dos.classList.remove("esconder");
    let monto_carrito = 0;
    let precios_carrito = [];
    let articulos_carrito = localStorage.getItem("carrito");
    articulos_carrito = JSON.parse(articulos_carrito);
    for (producto of articulos_carrito){
        precios_carrito.push(parseInt(producto.subtotal));
    }
    monto_carrito = precios_carrito.reduce(sumar_carrito);
    let envio = e.target.innerHTML.toLowerCase()
    if(envio == "con envío"){
        monto_carrito = parseInt(monto_carrito + 250);
    }
    let nuevo_texto = document.createElement("div");
    nuevo_texto.innerHTML = `   <p>Usted escogió <span>${envio}</span>. El monto total de su compra será de <span>$${monto_carrito}</span>.</p>
                                <p>¿Desea realizar el pago en contado o con tarjeta de crédito?</p>`
    menu_pago_dos.append(nuevo_texto);
    let nuevos_botones = document.createElement("div");
    nuevos_botones.classList.add("d-flex", "flex-column", "w-100");
    nuevos_botones.innerHTML = `    <button class="botonAdelante my-2">Contado</button>
                                    <button class="botonAdelante my-2">Tarjeta de crédito</button>
                                    <button class="botonAtras mt-2">Atrás</button>`
    menu_pago_dos.append(nuevos_botones);
    boton_adelante[2].addEventListener("click", adelante_tres);
    boton_adelante[3].addEventListener("click", adelante_tres);
    boton_atras[1].addEventListener("click", atras_dos);
}

function adelante_tres(e){
    menu_pago_tres.innerHTML = ""
    menu_pago_tres.classList.remove("esconder")
    let precios_carrito = [];
    let articulos_carrito = localStorage.getItem("carrito");
    articulos_carrito = JSON.parse(articulos_carrito);
    for (producto of articulos_carrito){
        precios_carrito.push(parseInt(producto.subtotal));
    }
    monto_carrito = precios_carrito.reduce(sumar_carrito);
    let dolar = parseFloat(valor_dolar.innerText);
    let monto_carrito_dolares = parseInt(monto_carrito / dolar);
    let pago = e.target.innerText.toLowerCase()
    let nuevo_texto = document.createElement("div")
    nuevo_texto.innerHTML = `   <p>Usted escogió pagar <span>con ${pago}</span>.</p>
                                <p>Si desea optar por realizar el pago en dólares, el monto será de <span>$ ${monto_carrito_dolares}</span>.</p>
                                <p>Por favor indique con qué moneda desea pagar.</p>`
    menu_pago_tres.append(nuevo_texto)
    let nuevos_botones = document.createElement("div");
    nuevos_botones.classList.add("d-flex", "flex-column", "w-100");
    nuevos_botones.innerHTML = `    <button class="botonAdelante my-2">Pesos</button>
                                    <button class="botonAdelante my-2">Dólares</button>
                                    <button class="botonAtras mt-2">Atrás</button>`
    menu_pago_tres.append(nuevos_botones);
    boton_adelante[4].addEventListener("click", adelante_cuatro);
    boton_adelante[5].addEventListener("click", adelante_cuatro);
    boton_atras[2].addEventListener("click", atras_tres);
}

function adelante_cuatro(e){
    menu_pago_cuatro.innerHTML = ""
    menu_pago_cuatro.classList.remove("esconder")
    let tipo_de_divisa = e.target.innerText.toLowerCase();
    let nuevo_texto = document.createElement("div")
    nuevo_texto.innerHTML = `   <p>Usted escogió pagar <span>con ${tipo_de_divisa}</span>.</p>
                                <p>Por favor, permanezca atento a su correo electrónico o Whatsapp para terminar de coordinar la compra.</p>
                                <p class="compraFinalizada">No olvide que calificando este proyecto final con un 10 obtendrá un 50% de descuento en su siguiente compra. ;)</p>`
    menu_pago_cuatro.append(nuevo_texto)
    let nuevo_boton = document.createElement("div");
    nuevo_boton.classList.add("d-flex", "flex-column", "w-100");
    nuevo_boton.innerHTML = `    <button class="botonAdelante my-2">Finalizar</button>`
    menu_pago_cuatro.append(nuevo_boton);
    boton_adelante[6].addEventListener("click", compra_finalizada)
}

function compra_finalizada(){
    window.localStorage.removeItem("monto_carrito");
    window.localStorage.removeItem("carrito");
    tabla_carrito.innerHTML = "";
    menu_pago_uno.innerHTML = "";
    menu_pago_dos.innerHTML = "";
    menu_pago_dos.classList.add("esconder");
    menu_pago_tres.innerHTML = "";
    menu_pago_tres.classList.add("esconder");
    menu_pago_cuatro.innerHTML = "";
    menu_pago_cuatro.classList.add("esconder");         
    seccion_catalogo.classList.remove("ocultar");
    seccion_pago.classList.add("ocultar");
    carrito.classList.add("ocultar");
}

function atras_uno (){
    menu_pago_uno.innerHTML = ""
    seccion_catalogo.classList.remove("ocultar")
    seccion_pago.classList.add("ocultar")
}

function atras_dos(){
    menu_pago_dos.innerHTML = "";
    menu_pago_dos.classList.add("esconder");
}

function atras_tres(){
    menu_pago_tres.innerHTML = ""
    menu_pago_tres.classList.add("esconder");
}

function usuario_incorrecto(){
    Swal.fire({
        icon: `error`,
        title: `Usuario incorrecto`,
        text: `El usuario que usted ha ingresado no existe. Por favor intente de nuevo.`,
        color:`rgb(242, 242, 242)`,
        background:`rgb(102, 102, 102)`,
        iconColor:`rgb(204, 0, 0)`,
        confirmButtonText:`Atrás`,
        confirmButtonColor:`rgb(77, 0, 0)`
    })
}

///////////////
/// EVENTOS ///
///////////////

login_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let log_usuario = document.getElementsByClassName("cajaLogin")[0].getElementsByTagName("form")[0].getElementsByTagName("input")[0].value;
    let log_password = document.getElementsByClassName("cajaLogin")[0].getElementsByTagName("form")[0].getElementsByTagName("input")[1].value;
    if(log_usuario == usuario && log_password == password){
        autorizacion.classList.remove("ocultar");
        login.classList.add("ocultar");
        nombre_usuario.innerText = "Usuario: CoderUser"
    }
    else{
        usuario_incorrecto()
    }
})
/* login_form.addEventListener("submit", guardar_sesion) */

mostrar_carrito.addEventListener("click", () => {
    let estado_carrito = carrito.classList.contains("ocultar")
    if(estado_carrito == true){
        carrito.classList.remove("ocultar");
    }
    else{
        carrito.classList.add("ocultar");
    }
})

boton_ocultar.addEventListener("click", () => {
    let estado_carrito = carrito.classList.contains("ocultar")
    if(estado_carrito == true){
        carrito.classList.remove("ocultar");
    }
    else{
        carrito.classList.add("ocultar");
    }
})

boton_filtrar.addEventListener("click", () =>{
    if(filtro[0] == "no" && filtro[1] == "no" && filtro[2] == "no"){
        catalogo.innerHTML = "";
        for (articulo of productos_completos){
            let {imagen, nombre, precio} = articulo;
            let nueva_tarjeta = document.createElement("div");
            nueva_tarjeta.className = "tarjeta";
            nueva_tarjeta.innerHTML = ` <img src="${imagen}" alt="">
                                        <h4>${nombre}</h4>
                                        <p class="costo">$ <span>${precio}</span></p>
                                        <button class="botonAgregar">Agregar al carrito</button>`
            catalogo.append(nueva_tarjeta);
        }
        for (let boton of boton_agregar){
            boton.addEventListener("click", actualizar_cantidad);
            boton.addEventListener("click", comprar_articulo);
            boton.addEventListener("click", actualizar_monto);
        };
    }
    else{
        catalogo.innerHTML = "";
        filtrar_bombillas();
        filtrar_mates();
        filtrar_termos();
    }
})

for(opcion of checkboxes){
    opcion.addEventListener("change", (e) => {
        let padre = e.target.parentNode;
        let tipo_articulo = padre.getElementsByTagName("label")[0].innerText;
        if(e.target.checked == true){
            if(tipo_articulo == "Bombillas"){
                filtro[0] = "si";
            }
            else if(tipo_articulo == "Mates"){
                filtro[1] = "si";
            }
            else{
                filtro[2] = "si";
            }
        }
        else{
            if(tipo_articulo == "Bombillas"){
                filtro[0] = "no";
            }
            else if(tipo_articulo == "Mates"){
                filtro[1] = "no"
            }
            else{
                filtro[2] = "no"
            }
        }
    })
}

boton_limpiar.addEventListener("click", vaciar_carrito);
boton_limpiar.addEventListener("click", actualizar_monto);

boton_compra.addEventListener("click", adelante_uno)
boton_compra.addEventListener("click", () =>{
    boton_atras[0].addEventListener("click", atras_uno)
    boton_adelante[0].addEventListener("click", adelante_dos)
    boton_adelante[1].addEventListener("click", adelante_dos)
})


////////////////////////
/// INICIO DE PÁGINA ///
////////////////////////

recordar_sesion();
cargar_catalogo();
carrito_inicial = localStorage.getItem("carrito");
carrito_inicial = JSON.parse(carrito_inicial);
monto_inicial = localStorage.getItem("monto_carrito");
monto_inicial = JSON.parse(monto_inicial);

if (carrito_inicial != null){
    for (articulo of carrito_inicial){
        let {imagen, nombre, precio} = articulo;
        let nuevo_tr = document.createElement("tr");
        nuevo_tr.innerHTML =   `<td><img src="${articulo.imagen}" alt=""></td>
                                <td>${articulo.nombre}</td>
                                <td>${articulo.costo}</td>
                                <td>${articulo.cantidad}</td>
                                <td>$${articulo.subtotal}</td>
                                <td><button class="botonBorrar">Borrar</button></td>`;
        tabla_carrito.append(nuevo_tr);
        let boton_borrar = document.getElementsByClassName("botonBorrar")
        for(borrador of boton_borrar){
            borrador.addEventListener("click", borrar_articulo);
            borrador.addEventListener("click", actualizar_monto);
        }
    };
    monto_inicial != null ? monto_pendiente() : monto_vacio();
};