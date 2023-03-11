class ProductManager
{
    constructor ()
    {
        this.products = [];
    }

    addProduct()
    {
        //guardar el producto en el array de products
        let nuevoProducto = {
            title: 'Manzana',
            description: 'Fruta',
            price: 50,
            thumbnail: 'img1',
            code: 1,
            stock: 100
        }
        return `${this.products.push(nuevoProducto)} Se agrego el nuevo producto: ${this.products}`
        //incrementar el autoID
    }

    getProducts()
    {
        return `${this.products}`
    }

    getProductsById()
    {
        //filtrar el producto por id
    }
}

const ProductManager = new Product();

ProductManager.addProduct({}):
ProductManager.addProduct({}):
ProductManager.addProduct({}):