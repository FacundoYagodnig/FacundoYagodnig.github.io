class ProductosService {
  
    URL_PRODUCTS = 'https://61d4ac148df81200178a8df2.mockapi.io/products/' 
    
    
    async getProductsService(){
        let products = await http.get(this.URL_PRODUCTS) //hacemos ambas funcions con async , ya que la primera me devuelve una promesa y esta debe esperarla
        return products
    }

    async saveProductsService(product){
        let savedProducts = await http.post(this.URL_PRODUCTS, product )
        return savedProducts
    }

    async updateProductsService(id,product){
        let updatedProducts = await http.put(this.URL_PRODUCTS, id, product )
        return updatedProducts
    }

    async deleteProductsService(id){
        let deletedProducts = await http.del(this.URL_PRODUCTS, id )
        return deletedProducts
    }

}

const productosService = new ProductosService()
