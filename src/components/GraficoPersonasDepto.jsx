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

const GraficoPersonasDepto = () => {

  const [data, setData] = useState([]);
  const personas = useSelector(state => state.listaPer.listaPersonas);
  const departamentosStore = useSelector(state => state.listaDepas.departamentos);
  

  useEffect(() => {

    const departamentosConPersonas = departamentosStore.filter(departamento => personas.some(persona => persona.departamento === departamento.id));

    let arrayAuxiliar = [];

    for (let i = 0; i < departamentosConPersonas.length; i++) {
      const dep = departamentosConPersonas[i];
      const objeto = {
        id: dep.id,
        nombre: dep.nombre,
        total: 0,
      };

      for (let e = 0; e < personas.length; e++) {
        const per = personas[e];
        if (per.departamento === objeto.id) {
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
      <h3>N° Personas Censadas por Departamento</h3>
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
              backgroundColor: ['rgba(100, 180, 84, 0.5)'],
              borderColor: ['rgba(100, 180, 84, 1)']
            },
          ],
        }}
      />
    </div>
  );
};

export default GraficoPersonasDepto;