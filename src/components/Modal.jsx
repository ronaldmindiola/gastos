import React, { useState, useEffect } from "react";
import Mensaje from '../components/Mensaje'
import BtnCerrar from "../img/cerrar.svg";


const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guargarGasto,
  gastoEditar,
  setGastoEditar
}) => {

  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setFecha(gastoEditar.fecha)
      setId(gastoEditar.id)
    }
  }, [])


  const handleSubmit = e => {
    e.preventDefault()

    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      }, 2000);
      return
    }
    guargarGasto({ nombre, cantidad, categoria, id, fecha })
  }

  const ocultarModal = () => {

    setAnimarModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);

  };

  return (
    <>
      <div className="modal">
        <div className="cerrar-modal">
          <img src={BtnCerrar} alt="cerrar modal" onClick={ocultarModal} />
        </div>

        <form
          onSubmit={handleSubmit}
          className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
          <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
          {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
          <div className="campo">
            <label htmlFor="nombre">Nombre Gasto</label>
            <input
              id="nombre"
              type="text"
              placeholder="Escribe el nombre del gasto"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="cantidad">Cantidad</label>
            <input
              id="cantidad"
              type="number"
              placeholder="ej: 50000"
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
            />
          </div>

          <div className="campo">
            <label htmlFor="categoria">Categorías</label>
            <select
              id="categoria"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option >Seleccione...</option>
              <option value="ahorro">Ahorro</option>
              <option value="casa">Casa</option>
              <option value="comida">Comida</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>

          <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </form>
      </div>
    </>
  );
};

export default Modal;