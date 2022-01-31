class CarritoServices {

    URL_CARRITO = 'https://61d4ac148df81200178a8df2.mockapi.io/cart' 

    async saveCarritoService(carrito) {
        let savedCarrito = await http.post(this.URL_CARRITO, carrito) //hacemos ambas funcions con async , ya que la primera me devuelve una promesa y esta debe esperarla
        return savedCarrito
    }
}

const carritoService = new CarritoServices()


