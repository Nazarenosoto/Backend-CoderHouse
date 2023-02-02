import fs from 'fs'

export class ProductManager {
    #Products = './products.json'
    constructor(){
        this.path = this.#Products
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        try {

            if(fs.existsSync(this.path)){     //se pushea el producto
                console.log("existe el archivo");
                let data = await fs.promises.readFile(this.path, 'utf-8') 
                let dataJS = JSON.parse(data)                            
                //agrego id
                product.id = dataJS[dataJS.length - 1].id + 1             
                dataJS.push(product)
                //escribe en el archivo los productos en un JSON
                await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')       
            //si el archivo no existe se crea uno
            }else{                           
                product.id = 1
                const arrProducts = [product]
                
                await fs.promises.writeFile(this.path, `${JSON.stringify(arrProducts, null, 2)}`, 'utf-8')  
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            return dataJS
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            const productById = dataJS.find(product => product.id == id)
            
            return productById
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, obj){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            let productById = dataJS.find(product => product.id == id)

            productById = obj
            productById.id = id

            dataJS.splice((id - 1), 1, productById)


            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            dataJS.splice((id - 1), 1)

            let contador = 1

            dataJS.forEach(product => {
                product.id = contador++
            })

            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
        } catch (error) {
            console.log(error)
        }
    }
}