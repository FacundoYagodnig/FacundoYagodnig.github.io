class ProductosController extends ProductModel{
  
    constructor() {
         super( )
         this.saveProduct = this.saveProduct.bind(this)
        }

    async getProducts(){
        
        this.productsList = await productosService.getProductsService()
        console.log(this.productsList)
        return this.productsList
    }

    async saveProduct(product){
        console.log('guardar producto', product)
        let savedProduct = await productosService.saveProductsService(product)
        console.log(savedProduct)

        this.productsList.push(savedProduct);
        
        renderTablaAlta(null, this.productsList); 
    }

    async updateProduct(id){
        console.log('actualizarProducto', id)

        let product =  formularioAlta.leerProductoIngresado()
        formularioAlta.limpiarFormulario()
    
        let updateProduct = await productosService.updateProductsService(id,product)
        console.log(updateProduct)
    
        let index = this.productsList.findIndex(product => product.id == updateProduct.id)
        this.productsList.splice(index,1,updateProduct)

        
        renderTablaAlta(null, this.productsList); 
    }

    async deleteProduct(id){
        console.log('borrarProducto', id)
        let deletedProduct = await productosService.deleteProductsService(id)

        let index = this.productsList.findIndex(product => product.id == deletedProduct.id)
        this.productsList.splice(index,1)

        renderTablaAlta(null, this.productsList)

    }
}

const productoController = new ProductosController()
