import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { formatearCantidad } from '../helpers'

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado
    // Calcular Porcentaje Gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    console.log(nuevoPorcentaje);

    setDisponible(totalDisponible)
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1500);
  }, [gastos])

  const fondoDinamico = (porcentaje) => {
    if (porcentaje < 50) {
      backgroundColor = '#4ca1f5'
    } else if (porcentaje > 75) {
      backgroundColor = '#ff3816'
    } else if (porcentaje > 100) {
      backgroundColor = '#ea0000'
    }
    return backgroundColor

  }

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas resetear Presupuesto y Gastos?')
    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }

  }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}%`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: '#3B82F6',
            pathColor: porcentaje > 100 ? 'red' : '#00BFFF',
            textColor: porcentaje > 100 ? 'red' : '#fff',
            trailColor: "#fff",
          })}
        />
      </div>

      <div className="contenido-presupuesto">
        <button
          className='reset-app'
          type='button'
          onClick={handleResetApp}
        >Reset App</button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
