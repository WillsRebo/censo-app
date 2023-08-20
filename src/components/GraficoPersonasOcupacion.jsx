import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
); 

const GraficoPersonasPorOcupacion = () => {

  const [data, setData] = useState([]);
  const personas = useSelector(state => state.listaPer.listaPersonas);
  const ocupacionStore = useSelector(state => state.listaOcupacion.ocupaciones);
  

  useEffect(() => {

    const ocupacionesConPersonas = ocupacionStore.filter(ocupacion => personas.some(persona => persona.ocupacion === ocupacion.id));


    let arrayAuxiliar = [];

    for (let i = 0; i < ocupacionesConPersonas.length; i++) {
      const ocu = ocupacionesConPersonas[i];
      const objeto = {
        id: ocu.id,
        nombre: ocu.ocupacion,
        total: 0,
      };

      for (let e = 0; e < personas.length; e++) {
        const per = personas[e];
        if (per.ocupacion === objeto.id) {
          objeto.total += 1;
        }
      }
      arrayAuxiliar.push(objeto);      
    }
    setData(arrayAuxiliar);
  }, [personas]);
  
  const maxValor = Math.max(...data.map((total) => total.total)) + 1;

 

  return (
    <div className="componente">
      <h3>N° Personas Censadas por Ocupación</h3>
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            x: {
                grid: {
                  display: false
                }
              },
            y: {
              suggestedMax: maxValor,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
        data={{
          labels: data.map((nombre) => nombre.nombre),
          datasets: [
            {
         
              data: data.map((total) => total.total),
              backgroundColor: ['rgba(140, 14, 14, 0.5)'],
              borderColor: ['rgba(140, 14, 14, 1)']
            },
          ],
        }}
      />
    </div>
  );
};

export default GraficoPersonasPorOcupacion;