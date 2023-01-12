class producManager{
    constructor() {
        this.products = []
    }
    getProduct = () => this.products
    getProductById = (id) => {
        const productDb = this.products.find(productos => productos.id === id)
        if(!productDb){
            return 'El producto no existe'
        }
        return productDb
    }

    addProduct = (newItem) => {
        const productDb = this.products.find(productos => productos.code === newItem.code)
        if (productDb){
            return 'Se encuentra el producto'
        }
        //Validar el campo
        if(newItem.title === ''){ return 'Llenar los campos!'}

        if (this.products.length === 0){
            newItem.id = 1
            this.products.push(newItem)
        }else{
            this.products = [... this.products, {... newItem, id: this.products[this.products.length - 1].id + 1 } ]
        }

    }
}

const Products =  new producManager()

console.log(Products.addProduct({
    title: '',
    description: 'Esto es un producto',
    price: 250,
    thumbnail: 'ruta image',
    code: 1,
    stock: 20
}))
console.log(Products.addProduct({
    title: 'Este si tiene titulo',
    description: 'Esto es un producto',
    price: 250,
    thumbnail: 'ruta image',
    code: 2,
    stock: 20
}))

console.log(Products.getProductById(2))