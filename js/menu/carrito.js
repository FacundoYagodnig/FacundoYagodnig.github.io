let mostrarCarrito = false;

async function renderCarrito(carrito) {
  let sectionCarrito = document.querySelector(".carrito-body");

  let plantillaHbs = await fetch("plantillas/carrito.hbs").then((r) =>
    r.text()
  );

  Handlebars.registerHelper("toLocaleString", function (number) {
    return number.toLocaleString("es-AR");
  });
  var template = Handlebars.compile(plantillaHbs);

  let html = template({ carrito });
  sectionCarrito.innerHTML = html;
  console.log("renderizo el carrito entero");
}

function addProduct(e, id) {
  e.preventDefault();
  let producto = productoController.productsList.find(
    (producto) => producto.id == id
  );
  carritoController.addToCart(producto);
}

function removeProduct(e, id) {
  e.preventDefault();
  let producto = productoController.productsList.find(
    (producto) => producto.id == id
  );
  carritoController.removeToCart(producto, id);
}

function initCarrito() {
  console.warn("iniCarrito()");
  let sectionCarrito = document.querySelector(".section-carrito");
  let btnCarrito = document.querySelector(".search-bar__carrito-container");

  //actualiza la cantidad que se muestra en el badge del carrito
  carritoController.updateCartNumber();
  carritoController.updateCartTotal();

  btnCarrito.addEventListener("click", async function () {
    sectionCarrito = document.querySelector(".section-carrito");

    mostrarCarrito = !mostrarCarrito;
    if (mostrarCarrito) {
      sectionCarrito.classList.add("section-carrito--visible");
      renderCarrito(carritoController.carrito);
    } else {
      sectionCarrito.classList.remove("section-carrito--visible");
    }

    if (carritoController.carrito.length === 0) {
      sectionCarrito.classList.remove("section-carrito--visible");
      carritoController.vaciarCarrito();
    }
  });

  const menuToggle = document.querySelector('.menu-toggle')
  const navbar = document.querySelector('.nav-bar')
  const header = document.querySelector('.main-header')
  let navbarNoEsta = false

  menuToggle.addEventListener('click', (e) => {
    

    console.log(e.target)
      if(e.target.classList == 'fa-solid fa-bars'  ){

        if(!navbarNoEsta) {
          console.log(navbarNoEsta)
          header.style.display = 'block'
          navbarNoEsta = true
          console.log('navbar no esta, te lo omuestro', navbarNoEsta)
        } else {
          console.log(navbarNoEsta)
          header.style.display = 'none'
          navbarNoEsta = false
          console.log('navbar  esta, te lo oculto', navbarNoEsta)
        }
       
      } 

  })
}

initCarrito();
