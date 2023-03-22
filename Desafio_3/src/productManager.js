const fs = require("fs");

class ProductManager {
  idProduct = 1;
  #products;

  constructor() {
    this.#products = [];
    this.path = "./DB.json";
  }

  async loadData() {
    this.#products = await this.getProducts();
  }

  //Traemos todos los productos.
  async getProducts() {
    try {
      const contenido = await fs.promises.readFile(this.path, {
        encoding: "utf-8",
      });
      return JSON.parse(contenido);
    } catch (error) {
      console.log(`El archivo ${this.path} no existe, creando...`);
      await fs.promises.writeFile(this.path, "[]");
      return [];
    }
  }

  async addProduct(newProduct) {
    //Validacion para no crear un producto vacio.
    if (!newProduct) {
      throw new Error("no se puede crear un producto vacio");
    }

    //Validacion para no repetir code.
    if (this.#products.find((p) => p.code === newProduct.code)) {
      throw new Error("No se puede crear un producto con code repetido");
    }

    //Retornar el producto y asignarle una autoID con spread operator.
    this.#products.push({ ...newProduct, id: this.idProduct++ });

    await fs.promises.writeFile(this.path, JSON.stringify(this.#products));
  }

  async getProductsById(id) {
    const productById = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    const DBParse = JSON.parse(productById);
    const contenido = DBParse.find((p) => p.id === id);
    if (!contenido) throw new Error("ERROR, no se encuentra el producto!");
    return contenido;
  }

  //Actualizar producto
  async updateProduct(id, newProduct) {
    try {
      let readProducts = await fs.promises.readFile(this.path, {
        encoding: "utf-8",
      });
      const productsParse = JSON.parse(readProducts);
      const productId = productsParse.findIndex((product) => product.id === id);
      productsParse.splice(productId, 1, { id, ...newProduct });

      await fs.promises.writeFile(this.path, JSON.stringify(productsParse));
      return `producto modificado correctamente!`;
    } catch (e) {
      throw new Error(`ERROR, no se puede actualizar el producto!`);
    }
  }

  //Borrar Producto
  async deleteProduct(id) {
    try {
      let readProducts = await fs.promises.readFile(this.path, {
        encoding: "utf-8",
      });
      const productParse = JSON.parse(readProducts);
      const deleteProduct = productParse.filter((p) => p.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct));

      return `producto eliminado`;
    } catch (e) {
      throw new Error(e);
    }
  }
}

let newProduct1 = {
  title: "Manzana",
  description: "Fruta",
  price: 50,
  thumbnail: "img1",
  code: 1,
  stock: 100,
};
let newProduct2 = {
  title: "Naranja",
  description: "Fruta",
  price: 100,
  thumbnail: "img2",
  code: 2,
  stock: 1000,
};
let newProduct3 = {
  title: "Banana",
  description: "Fruta",
  price: 3000,
  thumbnail: "img3",
  code: 3,
  stock: 1000,
};

const main = async () => {
  const pm = new ProductManager();

  await pm.loadData();
  await pm.getProducts();
  console.log(await pm.getProducts());

  //addProduct funcionando.
  await pm.addProduct(newProduct1);
  await pm.addProduct(newProduct2);
  await pm.addProduct(newProduct3);

  //getProduct funcionando.
  console.log(await pm.getProducts());

  //getProductoByID Funcionando.
  console.log(await pm.getProductsById(1));

  //updateProduct funcionando.
  console.log(
    await pm.updateProduct(2, {
      title: "peras",
      description: "Fruta",
      price: 3000,
      thumbnail: "img3",
      stock: 1000,
    })
  );

  //deleteProducto funcionando.
  console.log(await pm.deleteProduct(2));
};

main();