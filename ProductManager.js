const fs = require('fs')

class ProductManager {
    #Products = './products.json'
    constructor(){
        this.path = this.#Products
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        //si el archivo existe se pushea el producto
        if(fs.existsSync(this.path)){     
            console.log("Se cumplió lo solicitado");
            let data = fs.readFileSync(this.path, 'utf-8') 
            let dataJS = JSON.parse(data)

            product.id = dataJS[dataJS.length - 1].id + 1             
            dataJS.push(product)

            fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
            
        //si el archivo no existe crea uno
        }else{                           
            console.log("el documento solicitado existe el archivo");
            product.id = 1
            const arrProducts = [product]

            fs.writeFileSync(this.path, `${JSON.stringify(arrProducts, null, 2)}`, 'utf-8')   //se crea el archivo con el producto en JSON
        }
    }

    getProducts(){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        console.log(dataJS)
        return dataJS
    }

    getProductById(id){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        const productById = dataJS.find(product => product.id == id)

        console.log(productById)
        return productById
    }

    updateProduct(id, obj){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        let productById = dataJS.find(product => product.id == id)

        productById = obj
        productById.id = id

        dataJS.splice((id - 1), 1, productById)

        console.log(dataJS)

        fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
    }

    deleteProduct(id){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        dataJS.splice((id - 1), 1)

        let contador = 1

        dataJS.forEach(product => {
            product.id = contador++
        })

        fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
    }
}

const productManager = new ProductManager()

let remplazo =  {
                    title: "Remplazo",
                    description: "obj actualizado",
                    price: 500,
                    thumbnail: "link",
                    code : 200,
                    stock: 15
                }

productManager.addProduct("titulo", "es una prueba", 500, "image", 200, 15)
productManager.addProduct("titulo 2", "es una prueba", 600, "image", 300, 8)
productManager.addProduct("titulo 3", "es una prueba", 700, "image", 400, 15)
productManager.addProduct("titulo 4", "es una prueba", 800, "image", 500, 23)
productManager.getProducts()
productManager.getProductById(3)
productManager.updateProduct(1, remplazo)
productManager.deleteProduct(2)
//Lo dejo sin el archivo JSON para que cuando lo ponga a correr vea como se crea