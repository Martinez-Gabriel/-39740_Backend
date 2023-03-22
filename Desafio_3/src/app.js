import express from "express";

const app = express();

const products = [
    { id: 1, type: 'Azucar'},
    { id: 2, type: 'Te'},
    { id: 3, type: 'Harina'},
    { id: 4, type: 'Huevo'}
  ];

//MIDDLEWARE REQ.QUERY
app.use(express.urlencoded({extended: true}));

//GET PRODUCT POR LIMIT.
app.get('/products', (req, res) => {
    res.send(products)
});

//GET PRODUCT POR ID.
app.get('/products/:pid', (req, res) => {
const pid = +req.params.pid;
const product = products.find( product => product.id === pid);
  if(!product)
  {
      res.send({ error: "Product not found."});
  }

  res.send(product);
}); 

//CONFIGURACION DE PUERTO
app.listen(8080, () => {
    console.log('Servidor escuchando el puerto 8080');
});