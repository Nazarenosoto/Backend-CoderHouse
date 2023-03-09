import fs from 'fs'

export class ProductManager {
    #Products = './src/products.json'
    constructor(){
        this.path = this.#Products
    }

    //Agregar productos
    addProduct = async (newItem) => {
        let product = await this.getProducts()
        try {
            if (product.length === 0) {
            newItem.id = 1
            product.push(newItem)
        } else {
            product = [ ...product, { ...newItem, id:product[product.length -1].id + 1}]
        }
            await fs.promises.writeFile(this.path, JSON.stringify(product, null,'\t'))
            console.log('The product has been added to the database');
        } catch (error) {
            console.log(error);
        }
    }
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const product = JSON.parse(data);
            return product;
        }
        await fs.promises.writeFile(this.path, '[]', 'utf-8')
        return []
        } catch (error) {
            console.log(error);
        }
    }

        getProductById = async (id) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const product = JSON.parse(data).slice(id-1,id)
        if (!product) {
            return console.log(`No existe producto con el id: ${id}`)
        }
        return console.log(productDb)
    }

    //Actualizar Producto
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

    //Eliminar producto
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