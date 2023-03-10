//______________________________________________
import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
//______________________________________________
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import viewsRouter from './routes/views.js'
import __dirname from './utils.js'
import { ProductManager } from './dao/fileSystem/productManager.js'
import dbConnection from './config/dbConnection.js'
import chatModel from "./models/chat.js"
//_______________________________________________
const app = express()
const PORT = 8080

dbConnection()

const productManager = new ProductManager

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/public' ,express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const httpServer = app.listen(PORT, (err)=>{
    if (err) console.log(err)
    console.log('Escuchando puerto: ', PORT);
})

httpServer.on

const socketServer = new Server(httpServer)

let productos
let mensajes

socketServer.on('connection', async socket => {
    console.log('cliente conectado')
    try {
        productos = await productManager.getProducts()
        mensajes = await chatModel.find()
        socket.emit('mensajeServer', productos)
        socket.emit('mensajesChat', mensajes)
    } catch (error) {
        console.log(error)
    }

    socket.on('product', async data => {
        console.log('data: ', data)

        const   {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        } = data

        if (title == '' || description == '' || code == '' || price == '' || status == '' || stock == '' || category == '') {
            console.log('error');
        }else{
            try {
                await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category)
                let datos = await productManager.getProducts()
                socketServer.emit('productoAgregado', datos)
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('deleteProduct', async data => {
        try {
            await productManager.deleteProduct(data)
            let datos = await productManager.getProducts()
            socketServer.emit('productoEliminado', datos)
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('msg', async data => {
        console.log(data);
        try {
            await chatModel.insertMany(data)
            let datos = await chatModel.find()
            socketServer.emit('newMsg', datos)
        } catch (error) {
            console.log(error)
        }
    })
})