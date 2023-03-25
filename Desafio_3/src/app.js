const express = require("express");
const ProductManager = require("./productManager");

const app = express();

const productManager = new ProductManager();

//MIDDLEWARE REQ.QUERY
app.use(express.urlencoded({ extended: true }));

//GET PRODUCT POR LIMIT.
app.get("/products", async (req, res) => {
  const limit = +req.query.limit;
  try{
    const products = await productManager.getProducts();
    if (limit){
      const productLimit = products.slice(0,limit);
      console.log(productLimit);
      res.send(productLimit);
    }else{
      console.log(products);
      res.send(products);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
  


//GET PRODUCT POR ID.
app.get("/products/:pid", async (req, res) => {
  const pid = +req.params.pid;
  try{
      const product = await productManager.getProductsById(pid);
      console.log(product);
      res.send(product);
  } catch (error) {
        console.log(error);
        res.send(error);
  }  
});

//CONFIGURACION DE PUERTO
app.listen(8080, () => {
  console.log("Servidor escuchando el puerto 8080");
});


