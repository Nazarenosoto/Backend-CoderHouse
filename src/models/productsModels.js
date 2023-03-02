import { Schema, model } from "mongoose";

const collection = 'products'

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export default (collection, productsSchema)