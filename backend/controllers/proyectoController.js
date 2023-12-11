import Proyecto from "../models/proyecto.js"

const obtenerProyectos = async (req, res) =>{
    const proyecto = await Proyecto.find().where('creador').equals(req.usuario)

    res.json(proyecto)
    
}
const nuevoProyecto = async (req, res) =>{
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(erro)
    }
}
const obtenerProyecto = async (req, res) =>{
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)
    if(!proyecto){
        return res.status(404).json({msg: "Proyecto no encontrado"})
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({msg: "Accion no valida"})
    }

    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)

    res.json({
        proyecto,
        tareas
    })
}
const editarProyecto = async (req, res) =>{
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)
    if(!proyecto){
        return res.status(404).json({msg: "Proyecto no encontrado"})
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({msg: "Accion no valida"})
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
    proyecto.cliente = req.body.cliente || proyecto.cliente
    
    try {
        const proyectoActualizado = await proyecto.save() 
        res.json(proyectoActualizado)
    } catch (error) {
        console.log(error)
    }
}
const eliminarProyecto = async (req, res) =>{
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)
    if(!proyecto){
        return res.status(404).json({msg: "Proyecto no encontrado"})
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({msg: "Accion no valida"})
    }
    try {
        await proyecto.deleteOne()
        res.json({msg:"Proyecto Eliminado"})
    } catch (error) {
        console.log(error)
    }
}
const agregarColaborador = async (req, res) =>{}
const eliminarColaborador = async (req, res) =>{}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}