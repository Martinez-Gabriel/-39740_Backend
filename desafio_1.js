class productManager
{
    idProduct = 1;
    constructor ()
    {
        this.products = [];
    }
   
    addProduct(newProduct)
    {
       
        // if (!newProduct)
        // {
            //     throw new Error ("no se puede crear un producto vacio");
            // }
            
            //Validacion de code.
            if(this.products.find(p => p.code === newProduct.code))
            {
                throw new Error ("No se puede crear un producto con Id repetido")
            }
            
            //Retornar el producto y asignarle una autoID con spread operator
            this.products.push({...newProduct, id:this.idProduct++});

            return "producto" + (this.idProduct-1) +  "agregado correctamente";


       
    }

    //Retorna la lista de los productos.
    getProducts()
    {
        return this.products;
    }

    //retorna un producto por su id.
    getProductsById(id)
    {

        if(this.products.find(p => p.idProduct === id))
            {
                return this.idProduct
            }
            throw new Error ("No se encuentra la id ingresada")
    }
}



//Guardar el producto en el array de products.

let newProduct1 = {
    title: 'Manzana',
    description: 'Fruta',
    price: 50,
    thumbnail: 'img1',
    code: 1,
    stock: 100,
};
let newProducto2 = {
    title: 'Manzana',
    description: 'Fruta',
    price: 50,
    thumbnail: 'img1',
    code: 1,
    stock: 100,
};




const productManager = new productManager();


productManager.addProduct(newProduct1);
productManager.addProduct(newProduct2);


console.log(productManager.getProducts());

productManager.getProductsById(2)
