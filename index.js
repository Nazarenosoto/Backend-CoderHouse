//se tiene que hacer una clase para agregar productos y traer productos, lo mismo que se hizo en la clase pero mas renderizado
class producManager{
    constructor() {
        this.getProducts = []
    }
    getProduct = () => this.getProducts
    addProduct = (title,description,price,thumbnail,code,stock) => {
        const getProductById = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (this.getProducts.length === 0) {
            getProductById.id = 1
        } else {
            return console.log('Not found')
        }
        this.getProducts.push(getProductById)
        console.log(this.getProducts)
    }
    
}
const productManager = new producManager()
productManager.addProduct('producto prueba', 'este es un producto de prueba', 200, 'sin imagen','abc123',25)


