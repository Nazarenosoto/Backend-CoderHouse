import { Router } from "express"
import { ProductManager } from "../productManager.js"

const router = Router()

const productManager = new ProductManager

router.get('/', async (req, res)=>{
    const {limit} = req.query
    try {
        const data = await productManager.getProducts()

        limit ? res.send(data.slice(0, limit)) : res.send(data)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res)=>{
    const {pid} = req.params
    try {
        const data = await productManager.getProducts()
        pid ? res.send(data.find(product => product.id == pid)) : res.send(data)
    } catch (error) {
        console.log(error)
    }
})

router.post('/',async (req, res)=>{
    const   {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            } = req.body       

    // se verifica que todos los datos sean validos
    if (title == undefined || description == undefined || code == undefined || price == undefined || status == undefined || stock == undefined || category == undefined) {
        res.send({aviso: "datos invalidos"})     
    }else{
        try {
            await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category)    
            res.send({aviso: "producto agregado"})
        } catch (error) {
            console.log(error)
        }
    }
})

router.put('/:pid',async (req, res)=>{
    const {pid} = req.params
    const   {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            } = req.body
    //verifica que todos los datos sean validos
    if (title == undefined || description == undefined || code == undefined || price == undefined || status == undefined || stock == undefined || category == undefined) {
        res.send({mensaje: "mismatched data"})
    }else{
        let  obj={
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumbnail
                }
        try {
            await productManager.updateProduct(pid, obj)        
            res.send({aviso: "updated product"})
        } catch (error) {
            console.log(error)
        }
    }
})

    //Delete product
router.delete('/:pid',async (req, res)=>{
    const {pid} = req.params        
    
    try {
        await productManager.deleteProduct(pid)     
        res.send({aviso: "removed product"})
    } catch (error) {
        console.log(error)
    }
})

export default router