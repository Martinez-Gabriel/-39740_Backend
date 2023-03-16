const fs = require('fs');

class productManager {

    idProduct = 1;
    constructor() {
        this.#products = [];
        this.DB = './DB.json';
    }

    //Traemos todos los productos.
    async getProducts() {
        try {
            const DBParse = JSON.parse('./DB.json');
            let contenido = await fs.promises.readFile(DBParse, 'utf-8');
            return contenido;
        }
        catch (e) {
            throw new Error("No se puede lee el archivo");
        }
    };

    async addProduct(newProduct) {

        //Validacion para no crear un producto vacio.
        if (!newProduct)
        {
            throw new Error ("no se puede crear un producto vacio");
        }

        //Validacion para no repetir code.
        if (this.products.find(p => p.code === newProduct.code)) {
            throw new Error("No se puede crear un producto con code repetido")
        }

        //Retornar el producto y asignarle una autoID con spread operator
        this.products.push({...newProduct,id: this.idProduct++});
        await fs.writeFile(this.DB,JSON.stringify(this.#products));
        return "producto" + (this.idProduct - 1) + "agregado correctamente";
    }

    async getProductsById(id) {
        try{
            const productById = await fs.readFile(this.DB,'utf-8');
            const DBParse = JSON.parse(productById);
            const contenido = DBParse.find(p => p.id === id);
            return contenido;
        }
        catch (error)
        {
            throw new Error(`ERROR, el producto ${this.DB} no existe!!!`)
        }
    }

    async updateProduct(id){
        try{
            const updateById = await fs.appendFile(this.DB,'utf-8');
            const DBParse = JSON.parse(updateById);
            const contenido = DBParse.find(p => p.id === id);
            return contenido;
        }
        catch (error)
        {
            throw new Error(`ERROR, no se puede actualizar el producto!`)
        }
    }

    async deleteProduct(id){
        try{
            const deleteById = await fs.promises.unlink(this.DB,'utf-8');
            const DBParse = JSON.parse(deleteById);
            const contenido = DBParse.find(p => p.id === id);
            return contenido;
        }
        catch (error)
        {
            throw new Error(`ERROR, no se puede eliminar el producto!!!`)
        }
    }
}

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

