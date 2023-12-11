import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)

  const params = useParams()
  const {token} = params


  useEffect(()=>{
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: "El password debe set de minimo 6 caracteres",
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url,{password})
      setPasswordModificado(true)
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu acceso y no pierdas acceso a tus 
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}
      {tokenValido &&
        <form className="my-10 bg-white shadow rounded-lg px-10 py-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
              <input
                  id="password"
                  type="password"
                  placeholder="Escribe tu Nuevo Password"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              />
          </div>
          <input type="submit" 
              value="Guardar Password"
              className="bg-sky-700 w-full rounded py-3 text-white uppercase font-bold hover:cursor-pointer 
              hover:bg-sky-800 transition-colors mb-5"
          />
        </form>
      }
      {passwordModificado && (
          <Link to={"/"}
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Inicia Sesion
          </Link>
        )}
    </>
  )
}

export default NuevoPassword