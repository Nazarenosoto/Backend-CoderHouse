import express from 'express'
import { ProductManager } from './ProductManager.js'

const productManager = new ProductManager
const app = express()
const PORT = 8080

app.get("/products", async (req, res)=>{
    const {limit} = req.query
    try {
        const data = await productManager.getProducts()

        limit ? res.send(data.filter(product => product.id <= limit)) : res.send(data)
    } catch (error) {
        console.log(error)
    }
})

app.get("/products/:pId", async (req, res)=>{
    const pid = req.params.pid
    if (!pid){
        res.send({error:'id no encontrado'})
    } else {
        const data = await productManager.getProducts()
        pid ? req.send(data.find(product => product.id == pid)) : req.send(data)
    }
})

app.listen(PORT, (err)=>{
    if(err) console.log(err)
    console.log(`Escuchando puerto: ${PORT}`);
})