import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TiempoRestanteCenso = () => {
  const [diasRestantes, setDiasRestantes] = useState(0);

  useEffect(() => {
    const fechaObjetivo = new Date('2024-03-31T00:00:00');
    const fechaActual = new Date();
    
    const diferenciaTiempo = fechaObjetivo.getTime() - fechaActual.getTime();

    const dias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    setDiasRestantes(dias);
  }, []);

  return (
    <div className="componente">
      <h3>Censo Countdown (Días)</h3>
      <div className='divCountdown mt-4'>
        <p >{diasRestantes}</p>
      </div>
    </div>
  );
};

export default TiempoRestanteCenso;
