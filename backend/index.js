import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareasRoutes from './routes/tareaRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()

connectarDB()
//Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))
//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareasRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto 4000")
})