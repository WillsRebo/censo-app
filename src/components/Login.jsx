import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loguear } from "../features/logueadoSlice";
import 'bootstrap/dist/css/bootstrap.min.css';



const Login = () => {
  const user = useRef(null);
  const pass = useRef(null);
  const [habilitarBoton, setHabilitarBoton] = useState(true)
  const [error, setError] = useState(false)

  const dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('idUsuario')!==null){
    navigate('/Dashboard') }
  }, [])


  const logearUsuario = (e) => {
    let usuario = user.current.value;
    let password = pass.current.value;

    const url = `https://censo.develotion.com/login.php`;
    const datos = {
      usuario: usuario,
      password: password,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.codigo === 200) {
          localStorage.setItem("apikey", json.apiKey);
          localStorage.setItem("idUsuario", json.id);
          localStorage.setItem("logCensoApp", true);
          dispatch(loguear(true));
          navigate("/Dashboard");          
        }else if (json.codigo === 409) {
          setError(true);
        }
      })
      ;
  };

  const verificarNotEmpty = () => {

    if (user.current.value.length !== 0 && pass.current.value.length !== 0) {
      setHabilitarBoton(false)
    } else {
      setHabilitarBoton(true)
    }

  };

  return (
    <div>
      <form action='' id='login' className='container'>
        <h2 className='mx-auto'>Login</h2>
        <div className='row'>
          <label className='col-4 mb-1' htmlFor='txtUser'>Usuario</label>
          <input className='col-8 mb-1' type='text' id='txtUser' ref={user} onChange={verificarNotEmpty} />
        </div>
        <div className='row'>
          <label className='col-4 mb-1' htmlFor='txtPass'>Password</label>
          <input className='col-8 mb-1' type='password' id='txtPass' ref={pass} onChange={verificarNotEmpty} />
        </div>
        <div className='row loginDiv'>
          <Link className="col-8" to="/Registro">No tienes usuario? Regístrate</Link>
          <button type='button' className='btn btn-outline-primary btnRegistro mt-1 col-4 ' disabled={habilitarBoton} onClick={logearUsuario}>Login</button>
          {error ? <p>Usuario y/o contraseña incorrectos</p>: '' }
        </div>         
      </form>
    </div>
  )
};

export default Login;
