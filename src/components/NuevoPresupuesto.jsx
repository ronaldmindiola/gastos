import React from "react";
import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 0) {
      setMensaje("Presupuesto Inválido");
      return;
    }
    setMensaje("Presupuesto válido");
    setIsValidPresupuesto(true);
  };
  return (
    <div className="contanedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>

          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añadir Presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <input type="submit" value="Añadir" />
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
