import mongoose from "mongoose";

const connectarDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.connection.host}: ${connection.connection.port}`
        console.log(`MongoDB connectado en: ${url}`)
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        process.exit(1)
    }
}

export default connectarDB