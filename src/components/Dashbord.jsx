import { useEffect, useState } from 'react'
import AgregarPersona from './AgregarPersona'
import ListarPersonas from './ListarPersonas'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import GraficoPersonasDepto from './GraficoPersonasDepto'
import TiempoRestanteCenso from './TiempoRestanteCenso';
import Mapa from './MapaUsuariosPorDepto';
import GraficoPersonasPorOcupacion from './GraficoPersonasOcupacion';
import PorcetajePersonasCensadas from './PorcetajePersonasCensadas';
import CensadosTotales from './CensadosTotales';

const Dashbord = () => {

  let navigate = useNavigate();
  const [errorCarga, setErrorCarga] = useState(false);


  //Para corroborar las credenciales de usuario sean válidadas, si no lo son limpia el localStorage y lleva a página de login
  useEffect(() => {
    const url = 'https://censo.develotion.com/departamentos.php';

    fetch(url, {
      method: 'GET',
      headers: {
        iduser: localStorage.getItem('idUsuario'),
        'Content-type': 'application/json; charset=UTF-8',
        apikey: localStorage.getItem('apikey')
      }
    }).then(response => {
      if (!response.ok) {
        setErrorCarga(true);
        localStorage.clear();
        navigate('/')
        return null
      }
    })
  }, []); 


  return (

    <div className='dashbord container'>
      {errorCarga ? '' : (
        <>
          <div className='row border border-2 mt-1'>
            <div className='col-3 p-2'>
              <AgregarPersona />
            </div>
            <div className='col-3 p-2'>
              <ListarPersonas />
            </div>

            <div className='col-6 p-2'>
              <div className='row'>
                <div className='mb-4 col-6'>
                  <TiempoRestanteCenso />
                </div>
                <div className='col-6'>
                  <PorcetajePersonasCensadas />
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <CensadosTotales />
                </div>
              </div>
            </div>

          </div>
          <div className='row'>
            <div className='col-6  p-2 border border-2 '>
              <GraficoPersonasDepto />
            </div>
            <div className='col-6  p-2 border border-2 '>
              <GraficoPersonasPorOcupacion />
            </div>
          </div>
          <div className='row'>
            <div className='col p-2 border border-2 '>
              <Mapa />
            </div>
          </div>

        </>)
      }
    </div>
  )
}

export default Dashbord