import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        require: true
    },
    descripcion:{
        type: String,
        trim: true,
        require: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    fechaEntrega:{
        type: Date,
        required: true,
        default: Date.now()
    },
    prioridad:{
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
},{
    timestamp: true
})

const Tarea = mongoose.model('Tarea', tareaSchema)
export default Tarea