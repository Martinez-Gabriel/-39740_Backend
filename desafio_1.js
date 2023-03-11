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
                throw new Error ("No se puede crear un producto con code repetido")
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

        const product = this.products.find(p => p.id === id);

        if(!product)
            {
                throw new Error ("No se encuentra la id ingresada")
            }
            return product;
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
let newProduct2 = {
    title: 'Naranja',
    description: 'Fruta',
    price: 100,
    thumbnail: 'img2',
    code: 2,
    stock: 1000,
};
let newProduct3 = {
    title: 'Banana',
    description: 'Fruta',
    price: 3000,
    thumbnail: 'img3',
    code: 3,
    stock: 1000,
};



const prodManager = new productManager();


prodManager.addProduct(newProduct1);
prodManager.addProduct(newProduct2);
prodManager.addProduct(newProduct3);


console.log(prodManager.getProducts());
console.log(prodManager.getProductsById(2))
