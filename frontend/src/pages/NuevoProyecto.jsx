import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>
      <div className="flex mt-10 justify-center">
        <FormularioProyecto/>
      </div>
    </>
  )
}

export default NuevoProyecto