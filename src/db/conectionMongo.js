import { connect } from "mongoose";

const url = 'mongodb://locahost:27017/proyectoBack' 

const initConnection = async () =>{
    try {
        console.log("mongo connection on")
        return await connect(url)
    } catch (error) {
        console.log(error)
        process.exit()
    }
    
} 

export default initConnection;