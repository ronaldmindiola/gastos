export const generaId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36);
    return random + fecha;
}

export const formatearCantidad = cantidad => {
    
    const opciones = {
        style: "currency",
        currency: "USD",
    }
    return cantidad.toLocaleString("en-US", opciones);
  };

export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}