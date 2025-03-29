export const formatDate = (date) => {
  if (!date) return '';
  const fecha = new Date(date);
  return fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time) => {
  if (!time) return '';
  return time.substring(0, 5); // Formato HH:mm
};

export const isHorarioDisponible = (horario) => {
  const ahora = new Date();
  const fechaHorario = new Date(`${horario.fecha}T${horario.hora}`);
  return fechaHorario > ahora;
}; 