class CarritoController extends CarritoModel {

    constructor(){
        super()      
        this.sectionCarrito = document.querySelector('.section-carrito')
        this.sectionCarrito__body = document.querySelector('.carrito-body')
        try{
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [] //si existe en el localstorage hace el get y sino me devuelve un array vacio
        }
        catch{
            this.carrito = [] //si error, me devuelve vacio y lo setea
            localStorage.setItem('carrito', this.carrito)
        }
    }

    elProductoEstaEnElCarrito(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
        //si esta productos.id == prod.id me devuelve el ancho del carrito, si no me devuelve 0
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id) 
        //lo importante de esta funcion es que me busca el producto ya pusheado en el carrito y no de productList
        //me devuelve el objeto que prod.id == producto.id 
    }

    //agrega productos , suma cantidad y renderiza el carrito
    addToCart(producto) {
      
       if(!this.elProductoEstaEnElCarrito(producto)){ //si el producto no esta en el Carrito, 
           producto.cantidad =  1 //le agrego la prop cantidad = 1
           this.carrito.push(producto) // y lo pusheo AL CARRITO Y A PARTICAR DE ACA, EL PRODUCTO EXISTE EN EL CON LA PROPIEDAD CANTIDAD 
        } else{
    
            let productoCarrito = this.obtenerProductoDeCarrito(producto) //si el producto ya existe, lo busco y le sumo a la cantidad++
            productoCarrito.cantidad++ 
            console.log( this.carrito)
            console.log( productoCarrito)
            console.log('Cantidad: ' + productoCarrito.cantidad)
        }

        renderCarrito(this.carrito)
        this.updateCartNumber()
        this.updateCartTotal()
        console.log(this.carrito)
      
       localStorage.setItem('carrito', JSON.stringify(this.carrito))
    }


    updateCartTotal(){
        const nTotal =  this.carrito.reduce(                  
            (acc, { cantidad, price }) => acc + cantidad * price,
            0
        );

        if(this.carrito.length > 0) {
        let total = document.querySelector('.total')
        this.carrito.total = nTotal
        total.innerHTML = nTotal
        };

        this.carrito.map(producto => { 
            producto.total = nTotal
        });
    }

    //actualiza el numero de la cantidad que hay en el carrito en el badge
    updateCartNumber() { 
        let badgeCart = document.querySelector('#badge-cart')
       
        const nCantidad = this.carrito.reduce(        //reduce me sirve para cuando voy sumando , tener el valor acumulado y sumarselo a la cantidad
            (acc, { cantidad }) => acc + cantidad,
            0
          );

        if (this.carrito.length === 0) {
          badgeCart.innerHTML = "0";
          this.carrito = []; 
          return
        }

        badgeCart.textContent = nCantidad;  
        console.log(nCantidad)
    }

  removeToCart(producto,id){
      
    let productoCarrito = this.obtenerProductoDeCarrito(producto)
    productoCarrito.cantidad--
    
    if(productoCarrito.cantidad === 0){
        let index = this.carrito.findIndex(producto => producto.id == id)  //como el indice empieza en 0, hacemos que empieze en 1 con findIndex e igualandolo al id del producto
        this.carrito.splice(index,1)                                       //luego lo borramos con splice pasandole el index(desde 1 en adelante) y quitamos 1
        console.log(this.carrito)

        if(this.carrito.length === 0){     //if anidado ya que si lo pongo afuera este va a estar esperando siempre la condicion y de esta manera solo si se cumple la primera
            this.carritoDelay()
        }
    } 

    console.log(this.carrito)
    console.log('Cantidad: ' + productoCarrito.cantidad)
    this.updateCartNumber()
    this.updateCartTotal()
    renderCarrito(this.carrito)
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
    
  }

  async vaciarCarrito() {
        this.carrito = []
        this.updateCartNumber()
        localStorage.setItem('carrito', JSON.stringify(this.carrito)) //actualizamos el localStorage
        await renderCarrito(this.carrito)   
        this.carritoDelay()                //renderizamos con la info nueva
    }

    //timeout para el carrito cuando esta vacio y no quede abierto siempre
    carritoDelay() {

        if(this.carrito.length === 0){
            setTimeout(() => {
                this.sectionCarrito.classList.remove('section-carrito--visible')
                mostrarCarrito = false
            },1500)
        }
        
        setTimeout(() => {
            this.sectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false
        },1500)
    }

    async enviarCarrito() {
        this.sectionCarrito__body.innerHTML = '<h2>Enviando productos...</h2>'
        this.vaciarCarrito()
        this.sectionCarrito__body.innerHTML = '<h2>Productos Comprados con exito!</h2>'
    }
}

let carritoController = new CarritoController()