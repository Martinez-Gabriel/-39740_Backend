const express = require("express");
const ProductManager = require("./productManager");

const app = express();

const productManager = new ProductManager();

//MIDDLEWARE REQ.QUERY
app.use(express.urlencoded({ extended: true }));

//GET PRODUCT POR LIMIT.
app.get("/products", async (req, res) => {
  const limit = +req.query.limit;
  let productLimit = [];
  for (var i = 0; i < limit; i++){
    productLimit.push(products[i]);
  }
  res.send(await productManager.getProducts());
});

//GET PRODUCT POR ID.
app.get("/products/:pid", (req, res) => {
  const pid = +req.params.pid;
  const product = products.find((product) => product.id === pid);
  if (!product) {
    res.send({ error: "Product not found." });
  }

  res.send(product);
});

//CONFIGURACION DE PUERTO
app.listen(8080, () => {
  console.log("Servidor escuchando el puerto 8080");
});

// app.get("/addProduct", async (req, res) => {
//   res.send(await productManager.addProduct(singleProduct));
// });




