import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loguear } from "../features/logueadoSlice";
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {

  const user = useRef(null);
  const pass = useRef(null);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [habilitarBoton, setHabilitarBoton] = useState(true)

  const [errorRespuestaApi, setErrorRespuestaApi] = useState(false);
  const [msjError, setMsjError] = useState("")
  
  useEffect(() => {
    if(localStorage.getItem('idUsuario')!==null){
    navigate('/Dashboard')}
  }, [])

  const registrarUsuario = () => {
    setErrorRespuestaApi(false);
    let usuario = user.current.value;
    let password = pass.current.value;

    const url = `https://censo.develotion.com/usuarios.php`;
    const datos = {
      usuario: usuario,
      password: password
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setErrorRespuestaApi(true);
          throw new Error('Este usuario ya se encontraba registrado');
        }
      })
      .then(json => {
         if(json.codigo===200){
          localStorage.setItem('apikey', json.apiKey);
          localStorage.setItem('idUsuario', json.id);
          dispatch(loguear(true))
          navigate('/dashboard'); }
      })
      .catch(error => {
        setMsjError(error.message);
      });
  };


const verificarNotEmpty = () => {

  if (user.current.value.length !== 0 && pass.current.value.length !== 0) {
    setHabilitarBoton(false)
  } else {
    setHabilitarBoton(true)
  }

}

return (
  <div>
    <form action='' id='registro' className='container'>
      <h2 className='mx-auto'>Registro</h2>
      <div className='row'>
        <label className='col-4 mb-1' htmlFor='usuReg'>Usuario</label>
        <input className='col-8 mb-1' type='text' id='usuReg' ref={user} onChange={verificarNotEmpty} />
      </div>
      <div className='row'>
        <label className='col-4 mb-1' htmlFor='passReg'>Contraseña</label>
        <input className='col-8 mb-1' type='password' id='passReg' ref={pass} onChange={verificarNotEmpty} />
      </div>
      <div className='row'>
        <button type='button' className='btn btn-outline-primary btnRegistro mt-1 ' disabled={habilitarBoton} onClick={registrarUsuario}>Registrarse</button>
        
        {errorRespuestaApi ? <div className='col-12 mt-3'><p>{msjError}</p> <Link to="/">Procede al Login</Link> </div>: ''}

      </div>
    </form>
  </div>
)
}

export default Registro;