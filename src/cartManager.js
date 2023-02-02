import fs from 'fs'

export class CartManager {
    #ruta = './carts.json'
    constructor(){
        this.path = this.#ruta
    }

    async createCart(){
        let cart = {}
        if(fs.existsSync(this.path)){    //pusheo el archivo al carrito
            let data = await fs.promises.readFile(this.path, 'utf-8') 
            let dataJS = JSON.parse(data)                             
            //agrego un id
            cart.id = dataJS[dataJS.length - 1].id + 1 
            cart.products = []
            dataJS.push(cart)

            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
        }else{//si no existe se crea uno
            cart.id = 1
            cart.products = []
            const arrC = [cart]

            await fs.promises.writeFile(this.path, `${JSON.stringify(arrC, null, 2)}`, 'utf-8')
        }
    }

    async uploadProduct(cid, pid){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')           
            let dataJS = JSON.parse(data)
            let carrito = dataJS[cid - 1]                                       
            let idx = carrito.products.findIndex(product => product.id == pid)  

            if(idx !== -1){                                                     
                let product = carrito.products[idx]

                product.quantity++
                carrito.products[idx] = product
            }else{                                                              
                let product = {}
                product.id = pid
                product.quantity = 1
                carrito.products = [...carrito.products, product]
            }

            dataJS[cid - 1] = carrito

            await fs.promises.writeFile(this.path, JSON.stringify(dataJS, null, 2), 'utf-8')        

        } catch (error) {
            console.log(error)
        }
    }

    async getCartProducts(cid){
        try {
            //lee los archivos y los guardo en la variable para despues parseado 
            let data = await fs.promises.readFile(this.path, 'utf-8')       
            let dataJS = JSON.parse(data)
            let carrito = dataJS[cid -1]

            return carrito.products            
        } catch (error) {
            console.log(error)
        }
    }
}